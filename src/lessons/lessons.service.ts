import { StringUtils } from 'src/common/utils/string.utils';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { LessonsRepo } from './lessons.repo';
import { Injectable } from "@nestjs/common";
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
    constructor(private readonly _lessonsRepo: LessonsRepo, ) {}

    async createLesson(body: CreateLessonDto) {
        const count = await this._lessonsRepo.countLessonsByCourse(body.cid);
    
        const lesson = {
          _id: StringUtils.generateObjectId(),
          cid: body.cid,
          title: body.title,
          hasQuiz: body.hasQuiz,
          index: count + 1,
        };
    
        return await this._lessonsRepo.createLessons(lesson);
      }

      async updateLesson(id: string, body: UpdateLessonDto) {
        return await this._lessonsRepo.updateLessons(id, body);
      }
    
      async deleteLesson(id: string) {
        return await this._lessonsRepo.deleteLessons(id);
      }
    
      async getLessonsByCourse(cid: string) {
        return await this._lessonsRepo.getInfoLessons(cid);
      }
}

