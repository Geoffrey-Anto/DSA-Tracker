import { LoginUserDto } from './dto/login-user-input.dto';
import { CreateUserInputDTO } from './dto/create-user-input.dto';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './enitity/user.entity';
import { UserService } from './user.service';
import { RegisterResponse } from './response/register.response';
import { GQLContextType } from 'types';
import { LoginResponse } from './response/login.response';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // FIND ALL USERS IN DB
  @Query(() => [User], {
    name: 'findAllUsers',
  })
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  // FIND A SINGLE USER WITH EMAIL
  @Query(() => User, {
    name: 'findUser',
    nullable: true,
  })
  async findOne(@Args('id') id: string): Promise<User | null> {
    return this.userService.findOne(id);
  }

  // REGISTER A USER
  @Mutation(() => RegisterResponse, {
    name: 'register',
  })
  async register(
    @Args('createUserInput') createUserInput: CreateUserInputDTO,
    @Context() ctx: GQLContextType,
  ): Promise<RegisterResponse> {
    return await this.userService.createUser(createUserInput, ctx);
  }

  // LOGIN A USER
  @Mutation(() => LoginResponse, {
    name: 'login',
  })
  async login(
    @Args('LoginUserInput') loginUserInput: LoginUserDto,
    @Context() ctx: GQLContextType,
  ): Promise<LoginResponse> {
    return await this.userService.login(loginUserInput, ctx);
  }

  // CHANGE NAME OF USER
  @Mutation(() => User, {
    name: 'changeUserName',
    nullable: true,
  })
  async changeUserName(
    @Context() ctx: GQLContextType,
    @Args('newName') name: string,
  ): Promise<User | null> {
    return this.userService.changeUserName(ctx, name);
  }
}
