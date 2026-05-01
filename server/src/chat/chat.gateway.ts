import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, ConnectedSocket } from '@nestjs/websockets';
import { ChatService } from './chat.service';
import { CreateMessageDto } from './dto/crerate-message.dto';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class ChatGateway {
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  server: Server;

  @SubscribeMessage("send_message")
  async handleMessage(@MessageBody() message: CreateMessageDto): Promise<void> {
    await this.chatService.sendMessage(message);
    this.server.to(`room_${message.ticketId}`).emit("recive_message", message); 
  }

  @SubscribeMessage("join_room")
  handleJoinRoom(@ConnectedSocket() client: Socket, @MessageBody() message: any ) {    
    client.join(`room_${message.ticketId}`);
  }

}
