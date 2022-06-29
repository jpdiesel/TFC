import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';
import Match from './match';

class Team extends Model {
  id: number;
  teamName: string;
}

Team.init({
  id: {
    primaryKey: true,
    type: INTEGER,
  },
  teamName: STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'team',
  // tableName: 'teams',
  timestamps: false,
});

Match.belongsTo(Team, { foreignKey: 'homeTeam', as: 'teamHome' });
Match.belongsTo(Team, { foreignKey: 'awayTeam', as: 'teamAway' });

Team.hasMany(Match, { foreignKey: 'homeTeam', as: 'teamHome' });
Team.hasMany(Match, { foreignKey: 'awayTeam', as: 'teamAway' });

export default Team;
