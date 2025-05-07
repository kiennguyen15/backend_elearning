import { CourseRepo } from './course.repo';
import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from './dto/create.dto';
import { StringUtils } from 'src/common/utils/string.utils';
import { UpdateCourseDto } from './dto/update.dto';
import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/users/enum/role.enum';

@Injectable()
export class CourseService {
    constructor(private readonly _courseRepo: CourseRepo, 
                private readonly _userService: UsersService
    ) {}

    async createCourse(uid, dto: CreateCourseDto){
        const dataCreate = {
            _id: StringUtils.generateObjectId(),
            name: dto.name,
            cateId: dto.cateId,
            respId: uid,
            title: dto.title,
            desc: dto.desc,
            objectives: dto.objectives,
            ...(dto.avatarUrl&&{avatarUrl: dto.avatarUrl}),
            ...(dto.bannerUrl&&{bannerUrl: dto.bannerUrl}),
            purpose: dto.purpose,
            ...(dto.isActive&&{isActive: dto.isActive}),
        }

        return await this._courseRepo.createCourse(dataCreate);
    }

    async updateCourse(id, dto: UpdateCourseDto){
        return await this._courseRepo.updateCourse(id, dto);
    }

    async deleteCourse(id){
        return await this._courseRepo.deleteCourse(id);
    }

    async getInfoCourseById(id){
        return await this._courseRepo.findCourseById(id);
    }

    async getCoursesByCondition(phone, condition){
        const user = await this._userService.findByPhone(phone);
        console.log(user);
        if(user.role.includes(UserRole.STUDENT)){
            return await this._courseRepo.getCoursesByCondition(condition, user._id)
        }else{
            return await this._courseRepo.getCoursesByCondition(condition)
        }
    }
}

