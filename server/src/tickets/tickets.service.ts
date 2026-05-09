import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketsService {
  private readonly logger = new Logger(TicketsService.name);

  constructor(private readonly prisma: PrismaService) {}

  async createTicket(createTicketDto: CreateTicketDto) {
    this.logger.log("Creating ticket with data: ", createTicketDto)

    const user = await this.prisma.user.findUnique({where: {id: createTicketDto.requesterId}})
    if(!user || !user.departmentId){
      throw new NotFoundException("User or department not found")
    }

    const slaPolicy = await this.prisma.slaPolicy.findFirst({
      where: {
        priority: createTicketDto.priority,
      }
    })

    if(!slaPolicy){
      throw new NotFoundException("SLA Policy not found")
    }

    const responseDueAt = new Date();
    responseDueAt.setMinutes(responseDueAt.getMinutes() + slaPolicy.responseTimeMin);

    const resolutionDueAt = new Date();
    resolutionDueAt.setMinutes(resolutionDueAt.getMinutes() + slaPolicy.resolutionTimeMin);

    const newTicket = await this.prisma.ticket.create({ data: { ...createTicketDto, departmentId: user.departmentId, responseDueAt, resolutionDueAt } });
    return newTicket;
  }

  async getTicketDetails(id: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { id },
      include: {
        requester: {select: {id: true, name: true, email: true, phone: true, position: true, office: true,}},
        agent: {select: {id: true, name: true, email: true, phone: true, position: true, office: true}},
        messages: {
          include: {
            user: {select: {id: true, name: true}},
          },
          orderBy: {createdAt: 'asc'},
        },
        department: {select: {name: true}},
        slaPolicy: true,
      },
    });

    if(!ticket){
      throw new NotFoundException("Ticket not found")
    }
    return ticket
  }

  async findAll() {
    return await this.prisma.ticket.findMany();
  }

  async getTicket(id: string) {
    return await this.prisma.ticket.findUnique({ where: { id } });
  }

  async getTicketRequseter(requesterId: string) {
    return await this.prisma.user.findUnique({ where: { id: requesterId } });
  }
  async getTicketAgent(agentId: string) {
    return await this.prisma.user.findUnique({ where: { id: agentId } });
  }

  async updateTicket(id: string, updateTicketDto: UpdateTicketDto) {
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
