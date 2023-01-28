import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import UserRepository from '../modules/user/repositories/UserRepository';

interface IPayload {
  payload: {
    id: number
  }
}

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(400).json({ message: 'token not found' });
  }

  try {
    const { payload } = verify(authorization, 'jwt_secret') as IPayload;
    const userRepository = new UserRepository();

    const user = await userRepository.findById(payload.id);

    if (!user) {
      return res.status(401).json({ message: 'token invalid' });
    }
    req.headers.userId = String(user.id);
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
};

export default validateJWT;
