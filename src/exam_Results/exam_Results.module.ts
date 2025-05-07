import {Exam_ResultsRepo } from './exam_Results.repo';import { Exam_Results, Exam_ResultsSchema } from './schema/exam_Results.schema';import { Exam_ResultsService } from './exam_Results.service';import { Exam_ResultsController } from './exam_Results.controller';
import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [UsersModule, MongooseModule.forFeature([{name: Exam_Results.name, schema: Exam_ResultsSchema}])],
    controllers: [Exam_ResultsController],
    providers: [Exam_ResultsService, Exam_ResultsRepo],
    exports: [Exam_ResultsService]
})
export class Exam_ResultsModule {}

