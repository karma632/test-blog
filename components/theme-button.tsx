"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex cursor-pointer h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-sm transition hover:bg-black dark:border-white/10 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}