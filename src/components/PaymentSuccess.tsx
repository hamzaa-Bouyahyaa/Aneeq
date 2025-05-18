import { Link } from "react-router-dom";

interface PaymentSuccessProps {
  bookingId: string;
  serviceName: string;
  date: string;
  time: string;
  salonName: string;
}

const PaymentSuccess = ({
  bookingId,
  serviceName,
  date,
  time,
  salonName,
}: PaymentSuccessProps) => {
  return (
    <div className="border border-black/10 p-8 shadow-luxury animate-[fadeIn_0.5s_ease-in-out] text-center">
      <div className="w-24 h-24 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-gold"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <h2 className="text-3xl font-display uppercase tracking-luxury mb-4">
        Booking Confirmed
      </h2>
      <div className="w-16 h-px bg-gold mx-auto mb-6"></div>

      <p className="text-black/70 mb-8 max-w-md mx-auto leading-relaxed">
        Your payment was successful and your booking has been confirmed. You
        will receive a confirmation email shortly.
      </p>

      <div className="border border-black/10 p-6 mb-8 text-left max-w-md mx-auto">
        <h3 className="text-sm uppercase tracking-wider text-black/60 mb-4">
          Booking Details
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between pb-2 border-b border-black/10">
            <span className="text-black/70">Booking ID</span>
            <span className="font-medium">{bookingId}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-black/10">
            <span className="text-black/70">Service</span>
            <span className="font-medium">{serviceName}</span>
          </div>
          <div className="flex justify-between pb-2 border-b border-black/10">
            <span className="text-black/70">Date & Time</span>
            <span className="font-medium">
              {date} at {time}
            </span>
          </div>
          <div className="flex justify-between pb-2 border-b border-black/10">
            <span className="text-black/70">Salon</span>
            <span className="font-medium">{salonName}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          to="/"
          className="btn-outline uppercase tracking-wider text-sm px-6 py-3 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
        >
          Return to Home
        </Link>
        <Link
          to="/bookings"
          className="btn-gold uppercase tracking-wider text-sm px-6 py-3 hover:bg-black hover:text-white transition-all duration-300"
        >
          View My Bookings
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
