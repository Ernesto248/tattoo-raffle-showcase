import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { RaffleDemo } from "./RaffleDemo";
import type { Language } from "./demo-i18n";
import "./base.css";
import "./demo.css";
import "./demo-v2.css";

function App() {
  const [language, setLanguage] = useState<Language>(() => new URLSearchParams(location.search).get("lang") === "en" ? "en" : "es");
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  return <RaffleDemo language={language} onLanguageChange={setLanguage} />;
}

createRoot(document.getElementById("root")!).render(<App />);
