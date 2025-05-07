
import { Injectable } from "@nestjs/common";
import { Model, ClientSession } from "mongoose";
import { User_Course, User_CourseDocument } from "src/user_Course/schema/user_Course.schema";
import { InjectModel } from "@nestjs/mongoose";


@Injectable()
export class User_CourseRepo {
    private readonly _user_CourseModel: Model<User_CourseDocument>
    constructor(@InjectModel(User_Course.name) user_CourseModel: Model<User_CourseDocument>){
        this._user_CourseModel = user_CourseModel;
    }
    
    async createUser_Course(data: any, session?: ClientSession): Promise<User_CourseDocument> {
        const [User_Course] = await this._user_CourseModel.create([data], { session });
        return User_Course;
    }

    async createManyUser_Course(data: any, session?: ClientSession): Promise<any>{
        return await this._user_CourseModel.insertMany(data, { session });;
    }

    async findUser_CourseById(id: any, session?: ClientSession): Promise<User_CourseDocument | null> {
        return await this._user_CourseModel.findById(id).session(session || null);
    }

    async findOneUser_CourseByCondition(condition: any, session?: ClientSession): Promise<User_CourseDocument | null> {
        return await this._user_CourseModel.findOne(condition).session(session || null);
    }

    async findUser_CourseByCondition(condition: any, session?: ClientSession): Promise<any | null> {
        return await this._user_CourseModel.find(condition).session(session || null);
    }

    async updateUser_Course(id: any, data: any, session?: ClientSession): Promise<User_CourseDocument | null> {
        return await this._user_CourseModel.findByIdAndUpdate(id, data, { new: true, session });
    }

    async updateUser_CourseByCondition(condition: any, data: any, session?: ClientSession): Promise<User_CourseDocument | null> {
        return await this._user_CourseModel.findOneAndUpdate(condition, data, {new: true, session});
    }

    async deleteUser_Course(id: any, session?: ClientSession){
        return await this._user_CourseModel.findByIdAndDelete(id, { session });
    }

     async deleteOneUser_CourseByCondition(condition: any, session?: ClientSession){
        return await this._user_CourseModel.deleteOne(condition, {session})
    }
    
    async deleteManyUser_CourseByCondition(condition: any, session?: ClientSession){
        return await this._user_CourseModel.deleteMany(condition, {session})
    }
}

