import User from '../database/models/user';

class LoginService {
  constructor(private userModel = User) {}

  public async logingIn(email: string) {
    const user = await this.userModel.findOne({ where: { email } });

    if (!user) return null;

    return {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };
  }
}

export default LoginService;
