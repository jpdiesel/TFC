// import { compareSync } from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import User from '../database/models/user';

const logInVerification = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  if (email === undefined || password === undefined) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }
  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ message: 'Incorrect email or password' });
  const passwordMatch = password === user.password;
  // console.log(passwordMatch);
  if (!passwordMatch) return res.status(401).json({ message: 'Incorrect email or password' });
  next();
};

export default logInVerification;
