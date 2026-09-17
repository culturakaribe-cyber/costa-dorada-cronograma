export type Party = "costa" | "xactus" | "both" | "none";

export type Activity = {
  id: string;
  dateLabel: string;
  start: string;
  end: string;
  name: string;
  hito: string;
  costa: string;
  xactus: string;
  kind: "work" | "checkpoint" | "milestone";
};

export type Phase = {
  id: string;
  numeral: string;
  title: string;
  rangeLabel: string;
  duration: string;
  start: string;
  end: string;
  weekSpan: [number, number];
  activities: Activity[];
  deliverable: string;
  deliverableDate: string;
  deliverableKind: "standard" | "gold";
};

export const TODAY = "2026-09-17";
export const KICKOFF = "2026-09-21";
export const GO_LIVE = "2026-11-03";
export const GO_LIVE_CUTOFF = "2026-11-02";
export const CONTRACT = "S00112";
export const VALUE = "$ 16.360.000 + IVA";

export const weeks = [
  { id: 1, label: "Semana 1", range: "21–25 sep", start: "2026-09-21", end: "2026-09-25" },
  { id: 2, label: "Semana 2", range: "28 sep – 2 oct", start: "2026-09-28", end: "2026-10-02" },
  { id: 3, label: "Semana 3", range: "5–9 oct", start: "2026-10-05", end: "2026-10-09" },
  { id: 4, label: "Semana 4", range: "12–16 oct", start: "2026-10-12", end: "2026-10-16" },
  { id: 5, label: "Semana 5", range: "19–23 oct", start: "2026-10-19", end: "2026-10-23" },
  { id: 6, label: "Semana 6", range: "26–30 oct", start: "2026-10-26", end: "2026-10-30" },
] as const;

export const phases: Phase[] = [
  {
    id: "i",
    numeral: "I",
    title: "Integración de fuentes y reglas de negocio",
    rangeLabel: "Lunes 21 sep — Viernes 2 oct",
    duration: "2 semanas",
    start: "2026-09-21",
    end: "2026-10-02",
    weekSpan: [1, 2],
    deliverable:
      "Capa de datos conectada (base espejo + OPLs) y reglas de negocio validadas",
    deliverableDate: "Vie 2 oct",
    deliverableKind: "standard",
    activities: [
      {
        id: "i-1",
        dateLabel: "Lun 21 sep",
        start: "2026-09-21",
        end: "2026-09-21",
        name: "Reunión de inicio: cronograma, accesos, responsables, expectativas",
        hito: "Acta de inicio firmada. Accesos SQL a base espejo solicitados.",
        costa: "Enrique + Francisco",
        xactus: "Juan + Brayan",
        kind: "work",
      },
      {
        id: "i-2",
        dateLabel: "Mar–Mié 22–23 sep",
        start: "2026-09-22",
        end: "2026-09-23",
        name: "Conexión a base espejo SQL Server. Mapeo de tablas y estructura de SIESA.",
        hito: "Xactus puede leer datos de inventario desde la base espejo.",
        costa: "Francisco + Jorge",
        xactus: "Brayan",
        kind: "work",
      },
      {
        id: "i-3",
        dateLabel: "Jue–Vie 24–25 sep",
        start: "2026-09-24",
        end: "2026-09-25",
        name: "Recepción y análisis de archivos TXT/Excel de OPLs (Emergent, Frimac, IceStar). Formato estándar de columnas.",
        hito: "Archivos de ejemplo recibidos. Formato estándar definido para los 3 operadores.",
        costa: "Francisco + Coord. logística",
        xactus: "Brayan",
        kind: "work",
      },
      {
        id: "i-4",
        dateLabel: "Lun–Mar 28–29 sep",
        start: "2026-09-28",
        end: "2026-09-29",
        name: "Validación de políticas: mínimo, punto de pedido, máximo por SKU. Pareto de los 142 SKUs prioritarios.",
        hito: "Listado de 142 SKUs con políticas validado por Francisco.",
        costa: "Francisco",
        xactus: "Brayan",
        kind: "work",
      },
      {
        id: "i-5",
        dateLabel: "Mié 30 sep",
        start: "2026-09-30",
        end: "2026-09-30",
        name: "Rendimientos esperados (HON 67–72%, Filete 95%). Umbrales de merma. Relaciones padre-hijo MP → PT.",
        hito: "Tabla de rendimientos y relaciones validada.",
        costa: "Francisco + Alejandro",
        xactus: "Brayan",
        kind: "work",
      },
      {
        id: "i-6",
        dateLabel: "Jue–Vie 1–2 oct",
        start: "2026-10-01",
        end: "2026-10-02",
        name: "Definición de semáforos (rojo / amarillo / verde / azul / gris). Criterios de déficit, sobrestock, cobertura. Productos por vencer.",
        hito: "Documento de reglas de negocio firmado por Francisco.",
        costa: "Francisco",
        xactus: "Brayan + Juan",
        kind: "work",
      },
    ],
  },
  {
    id: "ii",
    numeral: "II",
    title: "Configuración del agente de Inteligencia Artificial",
    rangeLabel: "Lunes 5 oct — Viernes 9 oct",
    duration: "1 semana",
    start: "2026-10-05",
    end: "2026-10-09",
    weekSpan: [3, 3],
    deliverable:
      "Agente de IA generando narrativa ejecutiva con datos reales de Costa Dorada",
    deliverableDate: "Vie 9 oct",
    deliverableKind: "standard",
    activities: [
      {
        id: "ii-1",
        dateLabel: "Lun–Mar 5–6 oct",
        start: "2026-10-05",
        end: "2026-10-06",
        name: "Diseño de prompts: contexto del negocio, instrucciones de interpretación, lenguaje ejecutivo para Enrique y Mónica.",
        hito: "Prompt base produciendo narrativa coherente con datos de prueba.",
        costa: "—",
        xactus: "Brayan (Dir. I+D)",
        kind: "work",
      },
      {
        id: "ii-2",
        dateLabel: "Mié 7 oct",
        start: "2026-10-07",
        end: "2026-10-07",
        name: "Configuración de dos versiones: operativa (diaria L–V 7 AM) y ejecutiva (martes 8 AM). Criterios de prioridad.",
        hito: "Dos correos de prueba generados: operativo y ejecutivo.",
        costa: "—",
        xactus: "Brayan",
        kind: "work",
      },
      {
        id: "ii-3",
        dateLabel: "Jue 8 oct",
        start: "2026-10-08",
        end: "2026-10-08",
        name: "Pruebas con escenarios reales: déficit, sobrestock, rendimiento fuera de rango, producto por vencer.",
        hito: "IA genera alertas correctas para escenarios críticos (ej. ítem 20001).",
        costa: "Francisco (valida)",
        xactus: "Brayan",
        kind: "work",
      },
      {
        id: "ii-4",
        dateLabel: "Vie 9 oct",
        start: "2026-10-09",
        end: "2026-10-09",
        name: "Integración de Key Controls #27, #28, #29, #37. Ajustes de redacción y priorización.",
        hito: "Sección de Key Controls visible en el borrador.",
        costa: "—",
        xactus: "Brayan",
        kind: "work",
      },
    ],
  },
  {
    id: "iii",
    numeral: "III",
    title: "Construcción del informe — Producto terminado",
    rangeLabel: "Lunes 12 oct — Viernes 16 oct",
    duration: "1 semana",
    start: "2026-10-12",
    end: "2026-10-16",
    weekSpan: [4, 4],
    deliverable: "Producto terminado — listo para revisión con Enrique",
    deliverableDate: "Vie 16 oct",
    deliverableKind: "gold",
    activities: [
      {
        id: "iii-1",
        dateLabel: "Lun–Mar 12–13 oct",
        start: "2026-10-12",
        end: "2026-10-13",
        name: "Diseño de estructura con productos reales (Salmón HON, Camarón 51/60, Tilapia). Secciones, formato visual.",
        hito: "Borrador del informe con datos reales generado automáticamente.",
        costa: "—",
        xactus: "Brayan",
        kind: "work",
      },
      {
        id: "iii-2",
        dateLabel: "Mié–Jue 14–15 oct",
        start: "2026-10-14",
        end: "2026-10-15",
        name: "Integración end-to-end: base espejo → ETL → IA → informe → email. Dos versiones (operativa + ejecutiva).",
        hito: "Pipeline completo corriendo sin intervención manual.",
        costa: "—",
        xactus: "Brayan",
        kind: "work",
      },
      {
        id: "iii-3",
        dateLabel: "Vie 16 oct",
        start: "2026-10-16",
        end: "2026-10-16",
        name: "Revisión interna Xactus. Preparación de la versión para presentar a Enrique.",
        hito: "Producto terminado listo para pruebas con el cliente.",
        costa: "—",
        xactus: "Brayan + Juan",
        kind: "work",
      },
    ],
  },
  {
    id: "iv",
    numeral: "IV",
    title: "Pruebas con Enrique, ajustes y despliegue",
    rangeLabel: "Lunes 19 oct — Viernes 30 oct",
    duration: "2 semanas",
    start: "2026-10-19",
    end: "2026-10-30",
    weekSpan: [5, 6],
    deliverable:
      "Aprobado — scheduler configurado para el primer envío real el martes 3 de noviembre",
    deliverableDate: "Vie 30 oct",
    deliverableKind: "standard",
    activities: [
      {
        id: "iv-1",
        dateLabel: "Lun–Mar 19–20 oct",
        start: "2026-10-19",
        end: "2026-10-20",
        name: "Pruebas end-to-end con datos del corte del viernes 16. Semáforos, alertas, narrativa, Key Controls.",
        hito: "Informe completo generado sin intervención con datos reales.",
        costa: "Francisco",
        xactus: "Brayan",
        kind: "work",
      },
      {
        id: "iv-2",
        dateLabel: "Mié 21 oct",
        start: "2026-10-21",
        end: "2026-10-21",
        name: "Checkpoint con Enrique: revisión del informe. Enrique y Mónica ven el resultado y dan feedback.",
        hito: "Feedback documentado. Lista de ajustes definida.",
        costa: "Enrique + Mónica",
        xactus: "Juan + Brayan",
        kind: "checkpoint",
      },
      {
        id: "iv-3",
        dateLabel: "Jue–Vie 22–23 oct",
        start: "2026-10-22",
        end: "2026-10-23",
        name: "Ajustes según feedback de Enrique: formato, contenido, lenguaje, prioridades.",
        hito: "Informe ajustado según retroalimentación del cliente.",
        costa: "—",
        xactus: "Brayan",
        kind: "work",
      },
      {
        id: "iv-4",
        dateLabel: "Lun–Mar 26–27 oct",
        start: "2026-10-26",
        end: "2026-10-27",
        name: "Segunda ronda de pruebas con datos del corte del viernes 23. Configuración de destinatarios finales y scheduler.",
        hito: "Email configurado con destinatarios reales. Scheduler activo.",
        costa: "Francisco",
        xactus: "Brayan",
        kind: "work",
      },
      {
        id: "iv-5",
        dateLabel: "Mié–Jue 28–29 oct",
        start: "2026-10-28",
        end: "2026-10-29",
        name: "Validación final: Enrique aprueba. Go / no-go para el primer envío real.",
        hito: "Proyecto aceptado funcionalmente. Documentación entregada.",
        costa: "Enrique",
        xactus: "Juan + Brayan",
        kind: "checkpoint",
      },
      {
        id: "iv-6",
        dateLabel: "Vie 30 oct",
        start: "2026-10-30",
        end: "2026-10-30",
        name: "Documentación técnica final. Entrega de guía de operación.",
        hito: "Documentación completa entregada a Francisco.",
        costa: "Francisco",
        xactus: "Brayan",
        kind: "work",
      },
    ],
  },
  {
    id: "s",
    numeral: "S",
    title: "Soporte correctivo incluido",
    rangeLabel: "3 nov 2026 — 3 feb 2027",
    duration: "3 meses",
    start: "2026-11-03",
    end: "2027-02-03",
    weekSpan: [0, 0],
    deliverable: "Proyecto cerrado formalmente",
    deliverableDate: "Feb 2027",
    deliverableKind: "standard",
    activities: [
      {
        id: "s-1",
        dateLabel: "Mar 3 nov",
        start: "2026-11-03",
        end: "2026-11-03",
        name: "Primer email real. Monitoreo activo de Xactus.",
        hito: "Enrique confirma recepción y calidad.",
        costa: "Enrique",
        xactus: "Brayan",
        kind: "work",
      },
      {
        id: "s-2",
        dateLabel: "Nov–Dic",
        start: "2026-11-03",
        end: "2026-12-31",
        name: "Ajustes menores: corrección de alertas, refinamiento de narrativa, nuevos SKUs si aplica.",
        hito: "Informe estabilizado sin intervenciones frecuentes.",
        costa: "Francisco",
        xactus: "Brayan",
        kind: "work",
      },
      {
        id: "s-3",
        dateLabel: "Feb 2027",
        start: "2027-02-03",
        end: "2027-02-03",
        name: "Cierre de soporte. Evaluación de resultados. Documentación final actualizada.",
        hito: "Proyecto cerrado formalmente.",
        costa: "Enrique",
        xactus: "Juan",
        kind: "work",
      },
    ],
  },
];

export const dependencies = [
  {
    n: "01",
    name: "Acceso a base espejo SQL Server",
    owner: "Francisco",
    deadline: "Mié 23 sep",
    deadlineIso: "2026-09-23",
    impact:
      "Fase I se extiende 1 semana. El primer email se mueve al martes 10 de noviembre.",
  },
  {
    n: "02",
    name: "Archivos de ejemplo de OPLs (Emergent, Frimac, IceStar)",
    owner: "Francisco + Coord. logística",
    deadline: "Vie 25 sep",
    deadlineIso: "2026-09-25",
    impact:
      "Se arranca sin OPLs. El primer email cubre solo Bodega Planta. OPLs se integran en la semana 5.",
  },
  {
    n: "03",
    name: "Rendimientos y relaciones padre-hijo validadas",
    owner: "Francisco + Alejandro",
    deadline: "Mié 30 sep",
    deadlineIso: "2026-09-30",
    impact:
      "Se arranca con rendimientos conocidos (HON 67–72%, Filete 95%). Se completa en la semana 5.",
  },
  {
    n: "04",
    name: "Reglas de negocio firmadas (semáforos, déficits, cobertura)",
    owner: "Francisco",
    deadline: "Vie 2 oct",
    deadlineIso: "2026-10-02",
    impact: "Sin reglas validadas no se puede configurar la IA. La Fase II no puede arrancar.",
  },
  {
    n: "05",
    name: "Disponibilidad de Enrique para el checkpoint",
    owner: "Enrique",
    deadline: "Mié 21 oct",
    deadlineIso: "2026-10-21",
    impact:
      "Se reprograma máximo 2 días. Si no hay feedback, se usa el formato propuesto por Xactus.",
  },
  {
    n: "06",
    name: "Aprobación final go / no-go",
    owner: "Enrique",
    deadline: "Jue 29 oct",
    deadlineIso: "2026-10-29",
    impact:
      "Ajustes adicionales en la semana 6. El primer email se mueve al martes 10 de noviembre.",
  },
];

export const stats = [
  { value: "6", label: "Semanas totales" },
  { value: "4", label: "Semanas de construcción" },
  { value: "2", label: "Semanas de pruebas con Enrique" },
  { value: "3", label: "Meses de soporte correctivo" },
];

export function daysUntil(iso: string, from = TODAY) {
  const a = Date.parse(`${from}T00:00:00`);
  const b = Date.parse(`${iso}T00:00:00`);
  return Math.round((b - a) / 86_400_000);
}

export function activityParty(a: Activity): Party {
  const costa = a.costa !== "—";
  const xactus = a.xactus !== "—";
  if (costa && xactus) return "both";
  if (costa) return "costa";
  if (xactus) return "xactus";
  return "none";
}
