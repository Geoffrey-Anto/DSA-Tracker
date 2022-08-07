import { Request, Response } from 'express';

export interface GQLContextType {
  res: Response;
  req: Request;
}

type user = {
  userId: string;
  userName: string;
  userEmail: string;
};

export type GuardContextType = { user: user } & GQLContextType;
