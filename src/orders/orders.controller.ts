import { Controller } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('users')
@Controller('orders')
export class OrdersController {
  constructor() {}
}
