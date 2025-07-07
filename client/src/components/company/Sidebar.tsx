"use client";

import { logout } from "@/lib/api/company/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiMessageSquare,
  FiUser,
  FiBriefcase,
  FiUsers,
  FiLogOut,
  FiHelpCircle,
} from "react-icons/fi";
import { toast } from "sonner";

const navItems = [
  { name: "Dashboard", href: "/company/dashboard", icon: <FiHome /> },
  { name: "Messages", href: "/company/messages", icon: <FiMessageSquare /> },
  { name: "Company Profile", href: "/company/profile", icon: <FiUser /> },
  { name: "Job Listing", href: "/company/jobs", icon: <FiBriefcase /> },
  { name: "Team", href: "/company/team", icon: <FiUsers /> },
];

const settingItems = [
  { name: "Logout", href: "/logout", icon: <FiLogOut /> },
  { name: "Help", href: "/help", icon: <FiHelpCircle /> },
];

export default function CompanySidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout(); // call the API
      toast.success("Logged out successfully!");
      router.replace("/company/login");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Logout failed");
    }
  };


  return (
    <aside className="w-64 bg-[#E2FBFF] min-h-screen p-6 hidden md:block absolute left-0 top-20">
      <div className="space-y-8">
        <nav className="space-y-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 p-2 rounded-md text-sm font-medium hover:bg-[#A3E5FF] transition ${
                pathname === item.href ? "bg-[#77D8FF] text-gray-700" : "text-gray-700"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <div className="mt-16 border-t pt-4 space-y-6">
          {settingItems.map((item) =>
            item.name === "Logout" ? (
              <button
                key={item.name}
                onClick={handleLogout}
                className="flex items-center space-x-3 p-2 rounded-md text-sm font-medium text-gray-700 hover:bg-white transition w-full"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </button>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-3 p-2 rounded-md text-sm font-medium text-gray-700 hover:bg-white transition"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            )
          )}
        </div>
      </div>
    </aside>
  );
}
