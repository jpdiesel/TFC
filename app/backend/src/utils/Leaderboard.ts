import Match from '../database/models/match';
import Team from '../database/models/team';

const victory = (id: number, matches: Array<Match>, location: string) => {
  let winningMatches = [];
  if (location === 'home') {
    winningMatches = matches.filter((match) =>
      match.homeTeam === id && match.inProgress === false
      && match.homeTeamGoals > match.awayTeamGoals);
  }
  if (location === 'away') {
    winningMatches = matches.filter((match) =>
      match.awayTeam === id && match.inProgress === false
      && match.homeTeamGoals < match.awayTeamGoals);
  }
  return {
    v: winningMatches.length,
    points: winningMatches.length * 3,
  };
};

const getDraw = (id: number, matches: Array<Match>, location: string) => {
  let drawMatches = [];
  if (location === 'home') {
    drawMatches = matches.filter((match) =>
      match.homeTeam === id && match.inProgress === false
    && match.homeTeamGoals === match.awayTeamGoals);
  }
  if (location === 'away') {
    drawMatches = matches.filter((match) =>
      match.awayTeam === id && match.inProgress === false
    && match.homeTeamGoals === match.awayTeamGoals);
  }

  return {
    draw: drawMatches.length,
    points: drawMatches.length,
  };
};

const getLoss = (id: number, matches: Array<Match>, location: string) => {
  let lossesMatches = [];
  if (location === 'home') {
    lossesMatches = matches.filter((match) =>
      match.homeTeam === id && match.inProgress === false
      && match.homeTeamGoals < match.awayTeamGoals);
  }
  if (location === 'away') {
    lossesMatches = matches.filter((match) =>
      match.awayTeam === id && match.inProgress === false
      && match.homeTeamGoals > match.awayTeamGoals);
  }
  return {
    l: lossesMatches.length,
  };
};

const favorGoals = (id: number, matches: Array<Match>, location: string) => {
  const goals: number[] = [];
  let allMatches = [];
  if (location === 'home') {
    allMatches = matches.filter((match) =>
      match.homeTeam === id && match.inProgress === false);
    allMatches.map((match) => goals.push(match.homeTeamGoals));
  }
  if (location === 'away') {
    allMatches = matches.filter((match) =>
      match.awayTeam === id && match.inProgress === false);
    allMatches.map((match) => goals.push(match.awayTeamGoals));
  }
  const infavorGoals = goals.reduce((prev, acc) => prev + acc);
  return infavorGoals;
};

const concededGoals = (id: number, matches: Array<Match>, location: string) => {
  const goals: number[] = [];
  let allMatches = [];
  if (location === 'home') {
    allMatches = matches.filter((match) =>
      match.homeTeam === id && match.inProgress === false);
    allMatches.map((match) => goals.push(match.awayTeamGoals));
  }
  if (location === 'away') {
    allMatches = matches.filter((match) =>
      match.awayTeam === id && match.inProgress === false);
    allMatches.map((match) => goals.push(match.homeTeamGoals));
  }
  const allConcededGoals = goals.reduce((prev, acc) => prev + acc);
  return allConcededGoals;
};

const efficiency = (id: number, matches: Array<Match>, location: string) => {
  const allMatches = victory(id, matches, location).v
    + getDraw(id, matches, location).draw
    + getLoss(id, matches, location).l;
  const totalPoints = victory(id, matches, location).points
    + getDraw(id, matches, location).points;
  const totalEfficiency = Number(((totalPoints / (allMatches * 3)) * 100).toFixed(2));
  return totalEfficiency;
};

const game = (id: number, match: Array<Match>, location: string) => {
  const sum = victory(id, match, location).v
  + getDraw(id, match, location).draw
  + getLoss(id, match, location).l;
  return sum;
};

const balance = (id: number, match: Array<Match>, location: string) => {
  const equation = favorGoals(id, match, location)
    - concededGoals(id, match, location);
  return equation;
};

const getPoints = (id: number, match: Array<Match>, location: string) => {
  const equation = victory(id, match, location).points
    + getDraw(id, match, location).points;
  return equation;
};

const createLeaderboard = async (teams: Array<Team>, allMatches: Match[], location: string) => {
  const bla = teams.map((team) => {
    const a = {
      name: team.teamName,
      totalPoints: getPoints(team.id, allMatches, location),
      totalGames: game(team.id, allMatches, location),
      totalVictories: victory(team.id, allMatches, location).v,
      totalDraws: getDraw(team.id, allMatches, location).draw,
      totalLosses: getLoss(team.id, allMatches, location).l,
      goalsFavor: favorGoals(team.id, allMatches, location),
      goalsOwn: concededGoals(team.id, allMatches, location),
      goalsBalance: balance(team.id, allMatches, location),
      efficiency: efficiency(team.id, allMatches, location),
    };
    return a;
  });
  return bla;
};

export const full = async (teams: Array<Team>, allMatches: Match[], away:string, home:string) => {
  const bla = teams.map((team) => {
    const a = {
      name: team.teamName,
      totalPoints: getPoints(team.id, allMatches, home) + getPoints(team.id, allMatches, away),
      totalGames: game(team.id, allMatches, home) + game(team.id, allMatches, away),
      totalVictories: victory(team.id, allMatches, home).v + victory(team.id, allMatches, away).v,
      totalDraws: getDraw(team.id, allMatches, home).draw + getDraw(team.id, allMatches, away).draw,
      totalLosses: getLoss(team.id, allMatches, home).l + getLoss(team.id, allMatches, away).l,
      goalsFavor: favorGoals(team.id, allMatches, home) + favorGoals(team.id, allMatches, away),
      goalsOwn: concededGoals(team.id, allMatches, home) + concededGoals(team.id, allMatches, away),
      goalsBalance: balance(team.id, allMatches, home) + balance(team.id, allMatches, away),
      efficiency: +((getPoints(team.id, allMatches, home) + getPoints(team.id, allMatches, away)
        / (game(team.id, allMatches, home) + game(team.id, allMatches, away) * 3)) * 100).toFixed(2)
      ,
    };
    return a;
  });
  return bla;
};

// const locationVerification = async (teams: Team[], allMatches: Match[], location: string) => {
//   if (location === 'home' || location === 'away') {
//     const result = await createLeaderboard(teams, allMatches, location);
//     return result;
//   }
//   if (location === 'full') {
//     const result = await fullBoard(teams, allMatches, 'away', 'home');
//     return result;
//   }
// };

// const sortBoard = (leaderbord: Array<ILeaderboard>) => {
//   return sorted;
// };

export const sortedLeaderboard = async (teams: Team[], allMatches: Match[], location: string) => {
  const leaderboard = await createLeaderboard(teams, allMatches, location);
  const sorted = leaderboard.sort((a, b) => {
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
};
