import { Controller, Get, UseGuards } from '@nestjs/common';
import { TicketsService } from 'src/tickets/tickets.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly ticketsService: TicketsService) {}
  @Get('overview')
  async getOverview() {
    const [kpis, recent] = await Promise.all([
      this.ticketsService.getTicketKPIs(),
      this.ticketsService.getRecentTickets(),
    ]);

    return { kpis, recent };
  }
}
