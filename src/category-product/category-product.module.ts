import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryProduct, CategoryProductSchema } from './schema/category-product.schema';
import { CategoryProductController } from './category-product.controller';
import { CategoryProductService } from './category-product.service';
import { CategoryProductRepo } from './category-product.repo';
import { UsersModule } from 'src/users/users.module';
import { MediaModule } from 'src/media/media.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryProduct.name, schema: CategoryProductSchema }
    ]),
    UsersModule,
    MediaModule
  ],
  controllers: [CategoryProductController],
  providers: [CategoryProductService, CategoryProductRepo],
  exports: [CategoryProductService, CategoryProductRepo],
})
export class CategoryProductModule {}
