import type { ReactNode } from "react";
import { DashboardLayout } from "@/components/quan-ly/DashboardLayout";

export default function QuanLyLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}

