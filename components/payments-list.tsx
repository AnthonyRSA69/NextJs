"use client";
import { useEffect, useState } from "react";

interface PaymentsListProps {
  onInvoiceGenerated?: () => void;
}

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

  if (loading) return <div>Chargement des paiements...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4">Mes paiements récents</h2>
      <table className="w-full border text-left text-sm">
        <thead>
          <tr className="bg-muted">
            <th className="p-2">Montant</th>
            <th className="p-2">Statut</th>
            <th className="p-2">Date</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">{(p.amount / 100).toFixed(2)} {p.currency.toUpperCase()}</td>
              <td className="p-2">{p.status}</td>
              <td className="p-2">{new Date(p.created * 1000).toLocaleString()}</td>
              <td className="p-2">
                {p.invoice ? (
                  <span className="text-green-600">Facture générée</span>
                ) : (
                  <button
                    onClick={() => {
                      if (!p.customer) {
                        setError("Ce paiement n'est pas lié à un client Stripe. Impossible de générer une facture.");
                        return;
                      }
                      generateInvoice(p.id);
                    }}
                    className={`bg-primary text-white px-3 py-1 rounded cursor-pointer hover:bg-primary/90 transition ${!p.customer ? 'opacity-50 cursor-not-allowed' : ''}`}
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
      {success && <div className="text-green-600 mt-2">{success}</div>}
      {error && <div className="text-red-600 mt-2">{error}</div>}
    </div>
  );
}
