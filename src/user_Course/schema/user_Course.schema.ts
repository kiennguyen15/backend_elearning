import { Injectable } from "@nestjs/common";

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { UserRole } from "src/users/enum/role.enum";

@Schema({
  timestamps: true,
})
export class User_Course {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "User" })
  uid: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: "Course" })
  cid: string;

  @Prop({required: true, type: Boolean, default: true})
  isActive: boolean;
}

export type User_CourseDocument = User_Course & Document;
export const User_CourseSchema = SchemaFactory.createForClass(User_Course);
