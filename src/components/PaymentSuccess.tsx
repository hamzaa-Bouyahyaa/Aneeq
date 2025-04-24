import { Link } from 'react-router-dom';

interface PaymentSuccessProps {
  bookingId: string;
  serviceName: string;
  date: string;
  time: string;
  salonName: string;
}

const PaymentSuccess = ({ bookingId, serviceName, date, time, salonName }: PaymentSuccessProps) => {
  return (
    <div className="bg-white rounded-xl shadow-card p-6 md:p-8 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 text-green-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
      
      <h2 className="text-2xl font-bold text-navy mb-2">Payment Successful!</h2>
      <p className="text-navy/70 mb-6">
        Your booking has been confirmed and you will receive a confirmation email shortly.
      </p>
      
      <div className="bg-lightGray rounded-lg p-4 mb-6 text-left">
        <h3 className="font-medium text-navy mb-3">Booking Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-navy/70">Booking ID</span>
            <span className="font-medium">{bookingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-navy/70">Service</span>
            <span>{serviceName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-navy/70">Date & Time</span>
            <span>{date} at {time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-navy/70">Salon</span>
            <span>{salonName}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/" className="btn-secondary">
          Return to Home
        </Link>
        <Link to="/bookings" className="btn-primary">
          View My Bookings
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
