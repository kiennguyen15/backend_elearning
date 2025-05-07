import { Roles } from "src/common/meta/role.meta";
import { Exam_ResultsService } from "./exam_Results.service";
import { Control } from "src/common/meta/control.meta";
import { UserRole } from "src/users/enum/role.enum";
import { Get, Query } from "@nestjs/common";
import { Description } from "src/common/meta/description.meta";
import { User } from "src/common/meta/user.meta";
import { UserQuery } from "src/auth/model/userQuery.model";
import { GetResultsByCondition } from "./dto/condition.dto";

@Control("exam_Results")
export class Exam_ResultsController {
  constructor(private readonly _exam_ResultsService: Exam_ResultsService) {}

  @Roles(UserRole.ADMIN, UserRole.INSTRUCTOR, UserRole.STUDENT)
  @Get("getExamResults")
  @Description("Lịch sử thi", [
    { status: 200, description: "Get courses successfully" },
  ])
  async getExamResults(
    @User() user: UserQuery,
    @Query() condition: GetResultsByCondition
  ) {
    return await this._exam_ResultsService.getExamResults(user.phone, condition);
  }
}
