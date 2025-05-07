import {QuizzesRepo } from './quizzes.repo';import { Quizzes, QuizzesSchema } from './schema/quizzes.schema';import { QuizzesService } from './quizzes.service';import { QuizzesController } from './quizzes.controller';
import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [UsersModule, MongooseModule.forFeature([{name: Quizzes.name, schema: QuizzesSchema}])],
    controllers: [QuizzesController],
    providers: [QuizzesService, QuizzesRepo],
    exports: [QuizzesService, QuizzesRepo]
})
export class QuizzesModule {}

