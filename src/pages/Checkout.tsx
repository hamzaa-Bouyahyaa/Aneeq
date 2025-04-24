import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate, Link } from "react-router-dom";
import Payment from "../components/Payment";
import PaymentSuccess from "../components/PaymentSuccess";

const Checkout = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStep, setPaymentStep] = useState<
    "details" | "payment" | "success"
  >("details");
  const [bookingDetails, setBookingDetails] = useState({
    serviceName: "",
    price: 0,
    date: "",
    time: "",
    salonName: "",
    salonId: "",
  });
  const [bookingId, setBookingId] = useState("");

  // In a real app, you would fetch the booking details from the server
  useEffect(() => {
    // For demo purposes, we'll use the state passed from the previous page
    // or mock data if none is available
    if (location.state?.bookingDetails) {
      setBookingDetails(location.state.bookingDetails);
    } else {
      // Mock data
      setBookingDetails({
        serviceName: "Women's Haircut",
        price: 50,
        date: "2023-12-15",
        time: "10:00",
        salonName: "Glamour Beauty Salon",
        salonId: "1",
      });
    }
  }, [location.state]);

  const handleContinueToPayment = () => {
    setPaymentStep("payment");
  };

  const handlePaymentSuccess = () => {
    // Generate a random booking ID
    const generatedBookingId = `BK${Math.floor(Math.random() * 10000)}`;
    setBookingId(generatedBookingId);
    setPaymentStep("success");
  };

  const handlePaymentCancel = () => {
    setPaymentStep("details");
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="bg-white min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Back to Salon Link */}
          <div className="mb-8">
            <Link
              to={`/salon/${bookingDetails.salonId}`}
              className="inline-flex items-center text-black/70 hover:text-black transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to {bookingDetails.salonName}
            </Link>
          </div>

          {/* Page Title */}
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-display uppercase tracking-luxury mb-4">
              Checkout
            </h1>
            <div className="w-16 h-px bg-gold mx-auto"></div>
          </div>
          {/* Checkout Steps */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                    paymentStep === "details" ||
                    paymentStep === "payment" ||
                    paymentStep === "success"
                      ? "bg-black text-white"
                      : "bg-white text-black border border-black/20"
                  }`}
                >
                  1
                </div>
                <div
                  className={`text-xs uppercase tracking-wider transition-colors duration-300 ${
                    paymentStep === "details" ? "text-black" : "text-black/50"
                  }`}
                >
                  Details
                </div>
              </div>

              <div
                className={`h-px flex-1 mx-2 transition-colors duration-300 ${
                  paymentStep === "payment" || paymentStep === "success"
                    ? "bg-black"
                    : "bg-black/20"
                }`}
              ></div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                    paymentStep === "payment" || paymentStep === "success"
                      ? "bg-black text-white"
                      : "bg-white text-black border border-black/20"
                  }`}
                >
                  2
                </div>
                <div
                  className={`text-xs uppercase tracking-wider transition-colors duration-300 ${
                    paymentStep === "payment" ? "text-black" : "text-black/50"
                  }`}
                >
                  Payment
                </div>
              </div>

              <div
                className={`h-px flex-1 mx-2 transition-colors duration-300 ${
                  paymentStep === "success" ? "bg-black" : "bg-black/20"
                }`}
              ></div>

              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                    paymentStep === "success"
                      ? "bg-black text-white"
                      : "bg-white text-black border border-black/20"
                  }`}
                >
                  3
                </div>
                <div
                  className={`text-xs uppercase tracking-wider transition-colors duration-300 ${
                    paymentStep === "success" ? "text-black" : "text-black/50"
                  }`}
                >
                  Confirmation
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details Step */}
          {paymentStep === "details" && (
            <div className="border border-black/10 p-8 shadow-luxury animate-[fadeIn_0.5s_ease-in-out]">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display uppercase tracking-luxury">
                  Booking Details
                </h2>
                <div className="h-px w-32 bg-gold"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-sm uppercase tracking-wider text-black/60 mb-4">
                    Service Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between pb-2 border-b border-black/10">
                      <span className="text-black/70">Service</span>
                      <span className="font-medium">
                        {bookingDetails.serviceName}
                      </span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-black/10">
                      <span className="text-black/70">Date</span>
                      <span>{formatDate(bookingDetails.date)}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-black/10">
                      <span className="text-black/70">Time</span>
                      <span>{bookingDetails.time}</span>
                    </div>
                    <div className="flex justify-between pb-2 border-b border-black/10">
                      <span className="text-black/70">Salon</span>
                      <span>{bookingDetails.salonName}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-wider text-black/60 mb-4">
                    Price Details
                  </h3>
                  <div className="border border-black/10 p-6">
                    <div className="flex justify-between mb-4">
                      <span className="text-black/70">Service Price</span>
                      <span className="font-medium">
                        {bookingDetails.price.toFixed(2)} TND
                      </span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-black/70">Tax (19%)</span>
                      <span>
                        {(bookingDetails.price * 0.19).toFixed(2)} TND
                      </span>
                    </div>
                    <div className="border-t border-black/10 mt-4 pt-4 flex justify-between">
                      <span className="font-medium uppercase tracking-wider text-sm">
                        Total
                      </span>
                      <span className="font-display text-xl">
                        {(bookingDetails.price * 1.19).toFixed(2)} TND
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center mt-8 pt-8 border-t border-black/10">
                <Link
                  to={`/salon/${bookingDetails.salonId}`}
                  className="btn-outline uppercase tracking-wider text-sm px-6 py-3 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                >
                  Back to Salon
                </Link>

                <button
                  onClick={handleContinueToPayment}
                  className="btn-gold uppercase tracking-wider text-sm px-8 py-3 hover:bg-black hover:text-white transition-all duration-300"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Payment Step */}
          {paymentStep === "payment" && (
            <Payment
              amount={bookingDetails.price}
              serviceName={bookingDetails.serviceName}
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          )}

          {/* Success Step */}
          {paymentStep === "success" && (
            <PaymentSuccess
              bookingId={bookingId}
              serviceName={bookingDetails.serviceName}
              date={formatDate(bookingDetails.date)}
              time={bookingDetails.time}
              salonName={bookingDetails.salonName}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
