import { NavLink } from "@/components/NavLink";
import { Building2, Users, FileText, Home, Building, CreditCard, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Home, label: "Панель управления" },
  { to: "/clients", icon: Users, label: "Клиенты" },
  { to: "/contracts", icon: FileText, label: "Договоры" },
  { to: "/complexes", icon: Building2, label: "Жилые комплексы" },
  { to: "/blocks", icon: Building, label: "Блоки" },
  { to: "/payments", icon: CreditCard, label: "Платежи" },
  { to: "/notifications", icon: Bell, label: "Уведомления" },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-sidebar-foreground">BuildCRM</h1>
            <p className="text-xs text-sidebar-foreground/60">Управление строительством</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors"
            activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-sidebar-accent rounded-lg p-4">
          <p className="text-sm text-sidebar-accent-foreground font-medium mb-1">Нужна помощь?</p>
          <p className="text-xs text-sidebar-accent-foreground/60">Обратитесь в поддержку</p>
        </div>
      </div>
    </aside>
  );
};
