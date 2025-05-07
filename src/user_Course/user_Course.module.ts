import {User_CourseRepo } from './user_Course.repo';import { User_Course, User_CourseSchema } from './schema/user_Course.schema';import { User_CourseService } from './user_Course.service';import { User_CourseController } from './user_Course.controller';
import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [UsersModule, MongooseModule.forFeature([{name: User_Course.name, schema: User_CourseSchema}])],
    controllers: [User_CourseController],
    providers: [User_CourseService, User_CourseRepo],
    exports: [User_CourseService, User_CourseRepo]
})
export class User_CourseModule {}

