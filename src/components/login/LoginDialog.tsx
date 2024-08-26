import { LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import React from "react";
import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";

export function LoginDialog() {
  const [isLogin, setIsLogin] = React.useState(true);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className="bg-zinc-200 hover:bg-zinc-300"
          onClick={() => setIsLogin(true)}
        >
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Button>
      </DialogTrigger>
      <DialogContent
        onInteractOutside={(e) => {
          // Clicking on 1Password button should not close the dialog
          const target = e.target as HTMLElement;
          if (target.tagName === "COM-1PASSWORD-BUTTON") {
            e.preventDefault();
          }
        }}
      >
        {isLogin ? (
          <>
            <LoginForm />
            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Button
                variant="link"
                className="p-0"
                onClick={() => setIsLogin(false)}
              >
                Sign up
              </Button>
            </div>
          </>
        ) : (
          <>
            <SignUpForm />
            <div className="text-center text-sm">
              Have an account already?{" "}
              <Button
                variant="link"
                className="p-0"
                onClick={() => setIsLogin(true)}
              >
                Login
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
