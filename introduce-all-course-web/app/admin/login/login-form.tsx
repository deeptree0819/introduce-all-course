"use client";

import { Button } from "@components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import { LoginWithEmailDto } from "@generated/admin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useAdminLoginByEmail } from "@/app/hooks/admin/adminAuthHooks";

import { AdminLoginUserWithEmailSchema } from "./schema";
const LoginForm = () => {
  const form = useForm<LoginWithEmailDto>({
    mode: "onSubmit",
    resolver: zodResolver(AdminLoginUserWithEmailSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: adminLoginByEmail } = useAdminLoginByEmail();
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => adminLoginByEmail(data))}
        className="flex w-full flex-col space-y-6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이메일</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="관리자 이메일을 입력해주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>비밀번호</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="관리자 비밀번호를 입력해주세요."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">로그인</Button>
      </form>
    </Form>
  );
};

export default LoginForm;
