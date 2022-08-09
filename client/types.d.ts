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

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  qList: any;
}

export interface LoginMutationResponse {
  data?: {
    login: {
      data?: User;
      message?: string;
    };
  };
}

export interface SignUpMutationInputType {
  name: string;
  email: string;
  password: string;
}

export interface RegisterMutationResponse {
  data?: {
    register: {
      data?: User;
      message?: string;
    };
  };
}
