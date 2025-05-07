import { Course_ExamsRepo } from "./course_Exams.repo";
import { Course_Exams, Course_ExamsSchema } from "./schema/course_Exams.schema";
import { Course_ExamsService } from "./course_Exams.service";
import { Course_ExamsController } from "./course_Exams.controller";
import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { MongooseModule } from "@nestjs/mongoose";
import { Exam_ResultsModule } from "src/exam_Results/exam_Results.module";
import { Exams_QuestionsModule } from "src/exams_Questions/exams_Questions.module";

@Module({
  imports: [
    UsersModule,
    Exam_ResultsModule,
    Exams_QuestionsModule,
    MongooseModule.forFeature([
      { name: Course_Exams.name, schema: Course_ExamsSchema },
    ]),
  ],
  controllers: [Course_ExamsController],
  providers: [Course_ExamsService, Course_ExamsRepo],
  exports: [Course_ExamsService, Course_ExamsRepo],
})
export class Course_ExamsModule {}
