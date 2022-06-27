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
        { model: Team,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        { model: Team,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
      attributes: {
        exclude: ['id'],
      },
    });
    return matches;
  }
}

export default MatchService;
