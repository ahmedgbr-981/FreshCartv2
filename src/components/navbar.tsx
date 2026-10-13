"use client";
import { ArrowRight, MailBadge, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { Input } from "@base-ui/react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import {
  LogOutIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const x = useSession();

  function logout(){
    signOut({ callbackUrl: "/login" });
  }

  return (
    <nav className="h-18 border-b bg-background">
      <div className="mx-auto flex h-full max-w-(--breakpoint-lg) items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5">
          <Link href={"/"}>
            <img src={"imgi_1_freshcart-logo.49f1b44d.svg"} />
          </Link>

          <div className="relative hidden md:block">
            <Search className="absolute inset-y-0 left-2.5 my-auto h-5 w-5" />
            <Input
              className="w-40 flex-1 rounded-full border-none bg-muted pl-10 shadow-none"
              placeholder="Search"
            />
          </div>

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
        </div>
        <div className="flex items-center gap-3">
          {x.status === "authenticated" ? (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={<Button variant="outline" />}
              >
                {x.data.user?.name }
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <UserIcon />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={logout}>
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href={"/register"}>
                <Button>
                  Sign Up <MailBadge />
                </Button>
              </Link>
              <Link href={"/login"}>
                <Button>
                  Sign In <ArrowRight />
                </Button>
              </Link>
            </>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
        <Link href={"/cart"} className="relative text-xl">
            <ShoppingCart />
          <span className="absolute -top-5  right-0 text-primary">0</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
