import { NextFunction, Request, Response } from 'express';
import Team from '../database/models/team';
import { validateToken } from '../utils/Token';

export const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(400).json({ message: 'Token inválido' });
    const token = await validateToken(authorization);
    if (!token) return res.status(400).json({ message: 'Token inválido' });
    next();
  } catch (e) {
    console.log(e);
  }
};

export const equalTeamsValidation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { homeTeam, awayTeam } = req.body;
    if (homeTeam === awayTeam) {
      return res
        .status(401)
        .json({ message: 'It is not possible to create a match with two equal teams' });
    }
    next();
  } catch (e) {
    console.log(e);
  }
};

export const teamExistence = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { homeTeam, awayTeam } = req.body;
    const verifyHomeTeamExistence = await Team.findByPk(homeTeam);
    const verifyAwayTeamExistence = await Team.findByPk(awayTeam);
    if (!verifyHomeTeamExistence || !verifyAwayTeamExistence) {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    next();
  } catch (e) {
    console.log(e);
  }
};
