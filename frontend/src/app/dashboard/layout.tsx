import React from 'react';
import { Sidebar } from '../../components/dashboard/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-bg-primary">
      <Sidebar />
      <main className="flex-1 ml-64 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
