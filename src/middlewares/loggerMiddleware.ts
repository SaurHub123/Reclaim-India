import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const logRequests = (req: Request, res: Response, next: NextFunction) => {
  const { method, url } = req;
  const start = Date.now();

  logger.info(`➡️ ${method} ${url} hit`);

  const originalSend = res.send;
  res.send = function (body) {
    const duration = Date.now() - start;
    logger.info(`⬅️ ${method} ${url} responded in ${duration}ms: ${body}`);
    return originalSend.call(this, body);
  };

  next();
};
