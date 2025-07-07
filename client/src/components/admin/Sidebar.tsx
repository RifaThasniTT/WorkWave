"use client"
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { GiSkills } from "react-icons/gi";
import { MdOutlineCategory } from "react-icons/md";
import { TbReportMoney } from "react-icons/tb";
import { FiUsers, FiGrid, FiLogOut, FiHelpCircle, FiBookmark, FiBriefcase } from 'react-icons/fi';
import { adminLogout } from '@/lib/api/admin/login';
import { toast } from 'sonner';

const menuItems = [
  { name: 'Dashboard', icon: <FiGrid />, href: '/admin/dashboard' },
  { name: 'Requests', icon: <FiBookmark />, href: '/admin/requests' },
  { name: 'Companies', icon: <FiBriefcase />, href: '/admin/companies' },
  { name: 'Users', icon: <FiUsers />, href: '/admin/users' },
  { name: 'Categories', icon: <MdOutlineCategory />, href: '/admin/categories' },
  { name: 'Skills', icon: <GiSkills />, href: '/admin/skills' },
  { name: 'Subscription', icon: <TbReportMoney />, href: '/admin/subscription' },
];

const settingItems = [
  { name: "Logout", href: "/logout", icon: <FiLogOut /> },
  { name: "Help", href: "/help", icon: <FiHelpCircle /> },
];

const CompanySidebar = () => {
  const pathname = usePathname();
   const router = useRouter();

  const handleLogout = async () => {
    try {
      await adminLogout(); 
      toast.success("Logged out successfully!");
      router.replace("/admin/login");
    } catch (error) {
      const err = error as Error;
      toast.error(err.message || "Logout failed");
    }
  };

  return (
    <aside className="w-64 bg-[#E2FBFF] min-h-screen p-6 hidden md:block absolute left-0 top-20">
      <div className="space-y-8">
        <nav className="space-y-6">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 p-2 rounded-md text-sm font-medium hover:bg-[#A3E5FF] transition ${
                pathname === item.href ? "bg-[#8FDFFF] text-gray-700" : "text-gray-700"
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
};

export default CompanySidebar;
