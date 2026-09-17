import { useMemo, useState } from "react";
import {
  AlertTriangle,
  CalendarRange,
  ChevronDown,
  Flag,
  Mail,
  Printer,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  activityParty,
  CONTRACT,
  daysUntil,
  dependencies,
  GO_LIVE,
  KICKOFF,
  phases,
  stats,
  VALUE,
  weeks,
  type Activity,
  type Phase,
} from "@/data/schedule";
import { CalendarMonths } from "./calendars";

type Filter = "all" | "costa" | "xactus" | "hitos";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "Todo" },
  { id: "costa", label: "Costa Dorada" },
  { id: "xactus", label: "Xactus" },
  { id: "hitos", label: "Hitos" },
];

function matchesFilter(a: Activity, filter: Filter) {
  if (filter === "all") return true;
  if (filter === "hitos") return a.kind !== "work";
  const party = activityParty(a);
  if (filter === "costa") return party === "costa" || party === "both";
  return party === "xactus" || party === "both";
}

export function CronogramaDocument() {
  const [open, setOpen] = useState<string[]>(["i", "ii", "iii", "iv", "s"]);
  const [filter, setFilter] = useState<Filter>("all");
  const toKickoff = daysUntil(KICKOFF);
  const toGoLive = daysUntil(GO_LIVE);

  function toggle(id: string) {
    setOpen((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  const construction = phases.filter((p) => p.id !== "s");
  const support = phases.find((p) => p.id === "s")!;

  return (
    <div className="min-h-screen bg-ink">
      <Header toKickoff={toKickoff} />
      <main className="mx-auto max-w-6xl px-4 pb-20 pt-8 sm:px-8">
        <Hero toGoLive={toGoLive} />
        <Gantt />
        <div className="mt-10 mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-gold uppercase">Calendario 2026</p>
            <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight text-cream">
              Semanas hábiles, día por día
            </h2>
          </div>
          <Legend />
        </div>
        <CalendarMonths />

        <div className="mt-12 mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium tracking-[0.22em] text-gold uppercase">Plan de trabajo</p>
            <h2 className="font-display mt-1 text-3xl font-semibold tracking-tight text-cream">
              Fases y actividades
            </h2>
          </div>
          <div className="no-print flex flex-wrap gap-1 rounded-full bg-navy-2 p-1 shadow-[var(--shadow-border)]">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "min-h-11 rounded-full px-4 text-sm font-medium transition-colors duration-150",
                  filter === f.id ? "bg-gold text-navy" : "text-muted hover:text-cream",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {construction.map((phase) => (
            <PhaseCard
              key={phase.id}
              phase={phase}
              open={open.includes(phase.id)}
              onToggle={() => toggle(phase.id)}
              filter={filter}
            />
          ))}
        </div>

        <GoLive />

        <div className="mt-6">
          <PhaseCard
            phase={support}
            open={open.includes(support.id)}
            onToggle={() => toggle(support.id)}
            filter={filter}
          />
        </div>

        <Dependencies />
      </main>
      <Footer />
    </div>
  );
}

function Header({ toKickoff }: { toKickoff: number }) {
  return (
    <header className="sticky top-0 z-20 border-b border-gold-line bg-navy/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <div className="flex min-w-0 items-center gap-4 sm:gap-6">
          <div>
            <div className="text-lg font-semibold tracking-[0.28em] text-cream">XACTUS</div>
            <div className="text-xs font-medium tracking-[0.32em] text-gold">SOCIO TECNOLÓGICO</div>
          </div>
          <div className="hidden h-9 w-px bg-line-strong sm:block" />
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold tracking-wide text-cream sm:text-base">
              GRUPO COSTA DORADA
            </div>
            <div className="truncate text-xs text-muted">
              Quick Win #1 — Informe Ejecutivo Inteligente de Inventario
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <span className="hidden rounded-full bg-gold px-3 py-1 text-xs font-semibold tracking-wide text-navy sm:inline">
            {CONTRACT}
          </span>
          <span className="hidden rounded-full border border-line-strong px-3 py-1 text-xs font-medium text-cream-soft md:inline">
            {VALUE}
          </span>
          <span className="hidden rounded-full border border-gold-line px-3 py-1 text-xs font-medium text-gold lg:inline">
            Kickoff en {toKickoff} días
          </span>
          <button
            type="button"
            onClick={() => window.print()}
            className="no-print inline-flex min-h-11 items-center gap-2 rounded-full bg-cream px-4 text-sm font-semibold text-navy transition-transform duration-150 active:scale-[0.98]"
          >
            <Printer className="size-4" />
            <span className="hidden sm:inline">Imprimir</span>
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero({ toGoLive }: { toGoLive: number }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-navy-2 px-5 py-8 shadow-[var(--shadow-border)] sm:px-10 sm:py-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-gold to-transparent" />
      <p className="text-xs font-medium tracking-[0.28em] text-gold uppercase">
        Primer informe real en la bandeja de Enrique
      </p>
      <h1 className="font-display mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-cream sm:text-6xl">
        Martes 3 de noviembre, 2026
      </h1>
      <p className="mt-4 max-w-2xl text-base text-cream-soft sm:text-lg">
        A las 8:00 AM, con datos reales del corte del <span className="text-gold">lunes 2 de noviembre</span>.
        A partir de esa fecha, cada martes, sin intervención humana.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl bg-navy-3 px-4 py-4">
            <div className="font-display text-3xl font-semibold tabular-nums text-cream">{s.value}</div>
            <div className="mt-1 text-xs font-medium tracking-wide text-muted uppercase">{s.label}</div>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm text-muted">
        Hoy es jueves 17 de septiembre. Faltan {toGoLive} días para el go-live.
      </p>
    </section>
  );
}

function Legend() {
  const items = [
    { cls: "bg-gold-dim ring-1 ring-gold-line", label: "Fase I" },
    { cls: "bg-cream/10", label: "Fase II" },
    { cls: "bg-gold", label: "Fase III / Go-live" },
    { cls: "bg-cream/20", label: "Fase IV" },
    { cls: "ring-1 ring-gold", label: "Hoy 17 sep" },
  ];
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-muted">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-2">
          <span className={cn("size-2.5 rounded-sm", i.cls)} />
          {i.label}
        </li>
      ))}
    </ul>
  );
}

function Gantt() {
  const bars = useMemo(
    () => [
      { id: "I", title: "Integración", start: 1, end: 2, tone: "gold" as const },
      { id: "II", title: "Agente IA", start: 3, end: 3, tone: "soft" as const },
      { id: "III", title: "Informe", start: 4, end: 4, tone: "gold" as const },
      { id: "IV", title: "Pruebas", start: 5, end: 6, tone: "soft" as const },
    ],
    [],
  );

  return (
    <section className="mt-10 rounded-3xl bg-navy-2 p-5 shadow-[var(--shadow-border)] sm:p-7">
      <div className="mb-5 flex items-center gap-2 text-gold">
        <CalendarRange className="size-4" />
        <p className="text-xs font-medium tracking-[0.22em] uppercase">Línea de tiempo · 6 semanas hábiles</p>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-full">
          <div className="mb-3 grid grid-cols-7 gap-2 text-center text-xs text-muted">
            {weeks.map((w) => (
              <div key={w.id}>
                <div className="font-medium text-cream-soft">{w.label}</div>
                <div className="mt-0.5">{w.range}</div>
              </div>
            ))}
            <div>
              <div className="font-medium text-gold">Go-live</div>
              <div className="mt-0.5">Mar 3 nov</div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {bars.map((b) => (
              <div key={b.id} className="grid grid-cols-7 gap-2">
                {Array.from({ length: 7 }, (_, i) => {
                  const col = i + 1;
                  const inBar = col >= b.start && col <= b.end;
                  const isGl = col === 7;
                  return (
                    <div
                      key={col}
                      className={cn(
                        "flex h-10 items-center justify-center rounded-md text-xs font-semibold",
                        isGl && b.id === "IV"
                          ? "bg-gold text-navy"
                          : inBar && b.tone === "gold"
                            ? "bg-gold-dim text-gold"
                            : inBar
                              ? "bg-cream/10 text-cream"
                              : "bg-navy-3/60",
                      )}
                    >
                      {inBar ? `${b.id} · ${b.title}` : isGl && b.id === "IV" ? "3 nov" : ""}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PhaseCard({
  phase,
  open,
  onToggle,
  filter,
}: {
  phase: Phase;
  open: boolean;
  onToggle: () => void;
  filter: Filter;
}) {
  const rows = phase.activities.filter((a) => matchesFilter(a, filter));
  const hidden = phase.activities.length - rows.length;

  return (
    <article className="overflow-hidden rounded-3xl bg-navy-2 shadow-[var(--shadow-border)]">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full min-h-14 items-center gap-4 px-5 py-4 text-left sm:px-7"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold-dim font-display text-lg font-semibold text-gold">
          {phase.numeral}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-medium text-cream">{phase.title}</span>
          <span className="mt-0.5 block text-xs text-muted">
            {phase.rangeLabel} · {phase.duration}
          </span>
        </span>
        <span className="hidden rounded-full bg-navy-3 px-3 py-1 text-xs font-medium text-cream-soft sm:inline">
          {phase.duration}
        </span>
        <ChevronDown
          className={cn(
            "size-5 shrink-0 text-muted transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      <div className={cn("print-open", !open && "hidden")}>
        <div className="hidden border-t border-line bg-navy px-5 py-2 text-xs font-medium tracking-wider text-muted uppercase sm:grid sm:grid-cols-[8.5rem_1.2fr_1.2fr_8.5rem_7.5rem] sm:px-0">
          <div className="px-5 py-2">Fecha</div>
          <div className="px-3 py-2">Actividad</div>
          <div className="px-3 py-2">Hito verificable</div>
          <div className="px-3 py-2">Costa Dorada</div>
          <div className="px-3 py-2">Xactus</div>
        </div>
        {rows.length === 0 ? (
          <p className="border-t border-line px-7 py-6 text-sm text-muted">
            Ninguna actividad coincide con este filtro.
            {hidden > 0 ? ` ${hidden} ocultas.` : ""}
          </p>
        ) : (
          rows.map((a) => <ActivityRow key={a.id} activity={a} />)
        )}
        {(filter === "all" || filter === "hitos") && (
          <div
            className={cn(
              "flex items-start gap-3 border-t border-line px-5 py-4 sm:px-7",
              phase.deliverableKind === "gold" ? "bg-gold-dim" : "bg-navy",
            )}
          >
            <span
              className={cn(
                "mt-1 size-2.5 shrink-0 rounded-full",
                phase.deliverableKind === "gold" ? "bg-gold" : "bg-ok",
              )}
            />
            <p className="flex-1 text-sm font-medium text-cream">
              Entregable: {phase.deliverable}
            </p>
            <p className="text-xs text-muted">{phase.deliverableDate}</p>
          </div>
        )}
      </div>
    </article>
  );
}

function ActivityRow({ activity }: { activity: Activity }) {
  const checkpoint = activity.kind === "checkpoint";
  return (
    <div
      className={cn(
        "grid gap-2 border-t border-line px-5 py-4 sm:grid-cols-[8.5rem_1.2fr_1.2fr_8.5rem_7.5rem] sm:gap-0 sm:px-0",
        checkpoint && "bg-gold-dim",
      )}
    >
      <div className="flex items-center gap-2 px-0 text-sm font-semibold text-gold sm:px-5">
        {checkpoint && <Flag className="size-3.5 shrink-0" />}
        <span>{activity.dateLabel}</span>
      </div>
      <div className="px-0 text-sm font-medium text-cream sm:px-3">{activity.name}</div>
      <div className="px-0 text-sm text-muted sm:px-3">{activity.hito}</div>
      <div className="px-0 text-xs text-cream-soft sm:px-3">
        <span className="mr-2 text-muted sm:hidden">Costa Dorada</span>
        {activity.costa}
      </div>
      <div className="px-0 text-xs text-cream-soft sm:px-3">
        <span className="mr-2 text-muted sm:hidden">Xactus</span>
        {activity.xactus}
      </div>
    </div>
  );
}

function GoLive() {
  return (
    <section className="relative mt-6 overflow-hidden rounded-3xl bg-cream px-6 py-10 text-navy sm:px-12 sm:py-12">
      <p className="text-xs font-semibold tracking-[0.32em] uppercase">Go-live</p>
      <h2 className="font-display mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">
        Martes 3 de noviembre, 8:00 AM
      </h2>
      <p className="mt-4 max-w-2xl text-base text-navy-3">
        Primer Informe Ejecutivo Inteligente de Inventario y Abastecimiento generado
        automáticamente. Datos reales del corte del lunes 2 de noviembre. A partir de esta
        fecha, cada martes, sin intervención humana.
      </p>
      <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2 text-sm font-medium text-cream">
        <Mail className="size-4 text-gold" />
        Scheduler activo · bandeja de Enrique
      </div>
    </section>
  );
}

function Dependencies() {
  return (
    <section className="mt-10 overflow-hidden rounded-3xl bg-navy-2 shadow-[var(--shadow-border)]">
      <div className="flex items-center gap-3 border-b border-line px-5 py-5 sm:px-7">
        <AlertTriangle className="size-4 text-gold" />
        <div>
          <h2 className="text-base font-semibold text-cream">Dependencias críticas</h2>
          <p className="text-sm text-muted">
            Si alguna no se cumple, el cronograma se ajusta como se indica.
          </p>
        </div>
      </div>
      <div className="hidden border-b border-line bg-navy px-7 py-2 text-xs font-medium tracking-wider text-muted uppercase md:grid md:grid-cols-[3rem_1.4fr_10rem_8rem_1.4fr]">
        <div>#</div>
        <div>Dependencia</div>
        <div>Responsable</div>
        <div>Fecha límite</div>
        <div>Si no se cumple</div>
      </div>
      {dependencies.map((d) => (
        <div
          key={d.n}
          className="grid gap-1 border-b border-line px-5 py-4 last:border-b-0 md:grid-cols-[3rem_1.4fr_10rem_8rem_1.4fr] md:items-center md:px-7"
        >
          <div className="font-display text-lg font-semibold text-gold">{d.n}</div>
          <div className="text-sm font-medium text-cream">{d.name}</div>
          <div className="text-sm text-cream-soft">{d.owner}</div>
          <div className="text-sm font-semibold text-gold">{d.deadline}</div>
          <div className="text-sm text-muted">{d.impact}</div>
        </div>
      ))}
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line px-4 py-6 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 text-xs text-muted sm:flex-row sm:justify-between">
        <span>XACTUS SAS · NIT 901.362.606-4 · juan.amaya@xactus.io · brayan.rosales@xactus.io</span>
        <span>Cronograma sujeto a disponibilidad de accesos e información por parte de Costa Dorada</span>
      </div>
    </footer>
  );
}
