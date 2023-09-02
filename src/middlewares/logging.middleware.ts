import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from 'src/services/logger.service';

@Injectable()
export class RabbitMqLoggerMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  async use(req: Request, res: Response, next: () => void) {
    await this.loggingService.logRequest({
      method: req.method,
      url: req.originalUrl,
      body: req.body,
      headers: req.headers,
    });

    next();
  }
}
