import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

export interface Cat {
  name: string;
  age: number;
  breed: string;
}

@Injectable()
export class CatsService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<Cat>) {}

  async findOne(name: string): Promise<Cat> {
    return await this.catModel.findOne({ name }).exec();
  }

  async findAll(): Promise<Cat[]> {
    return await this.catModel.find().exec();
  }

  async create(cat: Cat): Promise<Cat[]> {
    const createCat = new this.catModel(cat);
    return await createCat.save();
  }
}
