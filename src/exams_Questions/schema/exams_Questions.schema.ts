
import { Injectable } from "@nestjs/common";

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

@Schema({
  timestamps: true
})
export class Exams_Questions {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    _id: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Course_Exams' })
    ceid: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Quizzes' })
    qid: string;
}

export type Exams_QuestionsDocument = Exams_Questions & Document;
export const Exams_QuestionsSchema = SchemaFactory.createForClass(Exams_Questions);

