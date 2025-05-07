import {Content_ItemRepo } from './content_Item.repo';import { Content_Item, Content_ItemSchema } from './schema/content_Item.schema';import { Content_ItemService } from './content_Item.service';import { Content_ItemController } from './content_Item.controller';
import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [UsersModule, MongooseModule.forFeature([{name: Content_Item.name, schema: Content_ItemSchema}])],
    controllers: [Content_ItemController],
    providers: [Content_ItemService, Content_ItemRepo],
    exports: [Content_ItemService, Content_ItemRepo]
})
export class Content_ItemModule {}

