import { Exam_ResultsModule } from './exam_Results/exam_Results.module';import { Exams_QuestionsModule } from "./exams_Questions/exams_Questions.module";
import { Course_ExamsModule } from "./course_Exams/course_Exams.module";
import { QuizzesModule } from "./quizzes/quizzes.module";
import { Content_ItemModule } from "./content_Item/content_Item.module";
import { LessonsModule } from "./lessons/lessons.module";
import { User_CourseModule } from "./user_Course/user_Course.module";
import { CourseModule } from "./course/course.module";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { AuthModule } from "./auth/auth.module";
import { UsersModule } from "./users/users.module";
import { MediaModule } from "./media/media.module";
import { CategoryProductModule } from "./category-product/category-product.module";

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
Exam_ResultsModule,    Exams_QuestionsModule,
    Course_ExamsModule,
    QuizzesModule,
    Content_ItemModule,
    LessonsModule,
    User_CourseModule,
    CourseModule,
    ConfigModule.forRoot({ envFilePath: !ENV ? ".env" : `.env.${ENV}` }),
    MongooseModule.forRoot(process.env.MONGOURL!, {
      dbName: process.env.DATABASE,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "public"),
      serveRoot: "/public",
    }),
    AuthModule,
    UsersModule,
    MediaModule,
    CategoryProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
