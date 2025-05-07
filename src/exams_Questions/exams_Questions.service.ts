import { StringUtils } from 'src/common/utils/string.utils';
import { CreateExamsQuestionDto } from './dto/create-exams-question.dto';
import { UpdateExamsQuestionDto } from './dto/update-exams-question.dto';
import { Exams_QuestionsRepo } from './exams_Questions.repo';
import { Injectable } from "@nestjs/common";
import { CreateManyExamsQuestionsDto } from './dto/create-many-exams-questions.dto';

@Injectable()
export class Exams_QuestionsService {
    constructor(private readonly _exams_QuestionsRepo: Exams_QuestionsRepo, ) {}

    async create(body: CreateExamsQuestionDto) {
        // Tạo mới một câu hỏi gắn với kỳ thi
        const data =  {
            _id: StringUtils.generateObjectId(),
            ceid: body.ceid,
            qid: body.qid
        }

        return await this._exams_QuestionsRepo.createExams_Questions(data);
      }
    
      async createMany(body: CreateManyExamsQuestionsDto) {
        // Tạo nhiều câu hỏi gắn với kỳ thi
        const dataCreates = body.data.map((value) => ({
            ...value,
            _id: StringUtils.generateObjectId(),
          }));
          
        return await this._exams_QuestionsRepo.createManyExams_Questions(dataCreates);
      }
    
      async update(id: string, body: UpdateExamsQuestionDto) {
        // Cập nhật câu hỏi trong kỳ thi
        return await this._exams_QuestionsRepo.updateExams_Questions(id, body);
      }
    
      async delete(id: string) {
        // Xóa một câu hỏi khỏi kỳ thi
        return await this._exams_QuestionsRepo.deleteExams_Questions(id);
      }
    
      async getByExamByceId(ceid: string, isShow: boolean = false) {
        // Lấy danh sách câu hỏi thuộc kỳ thi cụ thể
        return await this._exams_QuestionsRepo.findInfoByExamId(ceid, isShow);
      }
}

