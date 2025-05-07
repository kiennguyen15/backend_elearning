import { StringUtils } from "src/common/utils/string.utils";
import { CreateExamResultDto } from "./dto/create.dto";
import { Exam_ResultsRepo } from "./exam_Results.repo";
import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { UserRole } from "src/users/enum/role.enum";

@Injectable()
export class Exam_ResultsService {
  constructor(
    private readonly _exam_ResultsRepo: Exam_ResultsRepo,
    private readonly _userService: UsersService
  ) {}

  async startExam(uid, query: CreateExamResultDto) {
    const dataCreate = {
      _id: StringUtils.generateObjectId(),
      uid: uid,
      ceid: query.ceid,
    };
    return await this._exam_ResultsRepo.createExam_Results(dataCreate);
  }

  async findOneExam_ResultsByCondition(condition) {
    return await this._exam_ResultsRepo.findOneExam_ResultsByCondition(
      condition
    );
  }

  async updateExam(id, data) {
    return await this._exam_ResultsRepo.updateExam_Results(id, data);
  }

  async getExamResults(phone, conndition) {
    // Logic gọi đến Repo để lấy tất cả kỳ thi
    const user = await this._userService.findByPhone(phone);
    if (user.role.includes(UserRole.STUDENT)) {
      return await this._exam_ResultsRepo.getExamResults(
        conndition,
        UserRole.STUDENT,
        user._id
      );
    } else if (user.role.includes(UserRole.INSTRUCTOR)) {
      return await this._exam_ResultsRepo.getExamResults(
        conndition,
        UserRole.INSTRUCTOR,
        user._id
      );
    } else {
      return await this._exam_ResultsRepo.getExamResults(conndition);
    }
  }
}
