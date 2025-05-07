import { Injectable } from "@nestjs/common";

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { TypeExam } from "../enum/type.enum";

@Schema({
  timestamps: true,
})
export class Course_Exams {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Course" })
  cid: string;

  @Prop({ required: true, type: String })
  title: string;

  @Prop({
    required: true,
    type: String,
    enum: TypeExam,
    default: TypeExam.CERTIFICATION_EXAM,
  })
  type: TypeExam;

  @Prop({ required: true, type: Number })
  percentAnswer: number;

  @Prop({ required: true, type: Boolean, default: true })
  direct: boolean;

  @Prop({
    required: true,
    type: Date,
  })
  availableFrom: Date;

  @Prop({
    required: true,
    type: Date,
  })
  availableTo: Date; 
}

export type Course_ExamsDocument = Course_Exams & Document;
export const Course_ExamsSchema = SchemaFactory.createForClass(Course_Exams);
