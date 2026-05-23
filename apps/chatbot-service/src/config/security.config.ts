import { env } from './env.config';

export const securityConfig = {
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: '1d',
  },
  cors: {
    origin: '*',
  },
  bcrypt: {
    saltRounds: 10,
  },
};
