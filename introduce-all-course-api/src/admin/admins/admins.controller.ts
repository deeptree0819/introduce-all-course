import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AdminsService } from "./admins.service";

@Controller("/admin/admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @ApiTags("어드민 어드민관리")
  @Get()
  async getAllAdmins() {
    return this.adminsService.getAllAdmins();
  }
}
