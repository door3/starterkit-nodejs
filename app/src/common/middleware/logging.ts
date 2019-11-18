import { IRequest, IResponse } from '../interfaces/http.interfaces';
import { NextFunction } from 'express';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { LogService } from '../services/log.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  constructor(private readonly logger: LogService) {}

  use(req: IRequest, res: IResponse, next: NextFunction) {

    this.logger.log(`${req.method} ${req.originalUrl}`, 'Incoming');
    res.on('finish', () => {
      this.logger.log(`status: ${res.statusCode} - ${res.getHeader('Content-Length') || '0'}`, 'Outgoing');
    });
    next();

  }

}
