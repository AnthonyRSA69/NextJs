import { useState, useCallback } from "react";

interface SubscriptionError {
  message: string;
  code?: string;
}

export function useSubscription() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<SubscriptionError | null>(null);
  const [success, setSuccess] = useState(false);

  const getSubscriptions = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/stripe/subscriptions", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw {
          message: errorData.error || "Erreur lors de la récupération des abonnements",
          code: "GET_SUBSCRIPTIONS_ERROR",
        };
      }

      const data = await response.json();
      return data.subscriptions || [];
    } catch (err: any) {
      const subError = {
        message: err.message || "Erreur lors de la récupération des abonnements",
        code: err.code || "UNKNOWN_ERROR",
      };
      setError(subError);
      throw subError;
    } finally {
      setLoading(false);
    }
  }, []);

  const cancelSubscription = useCallback(
    async (subscriptionId: string) => {
      setLoading(true);
      setError(null);
      setSuccess(false);

      try {
        const response = await fetch("/api/stripe/subscriptions", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subscriptionId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw {
            message: errorData.error || "Erreur lors de l'annulation de l'abonnement",
            code: "CANCEL_SUBSCRIPTION_ERROR",
          };
        }

        const data = await response.json();
        setSuccess(true);
        return data;
      } catch (err: any) {
        const subError = {
          message: err.message || "Erreur lors de l'annulation de l'abonnement",
          code: err.code || "UNKNOWN_ERROR",
        };
        setError(subError);
        throw subError;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const clearSuccess = useCallback(() => {
    setSuccess(false);
  }, []);

  return {
    getSubscriptions,
    cancelSubscription,
    loading,
    error,
    success,
    clearError,
    clearSuccess,
  };
}
