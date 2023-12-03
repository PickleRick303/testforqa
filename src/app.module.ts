import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppGateway } from './app.gateway';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { GamesService } from './games/games.service';
import { GamesController } from './games/games.controller';
@Module({
  imports: [],
  controllers: [UsersController, OrdersController, GamesController],
  providers: [AppService, AppGateway, UsersService, OrdersService, GamesService],
})
export class AppModule {}
