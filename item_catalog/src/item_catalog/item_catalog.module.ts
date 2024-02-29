import { Module } from '@nestjs/common';
import { ItemCatalogService } from './item_catalog.service';
import { ItemCatalogController } from './item_catalog.controller';

@Module({
  providers: [ItemCatalogService],
  controllers: [ItemCatalogController]
})
export class ItemCatalogModule {}
