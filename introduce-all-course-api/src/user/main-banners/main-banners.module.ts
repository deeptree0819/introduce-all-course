import { SupabaseModule } from "@common/supabase/supabase.module";
import { Module } from "@nestjs/common";
import { MainBannersController } from "./main-banners.controller";
import { MainBannersService } from "./main-banners.service";

@Module({
  imports: [SupabaseModule],
  controllers: [MainBannersController],
  providers: [MainBannersService],
})
export class MainBannersModule {}
