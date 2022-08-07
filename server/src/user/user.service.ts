import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from './enitity/user.entity';
import { CreateUserInputDTO } from './dto/create-user-input.dto';
import { RegisterResponse } from './response/register.response';
import { GQLContextType } from 'types';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user-input.dto';
import { LoginResponse } from './response/login.response';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.prismaService.user.findMany();
  }

  async findOne(id: string): Promise<User | null> {
    return (await this.prismaService.user.findUnique({
      where: {
        id,
      },
    })) as User | null;
  }

  async createUser(
    createUserInput: CreateUserInputDTO,
    ctx: GQLContextType,
  ): Promise<RegisterResponse> {
    try {
      const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

      const user = (await this.prismaService.user.create({
        data: {
          ...createUserInput,
          password: hashedPassword,
        },
      })) as User;

      this.signJWT(ctx, user);

      return {
        message: null,
        data: user,
      } as RegisterResponse;
    } catch (error: any) {
      if (error.code === 'P2002') {
        return {
          message: 'Email Already Used',
          data: null,
        } as RegisterResponse;
      }
    }
    return {
      message: 'Something Went Wrong',
      data: null,
    };
  }

  async login(
    loginUserInput: LoginUserDto,
    ctx: GQLContextType,
  ): Promise<LoginResponse> {
    const { email, password } = loginUserInput;

    const user = await this.prismaService.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return {
        message: 'User Not Found',
        data: null,
      };
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (isValid) {
      this.signJWT(ctx, user);
      return {
        message: null,
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
        } as User,
      };
    }

    return {
      message: 'Wrong Password',
      data: null,
    };
  }

  // SIGN JWT AND SEND TO THE CLIENT
  async signJWT(ctx: GQLContextType, user: User) {
    const jwt = this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });
    ctx.res.cookie('access-token', jwt);
    return jwt;
  }
}