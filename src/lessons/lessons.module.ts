import {LessonsRepo } from './lessons.repo';import { Lessons, LessonsSchema } from './schema/lessons.schema';import { LessonsService } from './lessons.service';import { LessonsController } from './lessons.controller';
import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [UsersModule, MongooseModule.forFeature([{name: Lessons.name, schema: LessonsSchema}])],
    controllers: [LessonsController],
    providers: [LessonsService, LessonsRepo],
    exports: [LessonsService, LessonsRepo]
})
export class LessonsModule {}

