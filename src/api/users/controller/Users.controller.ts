import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UsersController {
  private prisma: PrismaClient;
  constructor(prismaClient: PrismaClient) {
    this.prisma = prismaClient;
  }

  async allUsers(req: Request, res: Response): Promise<void> {
    try {
      const user = await prisma.user.findMany();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, lastname, username, avatar, email, phone, nationality, gender, birthday, blood_type, password } =
        req.body;

      if (
        !name ||
        !lastname ||
        !username ||
        !avatar ||
        !email ||
        !phone ||
        !nationality ||
        !gender ||
        !birthday ||
        !blood_type ||
        !password
      ) {
        res.status(403).json({ error: 'Invalid data!' });
      }

      await prisma.user.create({
        data: { ...req.body, birthday: new Date(birthday), role: 1993 },
      });
      res.status(201).json('CREATED');
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.body;
      if (!id) res.status(403).json({ error: 'invalid data!' });
      await prisma.user.delete({
        where: {
          id: id,
        },
      });
      res.status(200).json('DELETED');
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id, data } = req.body;
      if (!id || !data) res.status(403).json({ error: 'Invalid data!' });
      await prisma.user.update({
        where: {
          id: id,
        },
        data: { ...data },
      });
      res.status(200).json('UPDATED');
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
