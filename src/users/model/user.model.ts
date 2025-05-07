import { BaseModel } from "src/common/model/base.model";

export class UserModel extends BaseModel {
    phone?: string;
    fullName?: string;
    role?: string;
    isDelete?: string;
    createAt?: Date;
    updateAt?: Date;
    constructor(user: any) {
      super(user);
      this.phone = user?.phone;
      this.fullName = user?.fullName;
      this.role = user?.role;
      this.updateAt = user?.status;
    }
  }