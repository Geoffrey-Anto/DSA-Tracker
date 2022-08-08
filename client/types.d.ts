export interface JwtPayloadType {
  id: string;
  name: string;
  email: string;
  qListId: string;
  iat: number;
  exp: number;
}

export interface UserLoginInputType {
  email: "";
  password: "";
}

export interface UserSignUpInputType {
  email: "";
  password: "";
  first_name: "";
  last_name: "";
}
