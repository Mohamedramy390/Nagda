import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
// Make sure this path matches where you are generating your client!
// If you went back to default, it would just be '@prisma/client'
import { PrismaClient } from '../../generated/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    // We set up the Prisma 7 adapter right inside the constructor
    const connectionString = `${process.env.DATABASE_URL}`;
    const adapter = new PrismaPg({ connectionString });

    // Pass the adapter to the PrismaClient (super)
    super({ adapter });
  }

  // This runs automatically when your Nest app starts
  async onModuleInit() {
    await this.$connect();
  }

  // This runs automatically when your Nest app shuts down
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
