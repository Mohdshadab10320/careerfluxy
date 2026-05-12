import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Mic, Flame, LayoutDashboard } from "lucide-react";

const items = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/courses", icon: BookOpen, label: "Learn" },
  { to: "/simulator", icon: Mic, label: "Interview" },
  { to: "/daily", icon: Flame, label: "Daily" },
  { to: "/dashboard", icon: LayoutDashboard, label: "Me" },
];

const MobileBottomNav = () => {
  const location = useLocation();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-border/60">
      <ul className="flex items-center justify-around px-2 py-2">
        {items.map(({ to, icon: Icon, label }) => {
          const active = to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                className={`flex flex-col items-center gap-0.5 rounded-xl py-1.5 text-[10px] font-medium transition-all ${
                  active ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                <span
                  className={`flex h-9 w-9 items-center justify-center rounded-xl transition-all ${
                    active ? "gradient-neon text-white shadow-neon" : "bg-muted/50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default MobileBottomNav;