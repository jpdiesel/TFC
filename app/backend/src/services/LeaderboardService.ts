import Match from '../database/models/match';
import Team from '../database/models/team';
import { full, sortedLeaderboard } from '../utils/Leaderboard';

class LeaderboardService {
  constructor(
    private teamModel = Team,
    private matchModel = Match,
  ) {}

  public async homeLeaderboard() {
    const allTeams = await this.teamModel.findAll();
    const allMatches = await this.matchModel.findAll();
    const board = await sortedLeaderboard(allTeams, allMatches, 'home');
    return board;
  }

  public async awayLeaderboard() {
    const allTeams = await this.teamModel.findAll();
    const allMatches = await this.matchModel.findAll();
    const board = await sortedLeaderboard(allTeams, allMatches, 'away');
    return board;
  }

  public async fullLeaderboard() {
    const allTeams = await this.teamModel.findAll();
    const allMatches = await this.matchModel.findAll();
    const board = await full(allTeams, allMatches, 'away', 'home');
    const sorted = board.sort((a, b) => {
      if (a.totalPoints < b.totalPoints) return 1;
      if (a.totalPoints > b.totalPoints) return -1;

      if (a.goalsBalance < b.goalsBalance) return 1;
      if (a.goalsBalance > b.goalsBalance) return -1;

      if (a.goalsFavor < b.goalsFavor) return 1;
      if (a.goalsFavor > b.goalsFavor) return -1;

      if (a.goalsOwn < b.goalsOwn) return -1;
      if (a.goalsOwn > b.goalsOwn) return 1;

      // feito com a ajuda desse link a seguir:
      // https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value
      return 0;
    });
    return sorted;
  }
}

export default LeaderboardService;
