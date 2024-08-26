import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthContext } from "./AuthContext";
import React from "react";
import { LoginDialog } from "@/components/login/LoginDialog";
import { signOut } from "firebase/auth";

export function Header() {
  const { auth, user } = React.useContext(AuthContext);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold">Blackjack</h1>
        {!user || user.isAnonymous ? (
          <LoginDialog />
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="secondary"
                className="bg-zinc-200 hover:bg-zinc-300"
              >
                <CircleUser className="mr-2 h-4 w-4" />
                {user?.uid}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() =>
                  auth && signOut(auth).then(() => window.location.reload())
                }
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <Separator />
    </div>
  );
}
