"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, UsersRound, Wallet } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Students", href: "/students", icon: Users },
  { name: "Groups", href: "/groups", icon: UsersRound },
  { name: "Finances", href: "/finances", icon: Wallet },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 flex-shrink-0 glass-panel flex flex-col m-4 rounded-xl border border-white/5">
      <div className="h-16 flex items-center px-6 border-b border-white/5">
        <h1 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-black">A</span>
          </div>
          AutoDrive
        </h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.name} href={item.href} passHref>
              <Button
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-3 h-12 text-sm font-medium transition-all duration-200",
                  isActive ? "bg-primary/10 text-primary hover:bg-primary/15" : "text-muted-foreground hover:text-white"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-primary" : "text-muted-foreground")} />
                {item.name}
              </Button>
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/5">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-semibold">
            AS
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-white">Alexey Smirnov</span>
            <span className="text-xs text-muted-foreground">Director</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
