import React from 'react';

export default function AutomationsPage() {
  return (
    <div className="p-8 h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Automations</h1>
      <div className="bg-bg-secondary border border-border rounded-xl shadow-lg p-8 flex flex-col items-center justify-center h-96">
        <h3 className="text-xl font-medium text-text-primary mb-2">n8n Workflows</h3>
        <p className="text-text-secondary mb-6 text-center max-w-md">
          Connect your store to powerful automations via n8n. Configure webhooks and automated responses here.
        </p>
        <div className="px-6 py-2.5 rounded-lg border border-border text-text-muted font-medium bg-bg-elevated cursor-not-allowed">
          Coming Soon
        </div>
      </div>
    </div>
  );
}
