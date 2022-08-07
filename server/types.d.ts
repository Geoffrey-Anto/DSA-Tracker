import { Request, Response } from 'express';

export interface GQLContextType {
  res: Response;
  req: Request;
}
