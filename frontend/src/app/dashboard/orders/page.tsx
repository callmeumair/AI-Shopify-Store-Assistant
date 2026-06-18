import React from 'react';

export default function OrdersPage() {
  return (
    <div className="p-8 h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Orders</h1>
      <div className="bg-bg-secondary border border-border rounded-xl shadow-lg p-8 flex flex-col items-center justify-center h-96">
        <h3 className="text-xl font-medium text-text-primary mb-2">Orders Management</h3>
        <p className="text-text-secondary mb-6 text-center max-w-md">
          This UI is under construction. For now, please use the AI Assistant to manage orders and fulfillments.
        </p>
        <a href="/dashboard/chat" className="px-6 py-2.5 rounded-lg bg-accent-blue text-white font-medium hover:bg-blue-600 transition-colors">
          Go to AI Assistant
        </a>
      </div>
    </div>
  );
}
