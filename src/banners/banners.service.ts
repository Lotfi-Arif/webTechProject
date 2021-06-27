import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBannerDto } from './dto/create-banner.dto';
import { UpdateBannerDto } from './dto/update-banner.dto';
import { Banner } from './entities/banner.entity';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner)
    private bannersRepository: Repository<Banner>,
  ) {}

  create(createBannerDto: CreateBannerDto) {
    return this.bannersRepository.save(createBannerDto);
  }

  findAll() {
    return this.bannersRepository.find();
  }

  findOne(id: number) {
    return this.bannersRepository.findOne(id);
  }

  update(id: number, updateBannerDto: UpdateBannerDto) {
    return this.bannersRepository
      .createQueryBuilder()
      .update()
      .where('id = :id', { id })
      .set(updateBannerDto as any)
      .execute();
  }

  remove(id: number) {
    return this.bannersRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }
}
