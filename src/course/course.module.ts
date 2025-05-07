import {CourseRepo } from './course.repo';import { Course, CourseSchema } from './schema/course.schema';import { CourseService } from './course.service';import { CourseController } from './course.controller';
import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [UsersModule, MongooseModule.forFeature([{name: Course.name, schema: CourseSchema}])],
    controllers: [CourseController],
    providers: [CourseService, CourseRepo],
    exports: [CourseService, CourseRepo]
})
export class CourseModule {}

