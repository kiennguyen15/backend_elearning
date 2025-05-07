
import { Injectable } from "@nestjs/common";

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

@Schema({
  timestamps: true
})
export class Lessons {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    _id: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Course' })
    cid: string;

    @Prop({required: true, type: String})
    title: string;

    @Prop({required: true, type: Number})
    index: number;

    @Prop({required: true, type: Boolean})
    hasQuiz: boolean;
}

export type LessonsDocument = Lessons & Document;
export const LessonsSchema = SchemaFactory.createForClass(Lessons);

