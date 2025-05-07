import { Content_ItemRepo } from "./content_Item.repo";
import { Injectable } from "@nestjs/common";
import { CreateContentItemDto } from "./dto/create-content-item.dto";
import { UpdateContentItemDto } from "./dto/update-content-item.dto";
import { StringUtils } from "src/common/utils/string.utils";

@Injectable()
export class Content_ItemService {
  constructor(private readonly _content_ItemRepo: Content_ItemRepo) {}

  // Tạo mới content item
  async create(createContentItemDto: CreateContentItemDto) {
    const count = await this._content_ItemRepo.countContentByLesson(
      createContentItemDto.lid
    );
    const dataCreate = {
      _id: StringUtils.generateObjectId(),
      lid: createContentItemDto.lid,
      type: createContentItemDto.type,
      decs: createContentItemDto.desc,
      data: createContentItemDto.data,
      index: count + 1,
    };

    return await this._content_ItemRepo.createContent_Item(dataCreate);
  }

  // Cập nhật content item
  async update(id: string, updateContentItemDto: UpdateContentItemDto) {
    return await this._content_ItemRepo.updateContent_Item(
      id,
      updateContentItemDto
    );
  }

  // Xóa content item
  async delete(id: string) {
    return await this._content_ItemRepo.deleteContent_Item(id);
  }

  // Lấy danh sách content item theo bài học
  async getByLessonId(lid: string) {
    return await this._content_ItemRepo.findByLessonId(lid);
  }
}
