import { createFileRoute } from "@tanstack/react-router";
import { CronogramaDocument } from "@/components/cronograma/document";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <CronogramaDocument />;
}
