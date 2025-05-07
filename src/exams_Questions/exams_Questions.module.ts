import {Exams_QuestionsRepo } from './exams_Questions.repo';import { Exams_Questions, Exams_QuestionsSchema } from './schema/exams_Questions.schema';import { Exams_QuestionsService } from './exams_Questions.service';import { Exams_QuestionsController } from './exams_Questions.controller';
import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [UsersModule, MongooseModule.forFeature([{name: Exams_Questions.name, schema: Exams_QuestionsSchema}])],
    controllers: [Exams_QuestionsController],
    providers: [Exams_QuestionsService, Exams_QuestionsRepo],
    exports: [Exams_QuestionsService, Exams_QuestionsRepo]
})
export class Exams_QuestionsModule {}

