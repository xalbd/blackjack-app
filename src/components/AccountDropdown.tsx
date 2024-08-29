import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { updateProfile, signOut } from "firebase/auth";
import { CircleUser } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "./ui/form";
import { Input } from "./ui/input";
import React from "react";
import { AuthContext } from "./AuthContext";
import { useLocation } from "wouter";

export function AccountDropdown() {
  const { user, auth } = React.useContext(AuthContext);
  const [, setLocation] = useLocation();
  const [open, setOpen] = React.useState(false);

  const newUsernameSchema = z.object({
    displayName: z
      .string()
      .min(5, "Must be at least 5 characters long")
      .max(20, "Must be at most 20 characters long"),
  });

  const newUsernameForm = useForm<z.infer<typeof newUsernameSchema>>({
    resolver: zodResolver(newUsernameSchema),
    defaultValues: {
      displayName: user?.displayName || "",
    },
  });

  function onNewUsername(values: z.infer<typeof newUsernameSchema>) {
    if (!user) return;
    updateProfile(user, { displayName: values.displayName }).then(() =>
      setOpen(false)
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="bg-zinc-200 hover:bg-zinc-300">
            <CircleUser className="mr-2 h-4 w-4" />
            {user?.displayName}
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
          <DialogTitle className="text-2xl">Change Display Name</DialogTitle>
          <DialogDescription>
            Change how you appear to other players
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <Form {...newUsernameForm}>
            <form
              onSubmit={newUsernameForm.handleSubmit(onNewUsername)}
              className="grid gap-4"
            >
              <FormField
                control={newUsernameForm.control}
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
  );
}
