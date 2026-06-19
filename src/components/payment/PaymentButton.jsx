import { useState } from "react";
import { CreditCard } from "lucide-react";
import { paymentService } from "../../service/paymentService";
import { useAuth } from "../../hooks/useAuth";

export default function PaymentButton({
  amount,
  onSuccess,
  onError,
  className = "",
}) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    if (!user) {
      alert("Please login first");
      return;
    }

    setLoading(true);
    try {
      await paymentService.initializePayment({
        amount: amount,
        email: user.email,
        name: user.user_metadata?.full_name || user.email,
        phone: user.user_metadata?.phone || "",
        tx_ref: `TX_${user.id}_${Date.now()}`,
        callback: async (response) => {
          if (response.status === "successful") {
            // Save to database
            await paymentService.savePaymentRecord({
              userId: user.id,
              amount: amount,
              currency: "USD",
              status: "completed",
              txRef: response.transaction_id,
            });
            onSuccess?.(response);
          } else {
            onError?.(new Error("Payment failed"));
          }
          setLoading(false);
        },
      });
    } catch (error) {
      onError?.(error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`
        flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg
        hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed
        transition-colors font-medium ${className}
      `}
    >
      <CreditCard size={18} />
      {loading ? "Processing..." : `Pay $${amount}`}
    </button>
  );
}
