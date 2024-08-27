import { SupabaseModule } from "@common/supabase/supabase.module";
import { YoutubeService } from "@common/youtube/youtube.service";
import { HttpModule } from "@nestjs/axios";
import { Module } from "@nestjs/common";
import { FreeLecturesController } from "./free-lectures.controller";
import { FreeLecturesService } from "./free-lectures.service";

@Module({
  imports: [SupabaseModule, HttpModule],
  controllers: [FreeLecturesController],
  providers: [FreeLecturesService, YoutubeService],
})
export class FreeLecturesModule {}
