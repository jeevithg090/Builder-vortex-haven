import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { getNavItems } from "@/lib/navigation";
import { SITE_NAME } from "@/lib/usePageTitle";

const NAV_ITEMS = getNavItems();
const MOBILE_MENU_ID = "mobile-navigation";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen]);

  const linkClass = isScrolled
    ? "text-foreground hover:text-purple-600"
    : "text-white hover:text-light-purple";
  const iconButtonClass = cn(
    "p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-light-purple",
    isScrolled ? "bg-muted hover:bg-muted/80" : "bg-white/10 hover:bg-white/20",
  );
  const iconClass = cn(
    "w-5 h-5",
    isScrolled ? "text-foreground" : "text-white",
  );

  return (
    <motion.nav
      aria-label="Main"
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-background/90 backdrop-blur-lg shadow-lg border-b border-border"
          : "bg-transparent",
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a
            href="#home"
            className={cn("text-xl font-bold transition-colors", linkClass)}
          >
            {SITE_NAME}
          </a>

          {/* Desktop navigation */}
          <ul className="hidden lg:flex items-center gap-2 xl:gap-4">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "transition-colors px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-light-purple",
                    linkClass,
                  )}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              className={iconButtonClass}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDark ? (
                <Sun className={iconClass} aria-hidden="true" />
              ) : (
                <Moon className={iconClass} aria-hidden="true" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              className={cn("lg:hidden", iconButtonClass)}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls={MOBILE_MENU_ID}
            >
              {isMobileMenuOpen ? (
                <X className={iconClass} aria-hidden="true" />
              ) : (
                <Menu className={iconClass} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <motion.ul
            id={MOBILE_MENU_ID}
            className={cn(
              "lg:hidden px-2 pt-2 pb-3 space-y-1 backdrop-blur-lg rounded-lg mt-2",
              isScrolled
                ? "bg-background/95 border border-border"
                : "bg-deep-purple-900/90",
            )}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "block px-3 py-2 rounded-md text-base font-medium transition-colors",
                    isScrolled
                      ? "text-foreground hover:text-purple-600 hover:bg-muted/50"
                      : "text-white hover:text-light-purple hover:bg-white/10",
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;
