import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { Controller, Get } from "@nestjs/common";
import { AdminsService } from "./admins.service";

@Controller("/admin/admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @CustomApiOperation({
    summary: "어드민 목록 조회",
    tags: ["admin-admins"],
  })
  @Get()
  async getAllAdmins() {
    return this.adminsService.getAllAdmins();
  }
}
