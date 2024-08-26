import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "../ui/form";
import { Input } from "../ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AuthContext } from "../AuthContext";
import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";

export function LoginForm() {
  const { auth } = React.useContext(AuthContext);

  const loginSchema = z.object({
    email: z.string().email("Invalid"),
    password: z.string(),
  });

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onLogin(values: z.infer<typeof loginSchema>) {
    if (!auth) return;
    signInWithEmailAndPassword(auth, values.email, values.password).then(() => {
      // forces websocket connection to reestablish (hack to avoid rewrite of auth logic on backend)
      window.location.reload();
    });
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl">Login</DialogTitle>
        <DialogDescription>
          Enter your credentials to login to your account
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4">
        <Form {...loginForm}>
          <form
            onSubmit={loginForm.handleSubmit(onLogin)}
            className="grid gap-4"
          >
            <FormField
              control={loginForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <FormLabel>Email</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="twentyone@player.com"
                        autoComplete="email"
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <FormLabel>Password</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        autoComplete="current-password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
