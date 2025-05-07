
import { Injectable } from "@nestjs/common";

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

@Schema({
  timestamps: true
})
export class Course {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    _id: string;

    @Prop({required: true, type: String})
    name: string;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'CategoryProduct'})
    cateId: string;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    respId: string;

    @Prop({required: true, type: String})
    title: string;

    @Prop({required: true, type: String})
    desc: string;

    @Prop({required: true, type: String})
    objectives: string;

    @Prop({required: true, type: String})
    avatarUrl: string;

    @Prop({required: true, type: String})
    bannerUrl: string;

    @Prop({required: true, type: String})
    purpose: string;

    @Prop({required: true, type: Boolean, default: true})
    isActive: boolean;
}

export type CourseDocument = Course & Document;
export const CourseSchema = SchemaFactory.createForClass(Course);

