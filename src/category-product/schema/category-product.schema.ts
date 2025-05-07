import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({
  timestamps: true,
})
export class CategoryProduct {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true })
  priority: number;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  image?: string;
}

export type CategoryProductDocument = CategoryProduct & Document;
export const CategoryProductSchema = SchemaFactory.createForClass(CategoryProduct);
