"use client";
import { useEffect, useState } from "react";

interface InvoicesTableProps {
  refreshKey?: number;
}

export function InvoicesTable({ refreshKey }: InvoicesTableProps) {
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchInvoices = () => {
    setLoading(true);
    fetch("/api/stripe/invoices")
      .then((res) => res.json())
      .then((data) => {
        if (data.invoices) setInvoices(data.invoices);
        else setError("Aucune facture trouvée");
      })
      .catch(() => setError("Erreur lors du chargement des factures"))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchInvoices();

  }, [refreshKey]);

  const handleDelete = async (invoiceId: string) => {
    if (!window.confirm("Supprimer cette facture ?")) return;
    const res = await fetch("/api/stripe/invoice", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ invoiceId }),
    });
    if (res.ok) fetchInvoices();
    else alert("Erreur lors de la suppression");
  };

  if (loading) return <div>Chargement des factures...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Mes factures récentes</h2>
      <table className="w-full border text-left text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="p-2">Numéro</th>
            <th className="p-2">Montant</th>
            <th className="p-2">Statut</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className="border-b">
              <td className="p-2">{inv.number || inv.id}</td>
              <td className="p-2">{(inv.amount_due / 100).toFixed(2)} {inv.currency?.toUpperCase()}</td>
              <td className="p-2">{inv.status}</td>
              <td className="p-2">{inv.created ? new Date(inv.created * 1000).toLocaleString() : ""}</td>
              <td className="p-2 flex gap-2">
                {inv.invoice_pdf ? (
                  <a
                    href={inv.invoice_pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-white px-3 py-1 rounded cursor-pointer hover:bg-primary/90 transition"
                  >
                    Télécharger PDF
                  </a>
                ) : (
                  <button
                    className="bg-gray-300 text-gray-500 px-3 py-1 rounded cursor-not-allowed"
                    disabled
                  >
                    PDF non disponible
                  </button>
                )}
                <button
                  onClick={() => {
                    if (!inv.status || inv.status === 'void' || inv.status === 'paid') return;
                    handleDelete(inv.id);
                  }}
                  className={`bg-destructive text-white px-3 py-1 rounded cursor-pointer hover:bg-destructive/90 transition ${(!inv.status || inv.status === 'void' || inv.status === 'paid') ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={!inv.status || inv.status === 'void' || inv.status === 'paid'}
                  title={!inv.status || inv.status === 'void' || inv.status === 'paid' ? "Cette facture ne peut pas être supprimée." : undefined}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
);
}
