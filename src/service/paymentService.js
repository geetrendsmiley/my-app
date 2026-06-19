// Flutterwave Payment Service
const FLUTTERWAVE_PUBLIC_KEY = import.meta.env.VITE_FLUTTERWAVE_PUBLIC_KEY

export const paymentService = {
  // Initialize payment
  async initializePayment({ amount, email, name, phone, tx_ref, callback }) {
    // Using Flutterwave inline JS
    window.FlutterwaveCheckout({
      public_key: FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: tx_ref || `TX_${Date.now()}`,
      amount: amount,
      currency: 'USD', // Change to your currency
      payment_options: 'card, mobilemoney, ussd',
      customer: {
        email: email,
        phone_number: phone,
        name: name,
      },
      customizations: {
        title: 'MyApp Payment',
        description: 'Payment for services',
        logo: 'https://your-logo-url.com/logo.png',
      },
      callback: function (data) {
        callback?.(data)
      },
      onclose: function() {
        console.log('Payment modal closed')
      },
    })
  },

  // Verify payment (call your backend/Supabase function)
  async verifyPayment(transactionId) {
    // You'll need a backend endpoint or Supabase Edge Function for this
    const response = await fetch(`/api/payments/verify/${transactionId}`)
    return response.json()
  },

  // Save payment to Supabase
  async savePaymentRecord(paymentData) {
    const { db } = await import('./supabaseClient')
    return db.insert('payments', {
      user_id: paymentData.userId,
      amount: paymentData.amount,
      currency: paymentData.currency,
      status: paymentData.status,
      transaction_ref: paymentData.txRef,
      created_at: new Date().toISOString()
    })
  }
}