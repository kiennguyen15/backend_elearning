
import { Injectable } from "@nestjs/common";

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { TypeContent } from "../enum/type.enum";

@Schema({
  timestamps: true
})
export class Content_Item {

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
    _id: string;

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Lessons' })
    lid: string;

    @Prop({ required: true, type: String, enum: TypeContent, default: TypeContent.HTML })
    type: TypeContent;

    @Prop({required: true, type: String})
    decs: string;

    @Prop({required: true, type: String})
    data: string;

    @Prop({required: true, type: Number})
    index: number;

}

export type Content_ItemDocument = Content_Item & Document;
export const Content_ItemSchema = SchemaFactory.createForClass(Content_Item);

