import { SupabaseModule } from "@common/supabase/supabase.module";
import { Module } from "@nestjs/common";
import { EventsController } from "./events.controller";
import { EventsService } from "./events.service";

@Module({
  imports: [SupabaseModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
