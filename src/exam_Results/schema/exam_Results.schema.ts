import { Injectable } from "@nestjs/common";

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { StatusExam } from "../enum/status.enum";

@Schema({
  timestamps: true,
})
export class Exam_Results {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
  uid: string;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course_Exams",
  })
  ceid: string;

  @Prop({ required: true, type: Number, default: 0 })
  score: number;

  @Prop({
    required: false,
    type: Date,
  })
  submittedAt?: Date;

  @Prop({ required: false, type: Number })
  durationSeconds?: number;

  @Prop({
    required: true,
    type: String,
    enum: StatusExam,
    default: StatusExam.IN_PROGRESS,
  })
  status: StatusExam;

  @Prop({
    type: [
      {
        questionId: { type: mongoose.Schema.Types.ObjectId, ref: "Quizzes", required: true },
        questionText: { type: String, required: true },
        type: { type: String, required: true }, // MULTIPLE_CHOICE hoặc FILL_IN_BLANK
  
        options: {
          type: [
            {
              label: { type: String, required: true },
              value: { type: String, required: true },
              isCorrect: { type: Boolean, required: true }
            }
          ],
          required: false, // null nếu là câu tự luận
        },
  
        answerKey: { type: String, required: false }, // đáp án đúng
  
        selectedOption: { type: String, required: false }, // nếu là MULTIPLE_CHOICE
        writtenAnswer: { type: String, required: false },  // nếu là FILL_IN_BLANK
        isCorrect: { type: Boolean, required: false },     // đã chấm điểm hay chưa
      }
    ],
    required: false
  })
  gradedAnswers?: {
    questionId: mongoose.Types.ObjectId;
    questionText: string;
    type: string;
    options?: {
      label: string;
      value: string;
      isCorrect: boolean;
    }[] | null;
    answerKey?: string;
    selectedOption?: string;
    writtenAnswer?: string;
    isCorrect?: boolean;
  }[];
}

export type Exam_ResultsDocument = Exam_Results & Document;
export const Exam_ResultsSchema = SchemaFactory.createForClass(Exam_Results);
