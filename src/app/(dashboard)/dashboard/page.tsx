"use client";
import { Suspense } from "react";
import DashboardContent from "@/components/layout/Dashboard";
export default function Dashboard() {
  return (
    <Suspense
      fallback={<div className="p-10 text-center">Cargando aplicación...</div>}
    >
      <DashboardContent />
    </Suspense>
  );
}
