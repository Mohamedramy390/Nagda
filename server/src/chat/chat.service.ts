import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/crerate-message.dto';

@Injectable()
export class ChatService {
  private readonly logger = new Logger(ChatService.name);

  constructor(private readonly prisma: PrismaService) {}

  async sendMessage(message: CreateMessageDto) {
    return await this.prisma.message.create({ data: message });
  }

  async getMessages(ticketId: string) {
    return await this.prisma.message.findMany({
      where: { ticketId },
      include: {
        user: {select: {id: true, name: true, email: true}},
      },
    });
  }

  async ack(ticketId: string) {
    this.logger.log(`Acking message: ${ticketId}`);
  }

}
