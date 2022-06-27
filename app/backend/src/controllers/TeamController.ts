import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  constructor(private team = new TeamService()) {}

  public allTeams = async (_req: Request, res: Response) => {
    try {
      const teams = await this.team.getAllTeams();
      return res.status(200).json(teams);
    } catch (e) {
      console.log(e);
    }
  };

  public oneTeam = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const team = await this.team.getTeamById(id);
      return res.status(200).json(team);
    } catch (e) {
      console.log(e);
    }
  };
}

export default TeamController;
