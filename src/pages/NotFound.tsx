import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePageTitle } from "@/lib/usePageTitle";

const NotFound = () => {
  const location = useLocation();
  usePageTitle("Page not found");

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.warn("404: no route matches", location.pathname);
    }
  }, [location.pathname]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4 text-foreground">
      <div className="text-center">
        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-brand-purple">
          Error 404
        </p>
        <h1 className="mb-4 text-4xl font-bold">Page not found</h1>
        <p className="mb-8 text-lg text-muted-foreground">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-block rounded-xl bg-brand-purple px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-purple/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          Return to home
        </Link>
      </div>
    </main>
  );
};

export default NotFound;
