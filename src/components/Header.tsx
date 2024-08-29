import { Separator } from "@/components/ui/separator";
import { AuthContext } from "@/components/AuthContext";
import React from "react";
import { LoginDialog } from "@/components/login/LoginDialog";
import { useLocation, useParams } from "wouter";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { generateRandomUsername } from "@/utils/username";
import { AccountDropdown } from "./AccountDropdown";

export function Header() {
  const { user } = React.useContext(AuthContext);
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
          {!user || user.isAnonymous ? <LoginDialog /> : <AccountDropdown />}
        </div>
        <Separator />
      </div>
    </TooltipProvider>
  );
}
