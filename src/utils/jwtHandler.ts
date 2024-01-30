import jwt from 'jsonwebtoken';

type TPayload = { id: string };

export const generateToken = (payload: TPayload, expiresIn: string): string => {
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: expiresIn });
};

export const verifyToken = (token: string): TPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as TPayload;
};
