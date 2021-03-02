import { Module } from '@nestjs/common';
import { UnitService } from './unit.service';
import { UnitController } from './unit.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unit } from './entities/unit.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Unit])],
  exports: [UnitService],
  controllers: [UnitController],
  providers: [UnitService],
})
export class UnitModule {}
