import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const delOrigin = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.get('origin');
  const ip = req.ip || req.connection.remoteAddress;


  if (req.method === 'DELETE') {
    logger.info(`🗑️ DELETE request from IP: ${ip}, Origin: ${origin}`);

    // Allow DELETE if origin is localhost OR origin is undefined (e.g., Postman/curl)
    if (origin && origin !== 'http://locaffflhost:3000') {
      logger.warn(`❌ DELETE blocked from disallowed origin: ${origin}`);
      return res
        .status(403)
        .json({ message: 'DELETE not allowed from this origin' });
    }
  }


  next();
};
