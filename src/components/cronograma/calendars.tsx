import { cn } from "@/lib/utils";
import { TODAY } from "@/data/schedule";

type Tone = "idle" | "i" | "ii" | "iii" | "iv" | "gl" | "today";

const MONTHS: { name: string; year: number; month: number; days: number }[] = [
  { name: "Septiembre", year: 2026, month: 8, days: 30 },
  { name: "Octubre", year: 2026, month: 9, days: 31 },
  { name: "Noviembre", year: 2026, month: 10, days: 30 },
];

const DOW = ["L", "M", "X", "J", "V", "S", "D"];

function iso(year: number, month: number, day: number) {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

function toneFor(date: string, weekday: number): Tone {
  if (date === TODAY) return "today";
  if (date === "2026-11-03") return "gl";
  if (weekday >= 5) return "idle";
  if (date >= "2026-09-21" && date <= "2026-10-02") return "i";
  if (date >= "2026-10-05" && date <= "2026-10-09") return "ii";
  if (date >= "2026-10-12" && date <= "2026-10-16") return "iii";
  if (date >= "2026-10-19" && date <= "2026-10-30") return "iv";
  return "idle";
}

const toneClass: Record<Tone, string> = {
  idle: "text-muted/70",
  i: "bg-gold-dim text-gold",
  ii: "bg-cream/10 text-cream",
  iii: "bg-gold text-navy font-semibold",
  iv: "bg-cream/20 text-cream",
  gl: "bg-gold text-navy font-semibold ring-2 ring-gold",
  today: "text-cream ring-1 ring-gold",
};

function Month({ name, year, month, days }: (typeof MONTHS)[number]) {
  const first = new Date(year, month, 1).getDay();
  const mondayOffset = (first + 6) % 7;
  const cells: { day: number | null; date?: string; wd?: number }[] = [];
  for (let i = 0; i < mondayOffset; i++) cells.push({ day: null });
  for (let d = 1; d <= days; d++) {
    const date = iso(year, month, d);
    const wd = (mondayOffset + d - 1) % 7;
    cells.push({ day: d, date, wd });
  }

  return (
    <div className="rounded-xl bg-navy-2 p-4 shadow-[var(--shadow-border)]">
      <div className="mb-3 flex items-baseline justify-between">
        <h3 className="font-display text-lg font-semibold tracking-tight text-cream">{name}</h3>
        <span className="text-xs font-medium tracking-widest text-muted uppercase">2026</span>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {DOW.map((d) => (
          <div key={d} className="pb-1 text-xs font-medium tracking-wider text-muted">
            {d}
          </div>
        ))}
        {cells.map((c, i) => {
          if (!c.day || !c.date) return <div key={i} />;
          const tone = toneFor(c.date, c.wd ?? 0);
          return (
            <div
              key={c.date}
              title={c.date}
              className={cn(
                "flex h-8 items-center justify-center rounded-sm text-xs tabular-nums",
                toneClass[tone],
              )}
            >
              {c.day}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CalendarMonths() {
  return (
    <section className="grid gap-3 md:grid-cols-3">
      {MONTHS.map((m) => (
        <Month key={m.name} {...m} />
      ))}
    </section>
  );
}
