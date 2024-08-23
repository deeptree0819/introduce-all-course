"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@components/ui/form";
import { CreateAdminDto } from "@generated/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@utils/common";
import { useForm } from "react-hook-form";

import { useCreateAdmin } from "@/app/hooks/admin/adminAdminsHooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { CreateAdminSchema } from "../schema";

type CreateAdminFormProps = {
  className?: string;
};

const CreateAdminForm = ({ className }: CreateAdminFormProps) => {
  const form = useForm<{ password_confirm: string } & CreateAdminDto>({
    mode: "onSubmit",
    resolver: zodResolver(CreateAdminSchema),
  });
  const { handleSubmit } = form;
  const { mutate: createAdmin } = useCreateAdmin();

  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>어드민 추가</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={handleSubmit((data) => createAdmin(data))}
            className="flex flex-col"
          >
            <div className="mt-4 flex flex-row items-end space-x-20">
              <div className="flex flex-col items-start space-y-7">
                <FormField
                  control={form.control}
                  name="admin_role"
                  render={({ field }) => (
                    <FormItem className="grid w-[600px] items-center gap-1.5">
                      <Label>권한</Label>
                      <Select onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="권한을 선택해주세요." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SUPER">어드민</SelectItem>
                          <SelectItem value="MANAGER">매니저</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="admin_name"
                  render={({ field }) => (
                    <FormItem className="grid w-[600px] items-center gap-1.5">
                      <Label htmlFor="adminName">이름</Label>
                      <Input
                        {...field}
                        type="text"
                        id="adminName"
                        placeholder="어드민명을 입력해주세요."
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="admin_email"
                  render={({ field }) => (
                    <FormItem className="grid w-[600px] items-center gap-1.5">
                      <Label htmlFor="adminEmail">이메일</Label>
                      <Input
                        {...field}
                        type="email"
                        id="adminEmail"
                        placeholder="이메일을 입력해주세요."
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="admin_password"
                  render={({ field }) => (
                    <FormItem className="grid w-[600px] items-center gap-1.5">
                      <Label htmlFor="adminPassword">비밀번호</Label>
                      <Input
                        {...field}
                        type="password"
                        id="adminPassword"
                        placeholder="비밀번호를 입력해주세요."
                        autoComplete="new-password"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password_confirm"
                  render={({ field }) => (
                    <FormItem className="grid w-[600px] items-center gap-1.5">
                      <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
                      <Input
                        {...field}
                        type="password"
                        id="passwordConfirm"
                        placeholder="비밀번호를 다시 한 번 입력해주세요."
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <Button className="mt-10 self-end" type="submit">
              등록
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateAdminForm;
