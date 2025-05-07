import { StringUtils } from 'src/common/utils/string.utils';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { QuizzesRepo } from './quizzes.repo';
import { Injectable } from "@nestjs/common";
import { GetQuizzesByCondition } from './dto/condition.dto';

@Injectable()
export class QuizzesService {
    constructor(private readonly _quizzesRepo: QuizzesRepo, ) {}

    async createQuiz(body: CreateQuizDto) {
        const dataCreate = {
            _id: StringUtils.generateObjectId(),
            ...(body.lid&&{lid: body.lid}),
            questionText: body.questionText,
            type: body.type,
            ...(body.options&&{options: body.options}),
            ...(body.answerKey&&{answerKey: body.answerKey}),
        }
        return await this._quizzesRepo.createQuizzes(dataCreate);
      }
    
      async updateQuiz(id: string, body: UpdateQuizDto) {
        return await this._quizzesRepo.updateQuizzes(id, body);
      }
    
      async deleteQuiz(id: string) {
        return await this._quizzesRepo.deleteQuizzes(id);
      }
    
      async getQuizzesByLesson(lid: string) {
        return await this._quizzesRepo.findQuizzesByCondition({ lid });
      }
      
      async getByCondition(condition: GetQuizzesByCondition){
        return await this._quizzesRepo.getByCondition(condition);
      }
}

