import { Module } from '@nestjs/common';
import { storageController } from './storage.controller';
import { storageService } from './storage.service';

@Module({
  controllers: [storageController],
  providers: [storageService],
  exports: [storageService],
})
export class StorageModule {}
