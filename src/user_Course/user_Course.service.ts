import { StringUtils } from 'src/common/utils/string.utils';
import { User_CourseRepo } from './user_Course.repo';
import { Injectable } from "@nestjs/common";
import { CreateUserCourseDto } from './dto/create.dto';
import { UpdateUserCourseDto } from './dto/update.dto';

@Injectable()
export class User_CourseService {
    constructor(private readonly _user_CourseRepo: User_CourseRepo, ) {}

    async addUserInCourse(dataCreates: CreateUserCourseDto) {
        const dataMany = dataCreates.uid.map((value) => ({
          _id: StringUtils.generateObjectId(),
          uid: value,
          cid: dataCreates.cid,
          isActive: true,
        }));
      
        return await this._user_CourseRepo.createManyUser_Course(dataMany);
      }
    
    async updateUserInCourse(id, data: UpdateUserCourseDto){
        return await this._user_CourseRepo.updateUser_Course(id, data);
    }

    async deleteCourse(id){
        return await this._user_CourseRepo.deleteUser_Course(id);
    }
}

