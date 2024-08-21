import { SupabaseModule } from "@common/supabase/supabase.module";
import { Module } from "@nestjs/common";
import { InquiryController } from "./inquiry.controller";
import { InquiryService } from "./inquiry.service";

@Module({
  imports: [SupabaseModule],
  controllers: [InquiryController],
  providers: [InquiryService],
})
export class InquiryModule {}
