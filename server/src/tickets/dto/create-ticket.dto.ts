import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TicketStatus, TicketPriority } from '../../../generated/client';

export class CreateTicketDto {
  @IsString()
  ticketNum: string;

  @IsString()
  subject: string;

  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;

  @IsString()
  userId: string;
}
