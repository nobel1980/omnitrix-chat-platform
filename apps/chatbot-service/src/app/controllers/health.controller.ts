import { Request, Response, NextFunction } from 'express';
import { prisma } from '../../infrastructure/prisma/prisma.client';

export class HealthController {
  public check = (req: Request, res: Response, next: NextFunction) => {
    res.json({
      status: 'UP',
      timestamp: new Date(),
    });
  };

  public checkDetailed = async (req: Request, res: Response, next: NextFunction) => {
    let dbStatus = 'DOWN';
    try {
      // Direct raw query to test MySQL database connection
      await prisma.$queryRaw`SELECT 1`;
      dbStatus = 'UP';
    } catch (e) {
      dbStatus = 'DOWN';
    }

    res.json({
      status: dbStatus === 'UP' ? 'UP' : 'DEGRADED',
      timestamp: new Date(),
      services: {
        database: dbStatus,
        memoryUsage: process.memoryUsage(),
        uptime: process.uptime(),
      },
    });
  };
}
