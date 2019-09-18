import {
  Controller,
  Get,
  Req,
  Post,
  HttpCode,
  Header,
  Param,
  Body,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateCatDto } from './create-cat.dto';
import { CatsService, Cat } from './cats.service';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':name')
  async findOne(@Param('name') name: string): Promise<Cat> {
    return this.catsService.findOne(name);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  @Post()
  @HttpCode(201)
  @Header('Cache-Control', 'none')
  async create(
    @Body(new ValidationPipe()) createCatDto: CreateCatDto,
  ): Promise<Cat[]> {
    return this.catsService.create(createCatDto);
  }
}
