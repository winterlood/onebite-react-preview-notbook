import { ThemeButtonWrapper } from "./ThemeButton.style";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useState, useEffect } from "react";

export default function ThemeButton() {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme as "dark" | "light");
    }
  }, []);

  useEffect(() => {
    if (theme) {
      window.localStorage.setItem("theme", theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  if (!theme) return null;

  return (
    <ThemeButtonWrapper onClick={toggleTheme}>
      {theme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
    </ThemeButtonWrapper>
  );
}
