import * as cors from 'cors';
import * as express from 'express';
import LeaderboardRoutes from './routes/LeaderboardRoutes';
import LoginRoutes from './routes/LoginRoutes';
import MatchRoutes from './routes/MatchRoutes';
import TeamRoutes from './routes/TeamRoutes';

class App {
  public app: express.Express;
  // ...

  constructor() {
    this.app = express();
    this.config();
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(cors());
    this.app.use(accessControl);
    this.app.use(express.json());
    this.app.use('/login', LoginRoutes);
    this.app.use('/matches', MatchRoutes);
    this.app.use('/teams', TeamRoutes);
    this.app.use('/leaderboard', LeaderboardRoutes);
  }

  // ...
  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
