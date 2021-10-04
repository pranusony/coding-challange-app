import {BadRequestException, Controller, Get, Query} from '@nestjs/common';
import { AppService } from './app.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('data')
  getData(@Query('search') search?:string, @Query('field') field?:string): any {
    if(search && !field) {
      throw new BadRequestException('Field must be defined in the query')
    }
    if(search && field) {
      return this.appService.getData({search, field})
    }
    return this.appService.getData();
  }
}
