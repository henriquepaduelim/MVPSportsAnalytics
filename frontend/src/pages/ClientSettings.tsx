import { Link, useParams } from "react-router-dom";

import { useClients } from "../hooks/useClients";
import { useTranslation } from "../i18n/useTranslation";

const ClientSettings = () => {
  const params = useParams<{ id: string }>();
  const clientId = Number(params.id);
  const { data: clients, isLoading } = useClients();
  const t = useTranslation();

  if (isLoading) {
    return <p className="text-sm text-muted">{t.common.loading}...</p>;
  }

  const client = clients?.find((item) => item.id === clientId);

  if (!client) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-red-500">Client not found.</p>
        <Link to="/dashboard" className="text-sm font-semibold text-primary hover:underline">
          {t.common.back}
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-semibold text-on-surface">{client.name} — Settings</h1>
        <p className="text-sm text-muted">
          Manage branding, integration tokens and notification preferences for this client.
        </p>
      </header>

      <section className="space-y-4 rounded-xl bg-surface p-6 shadow-sm">
        <div>
          <p className="text-sm font-semibold text-on-surface">Brand colours</p>
          <p className="text-xs text-muted">Future configuration area for theme overrides.</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-on-surface">Integrations</p>
          <p className="text-xs text-muted">Connect SSO, S3 buckets or analytics destinations.</p>
        </div>
      </section>

      <Link
        to={`/clients/${client.id}`}
        className="inline-flex items-center rounded-md border border-black/10 px-3 py-2 text-xs font-semibold text-muted transition hover:border-primary hover:text-primary"
      >
        {t.common.back}
      </Link>
    </div>
  );
};

export default ClientSettings;
