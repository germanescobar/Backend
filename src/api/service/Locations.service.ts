import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class Locations {
  constructor() {}

  static async getLocations() {
    try {
      const locations = await prisma.location.findMany({
        include: { headquarters: { select: { city: true, address: true } } },
      });
      return locations;
    } catch (error) {
      console.log(error);
    }
  }
}
