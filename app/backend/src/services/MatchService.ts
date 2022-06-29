import Match from '../database/models/match';
import Team from '../database/models/team';

class MatchService {
  constructor(private matchModel = Match) {}

  public async getAllTeams() {
    const matches = await this.matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public async getMatchesByQuery(inProgress: boolean) {
    const matches = await this.matchModel.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public async saveMatch(match: object) {
    const savedMatch = await this.matchModel.create(match);
    // console.log(savedMatch);
    return savedMatch;
  }

  public async updateScore(homeTeamGoals: number, awayTeamGoals: number, id: number) {
    await this.matchModel.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  public async endMatch(id: number) {
    await this.matchModel.update({ inProgress: false }, { where: { id } });
  }
}

export default MatchService;
