import { readFileSync } from 'fs';
import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';

const JWT_CONFIG: SignOptions = {
  expiresIn: '1d',
  algorithm: 'HS256',
};

const JWT_SECRET = readFileSync('jwt.evaluation.key', 'utf-8');

function createToken(dataToSave: object) {
  const token = sign({ dataToSave }, JWT_SECRET, JWT_CONFIG);
  return token;
}

function validateToken(token: string):JwtPayload {
  const result = verify(token, JWT_SECRET) as JwtPayload;
  return result;
}

export {
  createToken,
  validateToken,
};
