import { AdminsService } from "@admin/services/admins.service";
import { Controller, Get } from "@nestjs/common";

@Controller("admin/admins")
export class AdminsController {
  constructor(private readonly adminsService: AdminsService) {}

  @Get()
  async getAllAdmins() {
    return this.adminsService.getAllAdmins();
  }
}
