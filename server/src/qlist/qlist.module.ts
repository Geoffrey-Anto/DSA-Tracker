import { Module } from '@nestjs/common';
import { QlistResolver } from './qlist.resolver';
import { QlistService } from './qlist.service';

@Module({
  providers: [QlistResolver, QlistService],
})
export class QlistModule {}
