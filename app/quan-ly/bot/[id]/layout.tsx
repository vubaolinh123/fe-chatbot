import type { ReactNode } from "react";

export default async function BotSettingsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="bg-slate-50">
      <div className="w-full px-6 py-8">
        {children}
      </div>
    </main>
  );
}

