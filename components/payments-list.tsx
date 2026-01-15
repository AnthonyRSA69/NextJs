"use client";
import { useEffect, useState } from "react";

interface PaymentsListProps {
  onInvoiceGenerated?: () => void;
}

const statusTranslations: { [key: string]: string } = {
  succeeded: "Réussi",
  processing: "En cours de traitement",
  requires_payment_method: "Méthode de paiement requise",
  requires_confirmation: "Confirmation requise",
  requires_action: "Action requise",
  canceled: "Annulé",
};

const getStatusLabel = (status: string) => {
  return statusTranslations[status] || status;
};

export function PaymentsList({ onInvoiceGenerated }: PaymentsListProps) {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [invoiceLoading, setInvoiceLoading] = useState<string | null>(null);
  const [success, setSuccess] = useState("");
  const fetchPayments = () => {
    setLoading(true);
    fetch("/api/stripe/payments")
      .then((res) => res.json())
      .then((data) => {
        if (data.payments) setPayments(data.payments);
        else setError("Aucun paiement trouvé");
      })
      .catch(() => setError("Erreur lors du chargement des paiements"))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchPayments();
  }, []);

  const generateInvoice = async (paymentId: string) => {
    setInvoiceLoading(paymentId);
    setSuccess("");
    setError("");
    try {
      const res = await fetch("/api/stripe/invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentId }),
      });
      const data = await res.json();
      if (data.invoice && data.invoice.id) {
        setSuccess("Facture générée : " + data.invoice.id);
        fetchPayments();
        if (onInvoiceGenerated) onInvoiceGenerated();
      } else {
        setError(data.error || "Erreur lors de la génération de la facture");
      }
    } catch (err: any) {
      setError(err.message || "Erreur réseau");
    } finally {
      setInvoiceLoading(null);
    }
  };

  if (loading) return <div className="text-purple-200">Chargement des paiements...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-white">Mes paiements récents</h2>
      <div className="rounded-lg border border-purple-400/30 bg-gradient-to-br from-purple-900/40 to-slate-900/40 backdrop-blur-sm overflow-hidden shadow-lg shadow-purple-900/20">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="bg-purple-800/40 border-b border-purple-400/30">
            <th className="p-3 text-white font-semibold">Montant</th>
            <th className="p-3 text-white font-semibold">Statut</th>
            <th className="p-3 text-white font-semibold">Date</th>
            <th className="p-3 text-white font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-b border-purple-500/20 hover:bg-purple-700/30 transition-colors duration-200">
              <td className="p-3 text-purple-100 font-medium">{(p.amount / 100).toFixed(2)} {p.currency.toUpperCase()}</td>
              <td className="p-3 text-purple-100">{getStatusLabel(p.status)}</td>
              <td className="p-3 text-purple-200/80">{new Date(p.created * 1000).toLocaleString()}</td>
              <td className="p-3">
                {p.invoice ? (
                  <span className="text-emerald-400 font-medium">Facture générée</span>
                ) : (
                  <button
                    onClick={() => {
                      if (!p.customer) {
                        setError("Ce paiement n'est pas lié à un client Stripe. Impossible de générer une facture.");
                        return;
                      }
                      generateInvoice(p.id);
                    }}
                    className={`bg-purple-600 text-white px-4 py-1.5 rounded-md cursor-pointer hover:bg-purple-500 hover:shadow-md hover:shadow-purple-500/30 transition-all duration-200 ${!p.customer ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!!invoiceLoading || !p.customer}
                    title={!p.customer ? "Aucun client lié à ce paiement. Impossible de générer une facture." : undefined}
                  >
                    {invoiceLoading === p.id ? "Génération..." : "Générer facture"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {success && <div className="text-emerald-400 mt-3 font-medium">{success}</div>}
      {error && <div className="text-red-400 mt-3">{error}</div>}
    </div>
  );
}
