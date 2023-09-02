// src/logging/logging.service.ts

import { Injectable } from '@nestjs/common';
import * as amqp from 'amqplib';

@Injectable()
export class LoggingService {
  private readonly rabbitMqUrl = 'amqps://scfwsotk:f52LYqeskoX8pUYbr-8Il9wlYy8-yTEI@crow.rmq.cloudamqp.com/scfwsotk'; // Update with your RabbitMQ server URL

  async logRequest(request: any): Promise<void> {
    const connection = await amqp.connect(this.rabbitMqUrl);
    const channel = await connection.createChannel();

    const exchange = 'book_api';

    await channel.assertExchange(exchange, 'fanout', { durable: false });
    const logMessage = JSON.stringify(request);
    channel.publish(exchange, '', Buffer.from(logMessage));

    console.log(`[LoggingService] Sent request log: ${logMessage}`);

    await channel.close();
    await connection.close();
  }
}
