import { Injectable } from "@nestjs/common";

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { TypeQuestion } from "../enum/type.enum";

@Schema({
  timestamps: true,
})
export class Quizzes {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Prop({
    required: false,
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lessons",
  })
  lid?: string;

  @Prop({ required: true, type: String })
  questionText: string;

  @Prop({
    required: true,
    type: String,
    enum: TypeQuestion,
    default: TypeQuestion.MULTIPLE_CHOICE,
  })
  type: TypeQuestion;

  @Prop({
    required: false,
    type: [
      {
        label: { type: String, required: true },
        value: { type: String, required: true },
        isCorrect: { type: Boolean, default: false },
      }
    ]
  })
  options?: {
    label: string;
    value: string;
    isCorrect?: boolean;
  }[];

  @Prop({ required: false, type: mongoose.Schema.Types.Mixed })
  answerKey?: string | string[];
}

export type QuizzesDocument = Quizzes & Document;
export const QuizzesSchema = SchemaFactory.createForClass(Quizzes);
