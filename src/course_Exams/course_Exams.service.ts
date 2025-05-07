import { Injectable } from "@nestjs/common";
import { Course_ExamsRepo } from "./course_Exams.repo";
import { CreateCourseExamDto } from "./dto/create-course-exam.dto";
import { UpdateCourseExamDto } from "./dto/update-course-exam.dto";
import { StringUtils } from "src/common/utils/string.utils";
import { GetCourseExamsByCondition } from "./dto/condition.dto";
import { UsersService } from "src/users/users.service";
import { UserRole } from "src/users/enum/role.enum";
import { CreateExamResultDto } from "src/exam_Results/dto/create.dto";
import { Exam_ResultsService } from "src/exam_Results/exam_Results.service";
import { MessageCode } from "src/common/exception/MessageCode";
import { SubmitExamDto } from "./dto/submit-answer.dto";
import { Exams_QuestionsService } from "src/exams_Questions/exams_Questions.service";
import { TypeQuestion } from "src/quizzes/enum/type.enum";
import { StatusExam } from "src/exam_Results/enum/status.enum";

@Injectable()
export class Course_ExamsService {
  constructor(
    private readonly _course_ExamsRepo: Course_ExamsRepo,
    private readonly _userService: UsersService,
    private readonly _exmaResultService: Exam_ResultsService,
    private readonly _examQuestionService: Exams_QuestionsService
  ) {}

  // Tạo mới kỳ thi
  async createCourseExam(createCourseExamDto: CreateCourseExamDto) {
    // Logic gọi đến Repo để tạo kỳ thi mới
    const dataCreate = {
      _id: StringUtils.generateObjectId(),
      cid: createCourseExamDto.cid,
      title: createCourseExamDto.title,
      percentAnswer: createCourseExamDto.percentAnswer,
      direct: createCourseExamDto.direct,
      type: createCourseExamDto.type,
      availableFrom: createCourseExamDto.availableFrom,
      availableTo: createCourseExamDto.availableTo,
    };

    return await this._course_ExamsRepo.createCourse_Exams(dataCreate);
  }

  // Cập nhật kỳ thi
  async updateCourseExam(id: string, updateCourseExamDto: UpdateCourseExamDto) {
    // Logic gọi đến Repo để cập nhật kỳ thi
    return await this._course_ExamsRepo.updateCourse_Exams(
      id,
      updateCourseExamDto
    );
  }

  // Xóa kỳ thi
  async deleteCourseExam(id: string) {
    // Logic gọi đến Repo để xóa kỳ thi
    return await this._course_ExamsRepo.deleteCourse_Exams(id);
  }

  // Lấy tất cả kỳ thi theo khóa học
  async getExamsByCourse(cid: string) {
    // Logic gọi đến Repo để lấy tất cả kỳ thi của khóa học
    return await this._course_ExamsRepo.findCourse_ExamsByCondition({
      cid: cid,
    });
  }


  // Lấy tất cả kỳ thi
  async getAllCourseExams(phone, conndition: GetCourseExamsByCondition) {
    // Logic gọi đến Repo để lấy tất cả kỳ thi
    const user = await this._userService.findByPhone(phone);
    if (user.role.includes(UserRole.STUDENT)) {
      return await this._course_ExamsRepo.getAllCourseExams(
        conndition,
        UserRole.STUDENT,
        user._id
      );
    } else if (user.role.includes(UserRole.INSTRUCTOR)) {
      return await this._course_ExamsRepo.getAllCourseExams(
        conndition,
        UserRole.INSTRUCTOR,
        user._id
      );
    } else {
      return await this._course_ExamsRepo.getAllCourseExams(conndition);
    }
  }

  async startExam(uid, query: CreateExamResultDto) {
    // check time exam
    const exmaCourse = await this._course_ExamsRepo.findCourse_ExamsById(
      query.ceid
    );

    if (!exmaCourse) {
      throw MessageCode.REQUEST.BAD_REQUEST;
    }

    if (new Date(exmaCourse.availableTo) <= new Date()) {
      throw MessageCode.CUSTOM.dynamicError(
        "EXAM_TIME_OVERDUE",
        "Thời gian thi đã quá hạn"
      );
    }
    //
    // check User in Course
    const check = await this.checkUserInCourse(uid, query.ceid);
    if (check.length <= 0) {
      throw MessageCode.USER.INVALID_ROLE;
    }
    //
    // check user start exam
    const userStart =
      await this._exmaResultService.findOneExam_ResultsByCondition({
        uid: uid,
        ceid: query.ceid,
      });
    if (userStart)
      throw MessageCode.CUSTOM.dynamicError(
        "ALREADY_REGISTERED_FOR_THE_EXAM",
        "Sinh viên đã đăng ký thi, vui lòng kiểm tra lại"
      );
    //

    return await this._exmaResultService.startExam(uid, query);
  }

  async submitCourseExams(uid, answer: SubmitExamDto) {
    // check User in Course
    const check = await this.checkUserInCourse(uid, answer.ceid);
    const examResultsUd = await this._exmaResultService.findOneExam_ResultsByCondition({
      uid: uid,
      ceid: answer.ceid
    })
    if (check.length <= 0) {
      throw MessageCode.USER.INVALID_ROLE;
    }

    if(!examResultsUd) throw MessageCode.REQUEST.BAD_REQUEST;
    //
    const { questions } = answer;

    const answerData = await this._examQuestionService.getByExamByceId(
      answer.ceid,
      true
    );

    const result = this.gradeAnswers(questions, answerData[0].questions);
    
    const timeSubmit = Date.now();

    const dataResults: any = {
      score: result.correctCount,
      submittedAt: new Date(timeSubmit),
      durationSeconds: Math.floor((timeSubmit - new Date(check[0].createdAt).getTime()) / 1000)
    }

    if(check[0].percentAnswer >= ((result.correctCount/answerData[0].questions.length)*100)){
      console.log('Rớt rồi nạp tiền đi ba', check[0].percentAnswer, result.correctCount,(result.correctCount/answerData[0].questions.length)*100)
      dataResults.status = StatusExam.FAILED
    }else{
      console.log('Đậu rồi mấy ba', check[0].percentAnswer, result.correctCount,(result.correctCount/answerData[0].questions.length)*100)
      dataResults.status = StatusExam.PASSED
    }

    dataResults.gradedAnswers = result.gradedAnswers


    return await this._exmaResultService.updateExam(examResultsUd._id, dataResults)
  }

  async checkUserInCourse(uid, ceid) {
    return await this._course_ExamsRepo.checkUserInCourse(uid, ceid);
  }

  gradeAnswers(userAnswers, questions) {
    let correctCount = 0;
    const gradedAnswers: any = [];
  
    for (const userAnswer of userAnswers) {
      const question = questions.find(q => String(q._id) === String(userAnswer._id));
      if (!question) continue;
  
      const graded = {
        questionId: question._id,
        questionText: question.questionText,
        type: question.type,
        options: question.options,
        answerKey: question.answerKey,
        selectedOption: undefined,
        writtenAnswer: undefined,
        isCorrect: false,
      };
  
      switch (question.type) {
        case 'MULTIPLE_CHOICE': {
          graded.selectedOption = userAnswer.answer;
          const selectedOption = question.options.find(
            opt => opt.label.trim().toUpperCase() === userAnswer.answer.trim().toUpperCase()
          );
          if (selectedOption?.isCorrect) {
            graded.isCorrect = true;
            correctCount++;
          }
          break;
        }
  
        case 'FILL_IN_BLANK': {
          graded.writtenAnswer = userAnswer.answer;
          const correctAnswer = question.answerKey?.trim().toLowerCase();
          const userResponse = userAnswer.answer?.trim().toLowerCase();
          if (correctAnswer === userResponse) {
            graded.isCorrect = true;
            correctCount++;
          }
          break;
        }
  
        default:
          break;
      }
  
      gradedAnswers.push(graded);
    }
  
    return {
      correctCount,
      gradedAnswers,
    };
  }
  
  
  
}
