import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="p-8 text-center flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Paiement réussi</h1>
      <p className="text-green-600 text-lg">Une facture a été générée automatiquement pour ce paiement.</p>
      <Link href="/dashboard">
        <button className="mt-4 px-6 py-2 bg-primary text-white rounded shadow cursor-pointer hover:bg-primary/90 transition">
          Retour au dashboard
        </button>
      </Link>
    </div>
  );
}