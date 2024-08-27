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
import { signOut } from "firebase/auth";
import { useLocation, useParams } from "wouter";

export function Header() {
  const { auth, user } = React.useContext(AuthContext);
  const [location, setLocation] = useLocation();
  const params = useParams();

  return (
    <div>
      <div className="flex items-center justify-between pb-1">
        {location === "/" ? (
          <h1 className="text-2xl font-bold p-2">Blackjack</h1>
        ) : (
          <>
            <span
              className="text-2xl font-bold hover:cursor-pointer hover:bg-zinc-200 p-2"
              onClick={() => setLocation("/")}
            >
              Blackjack
            </span>
            <span className="font-bold">
              room code: <span className="text-2xl">{params.room}</span>
            </span>
          </>
        )}
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
        )}
      </div>
      <Separator />
    </div>
  );
}
