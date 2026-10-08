import type { ReactNode } from "react";
import { ArrowLeft, ArrowUpRight, RotateCcw } from "lucide-react";
import { t } from "./demo-i18n";
import type { Language } from "./demo-i18n";

export type DemoSlug = "transactions" | "sgia" | "tattoo-raffle";

const sourceUrl = "https://github.com/Ernesto248/tattoo-raffle-showcase";
const liveUrl = "https://leonardsolutions.dev/demos/tattoo-raffle";

export function DemoHeader({ onReset, language, onLanguageChange }: {
  active: DemoSlug;
  onReset: () => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
}) {
  return <header className="demo-header"><div className="demo-header-inner">
    <a className="demo-brand" href="https://leonardsolutions.dev/#work">LEONARD<span>/</span>SOLUTIONS <small>LAB</small></a>
    <nav className="demo-nav" aria-label={t(language, "Enlaces del proyecto", "Project links")}>
      <a className="active" href={liveUrl}><span>03</span> Tattoo Raffle</a>
      <a href={sourceUrl}>{t(language, "Código fuente", "Source code")} <ArrowUpRight size={13} aria-hidden="true" /></a>
    </nav>
    <div className="demo-language" role="group" aria-label="Language / Idioma">
      <button type="button" aria-pressed={language === "es"} onClick={() => onLanguageChange("es")}>ES</button>
      <button type="button" aria-pressed={language === "en"} onClick={() => onLanguageChange("en")}>EN</button>
    </div>
    <button className="demo-reset" type="button" onClick={onReset}><RotateCcw size={15} aria-hidden="true" /> {t(language, "Reiniciar", "Reset")}</button>
  </div></header>;
}

export function Metric({ label, value, detail, className = "" }: { label: string; value: string; detail?: string; className?: string }) {
  return <div className={`demo-metric ${className}`}><span>{label}</span><strong>{value}</strong>{detail && <small>{detail}</small>}</div>;
}

export function Panel({ kicker, title, children, className = "", id }: { kicker: string; title: string; children: ReactNode; className?: string; id?: string }) {
  return <section id={id} className={`demo-panel ${className}`}><div className="demo-panel-head"><span>{kicker}</span><h2>{title}</h2></div>{children}</section>;
}

export function SandboxHeading({ language, title, description }: { language: Language; title: string; description: string }) {
  return <div id="sandbox" className="demo-sandbox-heading"><div><span>{t(language, "ENTORNO INTERACTIVO / DATOS FICTICIOS", "INTERACTIVE SANDBOX / FICTIONAL DATA")}</span><h2>{title}</h2></div><p>{description}</p></div>;
}

export function DemoFooter({ language }: { active: DemoSlug; language: Language }) {
  return <footer className="demo-footer">
    <a href="https://leonardsolutions.dev/#work"><ArrowLeft size={16} /> {t(language, "Volver a proyectos", "Back to projects")}</a>
    <span>LEONARD SOLUTIONS / PRODUCT LAB</span>
    <a href={sourceUrl}>{t(language, "Explorar código", "Explore source")} <ArrowUpRight size={16} /></a>
  </footer>;
}
