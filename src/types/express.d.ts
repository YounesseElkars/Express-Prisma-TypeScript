import { TloginRequest } from './general';

declare module 'express' {
  interface Request {
    user?: TloginRequest;
  }
}
