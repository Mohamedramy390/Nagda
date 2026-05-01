import { IsString, IsEnum, IsOptional } from 'class-validator';
import { TicketStatus, TicketPriority } from '../../../generated/client';

export class CreateTicketDto {
  @IsString()
  subject: string;

  @IsString()
  category: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsEnum(TicketStatus)
  status?: TicketStatus;

  @IsOptional()
  @IsEnum(TicketPriority)
  priority?: TicketPriority;

  @IsString()
  requesterId: string;

  @IsString()
  @IsOptional()
  agentId: string;
}
