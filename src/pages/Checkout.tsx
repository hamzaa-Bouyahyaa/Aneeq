import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Payment from '../components/Payment';
import PaymentSuccess from '../components/PaymentSuccess';

const Checkout = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStep, setPaymentStep] = useState<'details' | 'payment' | 'success'>('details');
  const [bookingDetails, setBookingDetails] = useState({
    serviceName: '',
    price: 0,
    date: '',
    time: '',
    salonName: '',
    salonId: '',
  });
  const [bookingId, setBookingId] = useState('');

  // In a real app, you would fetch the booking details from the server
  useEffect(() => {
    // For demo purposes, we'll use the state passed from the previous page
    // or mock data if none is available
    if (location.state?.bookingDetails) {
      setBookingDetails(location.state.bookingDetails);
    } else {
      // Mock data
      setBookingDetails({
        serviceName: 'Women\'s Haircut',
        price: 50,
        date: '2023-12-15',
        time: '10:00',
        salonName: 'Glamour Beauty Salon',
        salonId: '1',
      });
    }
  }, [location.state]);

  const handleContinueToPayment = () => {
    setPaymentStep('payment');
  };

  const handlePaymentSuccess = () => {
    // Generate a random booking ID
    const generatedBookingId = `BK${Math.floor(Math.random() * 10000)}`;
    setBookingId(generatedBookingId);
    setPaymentStep('success');
  };

  const handlePaymentCancel = () => {
    setPaymentStep('details');
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-lightGray min-h-screen pt-24 pb-16">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          {/* Checkout Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  paymentStep === 'details' || paymentStep === 'payment' || paymentStep === 'success'
                    ? 'bg-gold text-white'
                    : 'bg-lightGray text-navy border border-navy/20'
                }`}>
                  1
                </div>
                <div className={`ml-2 font-medium ${
                  paymentStep === 'details' ? 'text-navy' : 'text-navy/70'
                }`}>
                  Booking Details
                </div>
              </div>
              <div className="w-16 h-0.5 bg-lightGray"></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  paymentStep === 'payment' || paymentStep === 'success'
                    ? 'bg-gold text-white'
                    : 'bg-lightGray text-navy border border-navy/20'
                }`}>
                  2
                </div>
                <div className={`ml-2 font-medium ${
                  paymentStep === 'payment' ? 'text-navy' : 'text-navy/70'
                }`}>
                  Payment
                </div>
              </div>
              <div className="w-16 h-0.5 bg-lightGray"></div>
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  paymentStep === 'success'
                    ? 'bg-gold text-white'
                    : 'bg-lightGray text-navy border border-navy/20'
                }`}>
                  3
                </div>
                <div className={`ml-2 font-medium ${
                  paymentStep === 'success' ? 'text-navy' : 'text-navy/70'
                }`}>
                  Confirmation
                </div>
              </div>
            </div>
          </div>

          {/* Booking Details Step */}
          {paymentStep === 'details' && (
            <div className="bg-white rounded-xl shadow-card p-6 md:p-8">
              <h2 className="text-2xl font-bold text-navy mb-6">Booking Details</h2>
              
              <div className="mb-6">
                <h3 className="font-medium text-navy mb-3">Service Information</h3>
                <div className="bg-lightGray rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-navy/70">Service</span>
                    <span className="font-medium">{bookingDetails.serviceName}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-navy/70">Date</span>
                    <span>{formatDate(bookingDetails.date)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-navy/70">Time</span>
                    <span>{bookingDetails.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-navy/70">Salon</span>
                    <span>{bookingDetails.salonName}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="font-medium text-navy mb-3">Price Details</h3>
                <div className="bg-lightGray rounded-lg p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-navy/70">Service Price</span>
                    <span>{bookingDetails.price.toFixed(2)} TND</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-navy/70">Tax (19%)</span>
                    <span>{(bookingDetails.price * 0.19).toFixed(2)} TND</span>
                  </div>
                  <div className="border-t border-navy/10 my-2 pt-2 flex justify-between">
                    <span className="font-medium">Total</span>
                    <span className="font-bold text-navy">{(bookingDetails.price * 1.19).toFixed(2)} TND</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={handleContinueToPayment}
                  className="btn-primary"
                >
                  Continue to Payment
                </button>
              </div>
            </div>
          )}

          {/* Payment Step */}
          {paymentStep === 'payment' && (
            <Payment
              amount={bookingDetails.price}
              serviceName={bookingDetails.serviceName}
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          )}

          {/* Success Step */}
          {paymentStep === 'success' && (
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
