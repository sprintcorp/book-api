import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class RabbitMQService {
  constructor(@Inject('rabbit-mq-module') private readonly client: ClientProxy) {}

  async send(pattern: string, data: any) {
    return await this.client.send(pattern, data);
  }

}