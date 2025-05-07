import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserRole } from '../enum/role.enum';
import { UserStatus } from '../enum/status.enum';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true, unique: true })
  phone: string;

  @Prop()
  email?: string;

  @Prop({ required: false })
  class: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true, type: [String], enum: UserRole, default: [UserRole.STUDENT] })
  role: UserRole[];

  @Prop({ required: true, select: false })
  password: string;

  @Prop()
  avatar?: string;

  @Prop({ type: String, enum: UserStatus, default: UserStatus.ACTIVE })
  status: UserStatus;
}

export const UserSchema = SchemaFactory.createForClass(User);
