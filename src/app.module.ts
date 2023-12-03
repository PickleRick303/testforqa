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
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'build'), // вказуєте шлях до вашої папки зі статичними файлами
    }),
  ],
  controllers: [UsersController],
  providers: [
    AppService,
    AppGateway,
    UsersService,
    OrdersService,
    GamesService,
  ],
})
export class AppModule {}
