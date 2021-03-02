import { Injectable } from '@nestjs/common';
import { CreateUnitDto } from './dto/create-unit.dto';
import { UpdateUnitDto } from './dto/update-unit.dto';
import { UnitRepository } from './unit.repository';

@Injectable()
export class UnitService {
  constructor(private unitRepository: UnitRepository) {}

  create(createUnitDto: CreateUnitDto) {
    const unit = this.unitRepository.create(createUnitDto);
    return this.unitRepository.save(unit);
  }

  findAll() {
    return this.unitRepository.find();
  }

  findOne(id: number) {
    return this.unitRepository.findOne(id);
  }

  async update(id: number, updateUnitDto: UpdateUnitDto) {
    const unit = await this.findOne(id);
    this.unitRepository.merge(unit, updateUnitDto);
    try {
      return await this.unitRepository.save(unit);
    } catch (error) {
      return null;
    }
  }

  remove(id: number) {
    return this.unitRepository.delete(id);
  }
}
