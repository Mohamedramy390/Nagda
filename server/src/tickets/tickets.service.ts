import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketsService {
  constructor(private readonly prisma: PrismaService) {}

  async createTicket(createTicketDto: CreateTicketDto) {
    return await this.prisma.ticket.create({ data: createTicketDto });
  }

  async findAll() {
    return await this.prisma.ticket.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.ticket.findUnique({ where: { id } });
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    return await this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.ticket.delete({ where: { id } });
  }

  async getTicketKPIs() {
    const [openCount, inProgressCount, closedCount] = await Promise.all([
      this.prisma.ticket.count({ where: { status: 'OPEN' } }),
      this.prisma.ticket.count({ where: { status: 'IN_PROGRESS' } }),
      this.prisma.ticket.count({ where: { status: 'CLOSED' } }),
    ]);

    return { openCount, inProgressCount, closedCount };
  }

  async getRecentTickets() {
    return await this.prisma.ticket.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });
  }
}
