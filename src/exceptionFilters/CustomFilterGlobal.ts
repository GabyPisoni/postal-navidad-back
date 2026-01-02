import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Logger } from '@nestjs/common';

@Catch()
export class ErrorGlobalException implements ExceptionFilter {
  private readonly logger = new Logger();
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const payload =
      exception instanceof HttpException
        ? exception.getResponse()
        : 'Internal server error';
    //IIFE
    const parseMessage = (() => {
      if (typeof payload === 'string') return payload;
      if (Array.isArray((payload as any).message))
        return (payload as any).message.join(' - ');

      return (payload as any).message ?? JSON.stringify(payload);
    })();
    const formatLog = `[${request.method}] ${request.url} - ${status}`;

    //type logs
    if (status >= 500) this.logger.error(formatLog, parseMessage);
    if (status >= 400 && status < 500)
      this.logger.warn(formatLog, parseMessage);
    if (status < 400) this.logger.log(formatLog, parseMessage);

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: parseMessage,
    });
  }
}
