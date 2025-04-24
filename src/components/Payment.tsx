import { useState } from "react";

interface PaymentProps {
  amount: number;
  serviceName: string;
  onSuccess: () => void;
  onCancel: () => void;
}

const Payment = ({
  amount,
  serviceName,
  onSuccess,
  onCancel,
}: PaymentProps) => {
  const [paymentMethod, setPaymentMethod] = useState<
    "card" | "paypal" | "applepay"
  >("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (paymentMethod === "card") {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        setError("Please fill in all card details");
        return;
      }

      if (cardNumber.replace(/\s/g, "").length !== 16) {
        setError("Card number must be 16 digits");
        return;
      }

      if (cvv.length !== 3) {
        setError("CVV must be 3 digits");
        return;
      }
    }

    // Process payment
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  return (
    <div className="border border-black/10 p-8 shadow-luxury animate-[fadeIn_0.5s_ease-in-out]">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-display uppercase tracking-luxury">
          Payment Details
        </h2>
        <div className="h-px w-32 bg-gold"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-black/60 mb-4">
            Order Summary
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between pb-2 border-b border-black/10">
              <span className="text-black/70">Booking ID</span>
              <span className="font-medium">
                BK{Math.floor(Math.random() * 10000)}
              </span>
            </div>
            <div className="flex justify-between pb-2 border-b border-black/10">
              <span className="text-black/70">Service</span>
              <span className="font-medium">{serviceName}</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-black/10">
              <span className="text-black/70">Subtotal</span>
              <span>{amount.toFixed(2)} TND</span>
            </div>
            <div className="flex justify-between pb-2 border-b border-black/10">
              <span className="text-black/70">Tax (19%)</span>
              <span>{(amount * 0.19).toFixed(2)} TND</span>
            </div>
            <div className="flex justify-between pt-2 font-medium">
              <span className="uppercase tracking-wider text-sm">Total</span>
              <span className="font-display text-xl">
                {(amount * 1.19).toFixed(2)} TND
              </span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm uppercase tracking-wider text-black/60 mb-4">
            Payment Method
          </h3>
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              className={`flex flex-col items-center justify-center p-4 border transition-all duration-300 ${
                paymentMethod === "card"
                  ? "border-gold bg-gold/5"
                  : "border-black/10 hover:border-gold/50"
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mb-2 text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                />
              </svg>
              <span className="text-xs uppercase tracking-wider">
                Credit Card
              </span>
            </button>
            <button
              type="button"
              className={`flex flex-col items-center justify-center p-4 border transition-all duration-300 ${
                paymentMethod === "paypal"
                  ? "border-gold bg-gold/5"
                  : "border-black/10 hover:border-gold/50"
              }`}
              onClick={() => setPaymentMethod("paypal")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mb-2 text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.384a.64.64 0 0 1 .632-.537h6.012c2.658 0 4.53.625 5.552 1.85.96 1.155 1.162 2.563.599 4.192-.566 1.628-1.628 2.883-3.156 3.723-1.532.842-3.316 1.267-5.304 1.267h-2.33l-1.33 7.458a.641.641 0 0 1-.633.537zM12.292 7.9c-.416 0-.738.118-.957.353-.223.237-.376.58-.46 1.022l-.307 1.716a.654.654 0 0 0 .647.758h.604c1.225 0 2.169-.244 2.825-.733.651-.486.976-1.177.976-2.068 0-.656-.176-1.14-.53-1.45-.356-.313-.96-.47-1.798-.47h-1z" />
              </svg>
              <span className="text-xs uppercase tracking-wider">PayPal</span>
            </button>
            <button
              type="button"
              className={`flex flex-col items-center justify-center p-4 border transition-all duration-300 ${
                paymentMethod === "applepay"
                  ? "border-gold bg-gold/5"
                  : "border-black/10 hover:border-gold/50"
              }`}
              onClick={() => setPaymentMethod("applepay")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mb-2 text-black"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M17.72 17.208a.432.432 0 0 1-.366.212.414.414 0 0 1-.192-.048 13.932 13.932 0 0 0-1.584-.662 11.343 11.343 0 0 0-1.656-.51 8.58 8.58 0 0 0-1.752-.216c-.576 0-1.104.078-1.578.228-.474.15-.894.36-1.26.63a3.086 3.086 0 0 0-.888.99c-.222.39-.336.828-.336 1.314 0 .462.114.87.336 1.224.222.354.516.654.882.9.366.246.786.432 1.26.558.474.126.966.192 1.476.192.576 0 1.122-.072 1.638-.21.516-.138 1.002-.312 1.458-.522.456-.21.876-.438 1.26-.684.384-.246.726-.474 1.026-.684a.388.388 0 0 1 .204-.06c.144 0 .264.072.366.21.102.138.102.276 0 .414l-.294.444zm-7.296-5.01c.192-.462.456-.864.792-1.2.336-.336.726-.606 1.17-.81.444-.204.93-.306 1.458-.306.528 0 1.014.102 1.458.306.444.204.834.474 1.17.81.336.336.6.738.792 1.2.192.462.288.96.288 1.494s-.096 1.032-.288 1.494c-.192.462-.456.864-.792 1.2-.336.336-.726.606-1.17.81-.444.204-.93.306-1.458.306-.528 0-1.014-.102-1.458-.306-.444-.204-.834-.474-1.17-.81-.336-.336-.6-.738-.792-1.2-.192-.462-.288-.96-.288-1.494s.096-1.032.288-1.494zm-2.172-3.9c.192-.138.384-.138.576 0 .192.138.288.33.288.576v12.252c0 .246-.096.438-.288.576-.192.138-.384.138-.576 0-.192-.138-.288-.33-.288-.576V8.874c0-.246.096-.438.288-.576zm-2.172-1.728c.192-.138.384-.138.576 0 .192.138.288.33.288.576v15.708c0 .246-.096.438-.288.576-.192.138-.384.138-.576 0-.192-.138-.288-.33-.288-.576V7.146c0-.246.096-.438.288-.576zm13.032-1.728c.192-.138.384-.138.576 0 .192.138.288.33.288.576v19.164c0 .246-.096.438-.288.576-.192.138-.384.138-.576 0-.192-.138-.288-.33-.288-.576V5.418c0-.246.096-.438.288-.576zm-4.344-1.728c.192-.138.384-.138.576 0 .192.138.288.33.288.576v22.62c0 .246-.096.438-.288.576-.192.138-.384.138-.576 0-.192-.138-.288-.33-.288-.576V3.69c0-.246.096-.438.288-.576z" />
              </svg>
              <span className="text-xs uppercase tracking-wider">
                Apple Pay
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t border-black/10">
        {paymentMethod === "card" && (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-navy mb-1"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  className="input-field"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) =>
                    setCardNumber(formatCardNumber(e.target.value))
                  }
                  maxLength={19}
                />
              </div>

              <div>
                <label
                  htmlFor="cardName"
                  className="block text-sm font-medium text-navy mb-1"
                >
                  Cardholder Name
                </label>
                <input
                  type="text"
                  id="cardName"
                  className="input-field"
                  placeholder="John Doe"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium text-navy mb-1"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    className="input-field"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    maxLength={5}
                  />
                </div>
                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-navy mb-1"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    className="input-field"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                    maxLength={3}
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={onCancel}
                className="btn-secondary order-2 sm:order-1"
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn-primary flex items-center justify-center order-1 sm:order-2 flex-1"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Pay ${(amount * 1.19).toFixed(2)} TND`
                )}
              </button>
            </div>
          </form>
        )}

        {paymentMethod === "paypal" && (
          <div className="mt-6">
            <div className="bg-blue-50 p-4 rounded-lg text-center mb-4">
              <p className="text-navy mb-2">
                You'll be redirected to PayPal to complete your payment.
              </p>
              <p className="text-sm text-navy/70">
                Please make sure pop-ups are enabled in your browser.
              </p>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 3.384a.64.64 0 0 1 .632-.537h6.012c2.658 0 4.53.625 5.552 1.85.96 1.155 1.162 2.563.599 4.192-.566 1.628-1.628 2.883-3.156 3.723-1.532.842-3.316 1.267-5.304 1.267h-2.33l-1.33 7.458a.641.641 0 0 1-.633.537zM12.292 7.9c-.416 0-.738.118-.957.353-.223.237-.376.58-.46 1.022l-.307 1.716a.654.654 0 0 0 .647.758h.604c1.225 0 2.169-.244 2.825-.733.651-.486.976-1.177.976-2.068 0-.656-.176-1.14-.53-1.45-.356-.313-.96-.47-1.798-.47h-1z" />
                  </svg>
                  Continue with PayPal
                </>
              )}
            </button>
          </div>
        )}

        {paymentMethod === "applepay" && (
          <div className="mt-6">
            <div className="bg-gray-50 p-4 rounded-lg text-center mb-4">
              <p className="text-navy mb-2">
                You'll complete your payment using Apple Pay.
              </p>
              <p className="text-sm text-navy/70">
                This option is only available on Apple devices with Apple Pay
                set up.
              </p>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-black hover:bg-black/90 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M17.72 17.208a.432.432 0 0 1-.366.212.414.414 0 0 1-.192-.048 13.932 13.932 0 0 0-1.584-.662 11.343 11.343 0 0 0-1.656-.51 8.58 8.58 0 0 0-1.752-.216c-.576 0-1.104.078-1.578.228-.474.15-.894.36-1.26.63a3.086 3.086 0 0 0-.888.99c-.222.39-.336.828-.336 1.314 0 .462.114.87.336 1.224.222.354.516.654.882.9.366.246.786.432 1.26.558.474.126.966.192 1.476.192.576 0 1.122-.072 1.638-.21.516-.138 1.002-.312 1.458-.522.456-.21.876-.438 1.26-.684.384-.246.726-.474 1.026-.684a.388.388 0 0 1 .204-.06c.144 0 .264.072.366.21.102.138.102.276 0 .414l-.294.444zm-7.296-5.01c.192-.462.456-.864.792-1.2.336-.336.726-.606 1.17-.81.444-.204.93-.306 1.458-.306.528 0 1.014.102 1.458.306.444.204.834.474 1.17.81.336.336.6.738.792 1.2.192.462.288.96.288 1.494s-.096 1.032-.288 1.494c-.192.462-.456.864-.792 1.2-.336.336-.726.606-1.17.81-.444.204-.93.306-1.458.306-.528 0-1.014-.102-1.458-.306-.444-.204-.834-.474-1.17-.81-.336-.336-.6-.738-.792-1.2-.192-.462-.288-.96-.288-1.494s.096-1.032.288-1.494zm-2.172-3.9c.192-.138.384-.138.576 0 .192.138.288.33.288.576v12.252c0 .246-.096.438-.288.576-.192.138-.384.138-.576 0-.192-.138-.288-.33-.288-.576V8.874c0-.246.096-.438.288-.576zm-2.172-1.728c.192-.138.384-.138.576 0 .192.138.288.33.288.576v15.708c0 .246-.096.438-.288.576-.192.138-.384.138-.576 0-.192-.138-.288-.33-.288-.576V7.146c0-.246.096-.438.288-.576zm13.032-1.728c.192-.138.384-.138.576 0 .192.138.288.33.288.576v19.164c0 .246-.096.438-.288.576-.192.138-.384.138-.576 0-.192-.138-.288-.33-.288-.576V5.418c0-.246.096-.438.288-.576zm-4.344-1.728c.192-.138.384-.138.576 0 .192.138.288.33.288.576v22.62c0 .246-.096.438-.288.576-.192.138-.384.138-.576 0-.192-.138-.288-.33-.288-.576V3.69c0-.246.096-.438.288-.576z" />
                  </svg>
                  Pay with Apple Pay
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
