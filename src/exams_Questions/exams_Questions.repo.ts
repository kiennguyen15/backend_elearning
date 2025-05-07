
import { Injectable } from "@nestjs/common";
import { Model, ClientSession } from "mongoose";
import { Exams_Questions, Exams_QuestionsDocument } from "src/exams_Questions/schema/exams_Questions.schema";
import { InjectModel } from "@nestjs/mongoose";
import { StringUtils } from "src/common/utils/string.utils";


@Injectable()
export class Exams_QuestionsRepo {
    private readonly _exams_QuestionsModel: Model<Exams_QuestionsDocument>
    constructor(@InjectModel(Exams_Questions.name) exams_QuestionsModel: Model<Exams_QuestionsDocument>){
        this._exams_QuestionsModel = exams_QuestionsModel;
    }
    
    async createExams_Questions(data: any, session?: ClientSession): Promise<Exams_QuestionsDocument> {
        const [Exams_Questions] = await this._exams_QuestionsModel.create([data], { session });
        return Exams_Questions;
    }

    async createManyExams_Questions(data: any, session?: ClientSession): Promise<any>{
        return await this._exams_QuestionsModel.insertMany(data, { session });;
    }

    async findExams_QuestionsById(id: any, session?: ClientSession): Promise<Exams_QuestionsDocument | null> {
        return await this._exams_QuestionsModel.findById(id).session(session || null);
    }

    async findOneExams_QuestionsByCondition(condition: any, session?: ClientSession): Promise<Exams_QuestionsDocument | null> {
        return await this._exams_QuestionsModel.findOne(condition).session(session || null);
    }

    async findExams_QuestionsByCondition(condition: any, session?: ClientSession): Promise<any | null> {
        return await this._exams_QuestionsModel.find(condition).session(session || null);
    }

    async updateExams_Questions(id: any, data: any, session?: ClientSession): Promise<Exams_QuestionsDocument | null> {
        return await this._exams_QuestionsModel.findByIdAndUpdate(id, data, { new: true, session });
    }

    async updateExams_QuestionsByCondition(condition: any, data: any, session?: ClientSession): Promise<Exams_QuestionsDocument | null> {
        return await this._exams_QuestionsModel.findOneAndUpdate(condition, data, {new: true, session});
    }

    async deleteExams_Questions(id: any, session?: ClientSession){
        return await this._exams_QuestionsModel.findByIdAndDelete(id, { session });
    }

     async deleteOneExams_QuestionsByCondition(condition: any, session?: ClientSession){
        return await this._exams_QuestionsModel.deleteOne(condition, {session})
    }
    
    async deleteManyExams_QuestionsByCondition(condition: any, session?: ClientSession){
        return await this._exams_QuestionsModel.deleteMany(condition, {session})
    }

    async findInfoByExamId(ceid: string, isShow: boolean = false) {
        const pipeline: any[] = [
          {
            $match: {
              ceid: StringUtils.ObjectId(ceid)
            }
          },
          {
            $lookup: {
              from: 'quizzes',
              localField: 'qid',
              foreignField: '_id',
              as: 'InfoQuizzes'
            }
          },
          {
            $unwind: '$InfoQuizzes'
          },
          {
            $project: {
              _id: 0,
              questionId: '$InfoQuizzes._id',
              questionText: '$InfoQuizzes.questionText',
              type: '$InfoQuizzes.type',
              options: {
                $map: {
                  input: '$InfoQuizzes.options',
                  as: 'opt',
                  in: {
                    label: '$$opt.label',
                    value: '$$opt.value',
                    ...(isShow && { isCorrect: '$$opt.isCorrect' })
                  }
                }
              },
              ...(isShow && { answerKey: '$InfoQuizzes.answerKey' })
            }
          },
          {
            $group: {
              _id: '$ceid',
              questions: {
                $push: {
                  _id: '$questionId',
                  questionText: '$questionText',
                  type: '$type',
                  options: '$options',
                  ...(isShow && { answerKey: '$answerKey' })
                }
              }
            }
          },
          {
            $project: {
              _id: 0,
              questions: 1
            }
          }
        ];
      
        return await this._exams_QuestionsModel.aggregate(pipeline);
      }
      
      
    
}

