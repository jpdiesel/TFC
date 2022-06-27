import { Request, Response } from 'express';
import Login from '../services/LoginService';
import { createToken, validateToken } from '../utils/Token';

class LoginController {
  constructor(private loginUser = new Login()) {}

  public logIn = async (req: Request, res: Response):Promise<Response | void> => {
    try {
      const { email } = req.body;
      // console.log(email);
      const result = await this.loginUser.logingIn(email);
      const token = createToken(email);
      return res.status(201).json({ user: result, token });
    } catch (e) {
      console.log(e);
    }
  };

  public validateToken = async (req: Request, res: Response):Promise<Response | void> => {
    try {
      const { authorization } = req.headers;
      if (!authorization) return res.status(400).json({ message: 'Token inválido' });
      const { dataToSave } = await validateToken(authorization);
      const result = await this.loginUser.logingIn(dataToSave);
      return res.status(200).json(result?.role);
    } catch (e) {
      console.log(e);
    }
  };
}

export default LoginController;
