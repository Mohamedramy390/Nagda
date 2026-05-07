import { PartialType } from '@nestjs/mapped-types';
import { CreateTicketDto } from './create-ticket.dto';
import { TicketStatus } from '../../../generated/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTicketDto extends PartialType(CreateTicketDto) {
    @IsOptional()
    @IsEnum(TicketStatus)
    status?: TicketStatus;

    @IsString()
    @IsOptional()
    agentId?: string;

    @IsString()
    @IsOptional()
    subject?: string;

    @IsString()
    @IsOptional()
    description?: string;
}
