import { Injectable } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    const adapter = new PrismaMariaDb({
      host: process.env.DB_HOST, // your database host
      user: process.env.DB_USER, // your database username
      password: process.env.DB_PASSWORD, // your database password
      database: process.env.DB_NAME,
    });
    super({ adapter });
  }
}
