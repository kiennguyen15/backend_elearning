import { Body, Delete, Get, Post, Put, Query } from "@nestjs/common";
import { Content_ItemService } from "./content_Item.service";
import { Control } from "src/common/meta/control.meta";
import { Description } from "src/common/meta/description.meta";
import { CreateContentItemDto } from "./dto/create-content-item.dto";
import { UpdateContentItemDto } from "./dto/update-content-item.dto";

@Control("content_Item")
export class Content_ItemController {
  constructor(private readonly _content_ItemService: Content_ItemService) {}

  @Post("create")
  @Description("Tạo content item mới", [
    { status: 200, description: "Create successfully" },
  ])
  async create(@Body() body: CreateContentItemDto) {
    return await this._content_ItemService.create(body);
  }

  @Put("update")
  @Description("Cập nhật content item", [
    { status: 200, description: "Update successfully" },
  ])
  async update(@Query("id") id: string, @Body() body: UpdateContentItemDto) {
    return await this._content_ItemService.update(id, body);
  }

  @Delete("delete")
  @Description("Xóa content item", [
    { status: 200, description: "Delete successfully" },
  ])
  async delete(@Query("id") id: string) {
    return await this._content_ItemService.delete(id);
  }

  @Get("getByLid")
  @Description("Lấy danh sách content item theo bài học (lid)", [
    { status: 200, description: "Get content items successfully" },
  ])
  async getByLesson(@Query("lid") lid: string) {
    return await this._content_ItemService.getByLessonId(lid);
  }
}
