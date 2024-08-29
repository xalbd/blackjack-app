import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "@/components/AuthContext";
import React from "react";
import { LoginDialog } from "@/components/login/LoginDialog";
import { signOut, updateProfile } from "firebase/auth";
import { useLocation, useParams } from "wouter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { generateRandomUsername } from "@/utils/username";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "./ui/form";
import { Input } from "./ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export function Header() {
  const { auth, user } = React.useContext(AuthContext);
  const [copied, setCopied] = React.useState(false);
  const [location, setLocation] = useLocation();
  const params = useParams();

  React.useEffect(() => {
    generateRandomUsername();
    if (copied) {
      const id = setTimeout(() => {
        setCopied(false);
      }, 4000);
      return () => clearTimeout(id);
    }
  }, [copied]);

  const loginSchema = z.object({
    displayName: z
      .string()
      .min(5, "Must be at least 5 characters long")
      .max(20, "Must be at most 20 characters long"),
  });

  const loginForm = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      displayName: user?.displayName || "",
    },
  });

  function onLogin(values: z.infer<typeof loginSchema>) {
    if (!user) return;
    updateProfile(user, { displayName: values.displayName });
  }

  return (
    <TooltipProvider>
      <div>
        <div className="flex items-center justify-between pb-1">
          {location === "/" ? (
            <h1 className="text-2xl font-bold p-2">Blackjack</h1>
          ) : (
            <>
              <span
                className="text-2xl font-bold hover:cursor-pointer hover:bg-zinc-200 p-2 rounded"
                onClick={() => setLocation("/")}
              >
                Blackjack
              </span>
              <Tooltip>
                <TooltipTrigger>
                  <span
                    className="font-bold hover:cursor-pointer hover:bg-zinc-200 p-2 rounded"
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      setCopied(true);
                    }}
                  >
                    {copied ? "copied room link: " : "room code: "}
                    <span className="text-2xl">{params.room}</span>
                  </span>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy Link</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
          {!user || user.isAnonymous ? (
            <LoginDialog />
          ) : (
            <Dialog>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="secondary"
                    className="bg-zinc-200 hover:bg-zinc-300"
                  >
                    <CircleUser className="mr-2 h-4 w-4" />
                    {user.displayName}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DialogTrigger asChild>
                    <DropdownMenuItem>Change Name</DropdownMenuItem>
                  </DialogTrigger>
                  <DropdownMenuItem
                    onClick={() =>
                      auth &&
                      signOut(auth).then(() => {
                        setLocation("/");
                      })
                    }
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DialogContent
                onInteractOutside={(e) => {
                  // Clicking on 1Password button should not close the dialog
                  const target = e.target as HTMLElement;
                  if (target.tagName === "COM-1PASSWORD-BUTTON") {
                    e.preventDefault();
                  }
                }}
              >
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    Change Display Name
                  </DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <Form {...loginForm}>
                    <form
                      onSubmit={loginForm.handleSubmit(onLogin)}
                      className="grid gap-4"
                    >
                      <FormField
                        control={loginForm.control}
                        name="displayName"
                        render={({ field }) => (
                          <FormItem>
                            <div className="grid gap-2">
                              <div className="flex justify-between">
                                <FormLabel>New Name</FormLabel>
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
                      <Button type="submit" className="w-full">
                        Submit
                      </Button>
                    </form>
                  </Form>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>
        <Separator />
      </div>
    </TooltipProvider>
  );
}
