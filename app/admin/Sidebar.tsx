"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Package,
  BookOpen,
  UserSquare,
  Sparkles,
  Video,
  LogOut,
} from "lucide-react";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Blogs", href: "/admin/blogs", icon: BookOpen },
  { label: "Videos", href: "/admin/videos", icon: Video },
  { label: "Team", href: "/admin/team", icon: UserSquare },
  { label: "Hero Content", href: "/admin/hero", icon: Sparkles },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <aside className="w-56 shrink-0 bg-black flex flex-col h-screen sticky top-0">
      <div className="px-5 py-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="TETLA"
            width={80}
            height={32}
            className="h-8 w-auto object-contain"
          />
          <span className="text-xs font-semibold text-white/50 uppercase tracking-widest">
            Admin
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {nav.map(({ label, href, icon: Icon, exact }) => {
          const active = exact ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-white text-black"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              <Icon size={16} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-colors"
        >
          <LogOut size={16} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
