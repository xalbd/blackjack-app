import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { AuthContext } from "../AuthContext";
import React from "react";
import {
  EmailAuthProvider,
  linkWithCredential,
  updateProfile,
} from "firebase/auth";

export function SignUpForm() {
  const { auth, user } = React.useContext(AuthContext);

  const signUpSchema = z
    .object({
      displayName: z
        .string()
        .min(5, "Must be at least 5 characters long")
        .max(20, "Must be at most 20 characters long"),
      email: z.string().email("Invalid"),
      password: z.string().min(8, "Must be at least 8 characters long"),
      password2: z.string(),
    })
    .refine((data) => data.password === data.password2, {
      message: "Does not match",
      path: ["password2"],
    });

  const signUpForm = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
      password2: "",
    },
  });

  function onSignUp(values: z.infer<typeof signUpSchema>) {
    if (!auth || !user) return;
    const credential = EmailAuthProvider.credential(
      values.email,
      values.password
    );
    linkWithCredential(user, credential).then(() => {
      updateProfile(user, { displayName: values.displayName });
      // forces websocket connection to reestablish (hack to avoid rewrite of auth logic on backend)
      window.location.reload();
    });
  }
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-2xl">Sign Up</DialogTitle>
        <DialogDescription>
          Create an account to compete with other players
        </DialogDescription>
      </DialogHeader>

      <div className="grid gap-4">
        <Form {...signUpForm}>
          <form
            onSubmit={signUpForm.handleSubmit(onSignUp)}
            className="grid gap-4"
          >
            <FormField
              control={signUpForm.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <FormLabel>Display Name</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="jackthe11th"
                        autoComplete="username"
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={signUpForm.control}
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
              control={signUpForm.control}
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
                        autoComplete="new-password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={signUpForm.control}
              name="password2"
              render={({ field }) => (
                <FormItem>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <FormLabel>Verify Password</FormLabel>
                      <FormMessage />
                    </div>
                    <FormControl>
                      <Input
                        autoComplete="new-password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </form>
        </Form>
      </div>
    </>
  );
}
