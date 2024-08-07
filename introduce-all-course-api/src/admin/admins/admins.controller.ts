import { CustomApiOperation } from "@common/decorators/api-operation.decorator";
import { Roles } from "@common/decorators/roles.decorator";
import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";
import { AdminsService } from "./admins.service";

@ApiBearerAuth()
@Roles("SUPER")
@Controller()
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @CustomApiOperation({
    summary: "어드민 목록 조회",
    tags: ["admin-admins"],
  })
  @Get("/admin/admins")
  async getAllAdmins() {
    return this.adminsService.getAllAdmins();
  }
}
