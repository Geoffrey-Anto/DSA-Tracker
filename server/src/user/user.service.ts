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
    return await this.prismaService.user.findMany({
      include: {
        qList: true,
      },
    });
  }

  async findOne(id: string): Promise<User | null> {
    return (await this.prismaService.user.findUnique({
      where: {
        id,
      },
      include: {
        qList: true,
      },
    })) as User | null;
  }

  async createUser(
    createUserInput: CreateUserInputDTO,
    ctx: GQLContextType,
  ): Promise<RegisterResponse> {
    try {
      const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

      const user = await this.prismaService.user.create({
        data: {
          ...createUserInput,
          password: hashedPassword,
          qList: {
            create: {
              isPublic: false,
            },
          },
        },
        select: {
          createdAt: true,
          email: true,
          id: true,
          name: true,
          qList: true,
        },
      });

      this.signJWT(ctx, user as User);

      return {
        message: null,
        data: user as User,
      };
    } catch (error: any) {
      if (error.code === 'P2002') {
        return {
          message: 'Email Already Used',
          data: null,
        };
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
      include: {
        qList: true,
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
        data: user as User,
      };
    }

    return {
      message: 'Wrong Password',
      data: null,
    };
  }

  async changeUserName(
    ctx: GQLContextType,
    name: string,
  ): Promise<User | null> {
    try {
      const token = ctx.req.cookies['access-token'];
      if (!token) {
        return null;
      }
      const user = await this.jwtService.verify(token);

      return this.prismaService.user.update({
        where: {
          id: user.id,
        },
        data: {
          name,
        },
      });
    } catch (error) {
      console.log(error);
    }
    return null;
  }

  // SIGN JWT AND SEND TO THE CLIENT
  async signJWT(ctx: GQLContextType, user: User) {
    const jwt = this.jwtService.sign({
      id: user.id,
      name: user.name,
      email: user.email,
      qListId: user.qList?.id,
    });
    ctx.res.cookie('access-token', jwt);
    // Send the jwt to the client as authorization header
    ctx.res.set('Authorization', `Bearer ${jwt}`);
    return jwt;
  }
}
