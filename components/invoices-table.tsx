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

  if (loading) return <div className="text-purple-200">Chargement des factures...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-white">Mes factures récentes</h2>
      <div className="rounded-lg border border-purple-400/30 bg-gradient-to-br from-purple-900/40 to-slate-900/40 backdrop-blur-sm overflow-hidden shadow-lg shadow-purple-900/20">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-purple-800/40 border-b border-purple-400/30">
            <th className="p-3 text-white font-semibold">Numéro</th>
            <th className="p-3 text-white font-semibold">Montant</th>
            <th className="p-3 text-white font-semibold">Statut</th>
            <th className="p-3 text-white font-semibold">Date</th>
            <th className="p-3 text-white font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((inv) => (
            <tr key={inv.id} className="border-b border-purple-500/20 hover:bg-purple-700/30 transition-colors duration-200">
              <td className="p-3 text-purple-100 font-medium">{inv.number || inv.id}</td>
              <td className="p-3 text-purple-100 font-medium">{(inv.amount_due / 100).toFixed(2)} {inv.currency?.toUpperCase()}</td>
              <td className="p-3 text-purple-100">{inv.status}</td>
              <td className="p-3 text-purple-200/80">{inv.created ? new Date(inv.created * 1000).toLocaleString() : ""}</td>
              <td className="p-3 flex gap-2">
                {inv.invoice_pdf ? (
                  <a
                    href={inv.invoice_pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-600 text-white px-4 py-1.5 rounded-md cursor-pointer hover:bg-purple-500 hover:shadow-md hover:shadow-purple-500/30 transition-all duration-200"
                  >
                    Télécharger PDF
                  </a>
                ) : (
                  <button
                    className="bg-slate-600/50 text-slate-400 px-4 py-1.5 rounded-md cursor-not-allowed"
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
                  className={`bg-red-600 text-white px-4 py-1.5 rounded-md cursor-pointer hover:bg-red-500 hover:shadow-md hover:shadow-red-500/30 transition-all duration-200 ${(!inv.status || inv.status === 'void' || inv.status === 'paid') ? 'opacity-50 cursor-not-allowed' : ''}`}
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
    </div>
);
}
