import path from 'path';
import dotenv from 'dotenv';
dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  port: process.env.PORT || 3000,
  database_url: process.env.DATABASE_URL,
  NODE_ENV: process.env.NODE_ENV,
  salt: process.env.SALT,
  jwtSecret: process.env.JWT_ACCESS_SECRET,
  jwtAccessExpireIn: process.env.JWT_ACCESS_EXPIRES_IN,
};
