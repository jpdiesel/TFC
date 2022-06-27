import Team from '../database/models/team';

class TeamService {
  constructor(private teamModel = Team) {}

  public async getAllTeams() {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async getTeamById(id: string) {
    const team = await this.teamModel.findByPk(id);
    return team;
  }
}

export default TeamService;
