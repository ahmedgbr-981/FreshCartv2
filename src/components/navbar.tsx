import { ArrowUpRight, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { Input } from "@base-ui/react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="h-18 border-b bg-background">
      <div className="mx-auto flex h-full max-w-(--breakpoint-lg) items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-5">
         <Link href={'/'}>
          <img src={"imgi_1_freshcart-logo.49f1b44d.svg"}/>
          </Link>

          <div className="relative hidden md:block">
            <Search className="absolute inset-y-0 left-2.5 my-auto h-5 w-5" />
            <Input
              className="w-70 flex-1 rounded-full border-none bg-muted pl-10 shadow-none"
              placeholder="Search"
            />
          </div>

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
        </div>
        <div className="flex items-center gap-3">
          <Button>
            Get Started <ArrowUpRight />
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
        <Link href={'/cart'} className="relative text-xl">
        <ShoppingCart/>
          <span className="absolute -top-5  right-0 text-primary">0</span>
          </Link>
      </div>
    </nav>
  );
};

export default Navbar;
