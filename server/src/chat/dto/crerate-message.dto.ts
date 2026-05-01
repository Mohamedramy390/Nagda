import { IsString } from "class-validator";

export class CreateMessageDto {
    @IsString()
    content: string;
    @IsString()
    ticketId: string;
    @IsString()
    userId: string;
}