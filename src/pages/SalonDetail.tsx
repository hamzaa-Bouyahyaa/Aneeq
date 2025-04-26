import { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

// Mock data for a salon
const salonData = {
  id: "1",
  name: "Glamour Beauty Salon",
  image:
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
  rating: 4.8,
  reviewCount: 124,
  location: "Tunis, Tunisia",
  address: "123 Beauty Street, Tunis 1000, Tunisia",
  phone: "+216 123 456 789",
  email: "info@glamourbeauty.com",
  website: "www.glamourbeauty.com",
  description:
    "Glamour Beauty Salon is a premier beauty destination in Tunis, offering a wide range of services from haircuts and styling to manicures, pedicures, and facials. Our team of experienced professionals is dedicated to helping you look and feel your best.",
  openingHours: {
    monday: "9:00 AM - 7:00 PM",
    tuesday: "9:00 AM - 7:00 PM",
    wednesday: "9:00 AM - 7:00 PM",
    thursday: "9:00 AM - 7:00 PM",
    friday: "9:00 AM - 7:00 PM",
    saturday: "10:00 AM - 6:00 PM",
    sunday: "Closed",
  },
  services: [
    {
      id: "1",
      name: "Women's Haircut",
      description:
        "Professional haircut for women, includes consultation, shampoo, and styling.",
      duration: 60,
      price: 50,
    },
    {
      id: "2",
      name: "Men's Haircut",
      description:
        "Professional haircut for men, includes consultation and styling.",
      duration: 30,
      price: 30,
    },
    {
      id: "3",
      name: "Hair Coloring",
      description:
        "Full hair coloring service, includes consultation and styling.",
      duration: 120,
      price: 100,
    },
    {
      id: "4",
      name: "Manicure",
      description:
        "Classic manicure includes nail shaping, cuticle care, and polish.",
      duration: 45,
      price: 35,
    },
    {
      id: "5",
      name: "Pedicure",
      description:
        "Classic pedicure includes foot soak, exfoliation, nail care, and polish.",
      duration: 60,
      price: 45,
    },
    {
      id: "6",
      name: "Facial",
      description:
        "Customized facial treatment to address your specific skin concerns.",
      duration: 60,
      price: 70,
    },
  ],
  reviews: [
    {
      id: "1",
      user: "Sarah L.",
      rating: 5,
      date: "2023-10-15",
      comment:
        "Amazing experience! The staff was friendly and professional. My haircut looks fantastic!",
    },
    {
      id: "2",
      user: "Mohammed A.",
      rating: 4,
      date: "2023-09-28",
      comment:
        "Great service and atmosphere. The manicure was perfect, but I had to wait a bit longer than expected.",
    },
    {
      id: "3",
      user: "Leila B.",
      rating: 5,
      date: "2023-09-10",
      comment:
        "I had a facial here and it was incredible. My skin feels so refreshed and the esthetician was very knowledgeable.",
    },
  ],
  gallery: [
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    "https://images.unsplash.com/photo-1470259078422-826894b933aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
  ],
};

const SalonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("services");
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const galleryRef = useRef<HTMLDivElement>(null);

  // Animation states
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  // In a real app, you would fetch the salon data based on the id
  const salon = salonData;

  // Set page loaded state for animations
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  // Generate available dates (next 7 days)
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }

    return dates;
  };

  // Generate available time slots
  const getAvailableTimeSlots = () => {
    const timeSlots = [];
    let hour = 9; // Start at 9 AM

    while (hour < 19) {
      // End at 7 PM
      timeSlots.push(`${hour}:00`);
      timeSlots.push(`${hour}:30`);
      hour++;
    }

    return timeSlots;
  };

  const handleBooking = () => {
    // Get the selected services details
    const services = selectedServices
      .map((id) => salon.services.find((s) => s.id === id))
      .filter(Boolean);

    if (services.length === 0 || !selectedDate || !selectedTime) {
      alert("Please select at least one service, date, and time");
      return;
    }

    // Calculate total price
    const totalPrice = services.reduce(
      (total, service) => total + (service?.price || 0),
      0
    );

    // Create booking details to pass to the checkout page
    const bookingDetails = {
      services: services.map((service) => ({
        id: service?.id,
        name: service?.name,
        price: service?.price,
        duration: service?.duration,
      })),
      totalPrice,
      date: selectedDate,
      time: selectedTime,
      salonName: salon.name,
      salonId: salon.id,
    };

    // Navigate to the checkout page with booking details
    navigate(`/checkout/${salon.id}`, { state: { bookingDetails } });
  };

  return (
    <div className="bg-white">
      {/* Immersive Hero Section */}
      <div
        className={`relative h-[70vh] w-full transition-opacity duration-1000 ${
          isPageLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src={salon.image}
          alt={salon.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="absolute inset-0 flex flex-col justify-end container-custom pb-16">
          <div
            className={`transition-all duration-1000 delay-300 transform ${
              isPageLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display text-white uppercase tracking-luxury mb-4">
              {salon.name}
            </h1>

            <div className="flex items-center space-x-6 mb-6">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gold"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-2 text-white font-medium">
                  {salon.rating}
                </span>
                <span className="ml-1 text-white/70">
                  ({salon.reviewCount} reviews)
                </span>
              </div>

              <div className="w-px h-4 bg-white/30"></div>

              <div className="flex items-center text-white/90">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {salon.location}
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                onClick={() => {
                  setActiveTab("services");
                  document
                    .getElementById("salon-content")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-gold px-8 py-3"
              >
                Book Now
              </button>
              <button
                onClick={() => {
                  setActiveTab("gallery");
                  document
                    .getElementById("salon-content")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="btn-outline text-white border-white/30 hover:bg-white/10 px-8 py-3"
              >
                View Gallery
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Bar */}
      <div className="bg-black text-white py-6 border-t border-white/10">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gold mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div>
                <p className="text-sm text-white/70 uppercase tracking-wider">
                  Opening Hours
                </p>
                <p className="font-medium">{salon.openingHours.monday}</p>
              </div>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gold mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <div>
                <p className="text-sm text-white/70 uppercase tracking-wider">
                  Contact
                </p>
                <p className="font-medium">{salon.phone}</p>
              </div>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gold mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <div>
                <p className="text-sm text-white/70 uppercase tracking-wider">
                  Address
                </p>
                <p className="font-medium">{salon.address.split(",")[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div id="salon-content" className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Left Column - Salon Info */}
          <div className="md:col-span-2">
            {/* Tabs */}
            <div
              className={`mb-12 transition-all duration-1000 delay-500 transform ${
                isPageLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
              }`}
            >
              <div className="flex border-b border-black/10">
                <button
                  className={`py-4 px-8 text-center font-medium uppercase tracking-wider text-sm transition-all ${
                    activeTab === "services"
                      ? "text-black border-b-2 border-gold"
                      : "text-black/60 hover:text-black"
                  }`}
                  onClick={() => setActiveTab("services")}
                >
                  Services
                </button>
                <button
                  className={`py-4 px-8 text-center font-medium uppercase tracking-wider text-sm transition-all ${
                    activeTab === "about"
                      ? "text-black border-b-2 border-gold"
                      : "text-black/60 hover:text-black"
                  }`}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </button>
                <button
                  className={`py-4 px-8 text-center font-medium uppercase tracking-wider text-sm transition-all ${
                    activeTab === "reviews"
                      ? "text-black border-b-2 border-gold"
                      : "text-black/60 hover:text-black"
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </button>
                <button
                  className={`py-4 px-8 text-center font-medium uppercase tracking-wider text-sm transition-all ${
                    activeTab === "gallery"
                      ? "text-black border-b-2 border-gold"
                      : "text-black/60 hover:text-black"
                  }`}
                  onClick={() => setActiveTab("gallery")}
                >
                  Gallery
                </button>
              </div>

              <div className="py-8">
                {/* Services Tab */}
                {activeTab === "services" && (
                  <div className="animate-[fadeIn_0.5s_ease-in-out]">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-display uppercase tracking-luxury">
                        Our Services
                      </h2>
                      <div className="h-px w-32 bg-gold"></div>
                    </div>

                    <div className="grid grid-cols-1 gap-6">
                      {salon.services.map((service) => (
                        <div
                          key={service.id}
                          className={`group p-6 border cursor-pointer transition-all duration-300 hover:shadow-luxury ${
                            selectedServices.includes(service.id)
                              ? "border-gold bg-gold/5"
                              : "border-black/10 hover:border-gold/50"
                          }`}
                          onClick={() => {
                            // Toggle service selection
                            setSelectedServices((prev) =>
                              prev.includes(service.id)
                                ? prev.filter((id) => id !== service.id)
                                : [...prev, service.id]
                            );
                          }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-display text-xl uppercase tracking-wider group-hover:text-gold transition-colors">
                                {service.name}
                              </h3>
                              <p className="text-black/70 mt-2 leading-relaxed">
                                {service.description}
                              </p>
                              <div className="flex items-center mt-4 text-sm text-black/60">
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
                                    strokeWidth={1.5}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                {service.duration} minutes
                              </div>
                            </div>
                            <div className="text-xl font-display">
                              {service.price}{" "}
                              <span className="text-sm">TND</span>
                            </div>
                          </div>

                          {selectedServices.includes(service.id) && (
                            <div className="mt-4 pt-4 border-t border-gold/30 text-sm text-black/70 animate-[fadeIn_0.3s_ease-in-out]">
                              Selected for booking
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* About Tab */}
                {activeTab === "about" && (
                  <div className="animate-[fadeIn_0.5s_ease-in-out]">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-display uppercase tracking-luxury">
                        About Us
                      </h2>
                      <div className="h-px w-32 bg-gold"></div>
                    </div>

                    <div className="mb-12">
                      <p className="text-black/80 leading-relaxed text-lg mb-6">
                        {salon.description}
                      </p>
                      <div className="mt-8 w-16 h-px bg-gold mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-12">
                      <div>
                        <h3 className="text-xl font-display uppercase tracking-wider mb-6">
                          Contact Information
                        </h3>
                        <div className="space-y-6">
                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mr-4 mt-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gold"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-sm uppercase tracking-wider text-black/60 mb-1">
                                Address
                              </h4>
                              <p className="text-black">{salon.address}</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mr-4 mt-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gold"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-sm uppercase tracking-wider text-black/60 mb-1">
                                Phone
                              </h4>
                              <p className="text-black">{salon.phone}</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mr-4 mt-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gold"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-sm uppercase tracking-wider text-black/60 mb-1">
                                Email
                              </h4>
                              <p className="text-black">{salon.email}</p>
                            </div>
                          </div>

                          <div className="flex items-start">
                            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mr-4 mt-1">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gold"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                                />
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-sm uppercase tracking-wider text-black/60 mb-1">
                                Website
                              </h4>
                              <p className="text-black">{salon.website}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-xl font-display uppercase tracking-wider mb-6">
                          Opening Hours
                        </h3>
                        <div className="space-y-4">
                          <div className="flex justify-between py-2 border-b border-black/10">
                            <span className="font-medium uppercase text-sm tracking-wider">
                              Monday
                            </span>
                            <span className="text-black/80">
                              {salon.openingHours.monday}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-black/10">
                            <span className="font-medium uppercase text-sm tracking-wider">
                              Tuesday
                            </span>
                            <span className="text-black/80">
                              {salon.openingHours.tuesday}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-black/10">
                            <span className="font-medium uppercase text-sm tracking-wider">
                              Wednesday
                            </span>
                            <span className="text-black/80">
                              {salon.openingHours.wednesday}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-black/10">
                            <span className="font-medium uppercase text-sm tracking-wider">
                              Thursday
                            </span>
                            <span className="text-black/80">
                              {salon.openingHours.thursday}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-black/10">
                            <span className="font-medium uppercase text-sm tracking-wider">
                              Friday
                            </span>
                            <span className="text-black/80">
                              {salon.openingHours.friday}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-black/10">
                            <span className="font-medium uppercase text-sm tracking-wider">
                              Saturday
                            </span>
                            <span className="text-black/80">
                              {salon.openingHours.saturday}
                            </span>
                          </div>
                          <div className="flex justify-between py-2 border-b border-black/10">
                            <span className="font-medium uppercase text-sm tracking-wider">
                              Sunday
                            </span>
                            <span className="text-black/80">
                              {salon.openingHours.sunday}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div className="animate-[fadeIn_0.5s_ease-in-out]">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-display uppercase tracking-luxury">
                        Customer Reviews
                      </h2>
                      <div className="h-px w-32 bg-gold"></div>
                    </div>

                    <div className="flex justify-between items-center mb-10">
                      <div className="flex items-center">
                        <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mr-6">
                          <span className="text-3xl font-display">
                            {salon.rating}
                          </span>
                        </div>
                        <div>
                          <div className="flex mb-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 ${
                                  i < Math.floor(salon.rating)
                                    ? "text-gold"
                                    : "text-gray-300"
                                }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <div className="text-sm text-black/60 uppercase tracking-wider">
                            Based on {salon.reviewCount} reviews
                          </div>
                        </div>
                      </div>

                      <button className="btn-outline uppercase tracking-wider text-sm px-6 py-3 hover:bg-black hover:text-white hover:border-black transition-all duration-300">
                        Write a Review
                      </button>
                    </div>

                    <div className="space-y-8">
                      {salon.reviews.map((review) => (
                        <div
                          key={review.id}
                          className="p-6 border border-black/10 hover:border-gold/30 transition-all duration-300 hover:shadow-luxury"
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center mr-4 uppercase font-medium">
                                {review.user.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{review.user}</div>
                                <div className="text-sm text-black/60">
                                  {review.date}
                                </div>
                              </div>
                            </div>
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <svg
                                  key={i}
                                  xmlns="http://www.w3.org/2000/svg"
                                  className={`h-4 w-4 ${
                                    i < review.rating
                                      ? "text-gold"
                                      : "text-gray-300"
                                  }`}
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                          <p className="text-black/80 leading-relaxed">
                            {review.comment}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-10 text-center">
                      <button className="btn-outline uppercase tracking-wider text-sm px-8 py-3 hover:bg-black hover:text-white hover:border-black transition-all duration-300">
                        Load More Reviews
                      </button>
                    </div>
                  </div>
                )}

                {/* Gallery Tab */}
                {activeTab === "gallery" && (
                  <div className="animate-[fadeIn_0.5s_ease-in-out]">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-display uppercase tracking-luxury">
                        Salon Gallery
                      </h2>
                      <div className="h-px w-32 bg-gold"></div>
                    </div>

                    <div
                      className="grid grid-cols-2 md:grid-cols-3 gap-6"
                      ref={galleryRef}
                    >
                      {salon.gallery.map((image, index) => (
                        <div
                          key={index}
                          className="group relative aspect-square overflow-hidden cursor-pointer"
                          onClick={() => {
                            setActiveImage(index);
                            setShowGalleryModal(true);
                          }}
                        >
                          <img
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-10 w-10 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gallery Modal */}
                {showGalleryModal && (
                  <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-[fadeIn_0.3s_ease-in-out]">
                    <div className="relative w-full max-w-6xl">
                      <button
                        className="absolute top-4 right-4 text-white hover:text-gold transition-colors z-10"
                        onClick={() => setShowGalleryModal(false)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>

                      <div className="relative">
                        <img
                          src={salon.gallery[activeImage]}
                          alt={`Gallery image ${activeImage + 1}`}
                          className="w-full h-auto max-h-[80vh] object-contain"
                        />

                        <button
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-2 rounded-full transition-colors"
                          onClick={() =>
                            setActiveImage((prev) =>
                              prev === 0 ? salon.gallery.length - 1 : prev - 1
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>

                        <button
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black text-white p-2 rounded-full transition-colors"
                          onClick={() =>
                            setActiveImage((prev) =>
                              prev === salon.gallery.length - 1 ? 0 : prev + 1
                            )
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </div>

                      <div className="flex justify-center mt-4 space-x-2">
                        {salon.gallery.map((_, index) => (
                          <button
                            key={index}
                            className={`w-3 h-3 rounded-full transition-colors ${
                              index === activeImage
                                ? "bg-gold"
                                : "bg-white/30 hover:bg-white/60"
                            }`}
                            onClick={() => setActiveImage(index)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div
            className={`transition-all duration-1000 delay-700 transform ${
              isPageLoaded
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <div className="border border-black/10 p-8 sticky top-24 bg-white shadow-luxury">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-display uppercase tracking-luxury">
                  Book Now
                </h2>
                <div className="h-px w-16 bg-gold"></div>
              </div>

              {selectedServices.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-full bg-black/5 flex items-center justify-center mx-auto mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 text-black/40"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <p className="text-black/70 mb-6 leading-relaxed">
                    Please select one or more services from the list to book
                    your appointment
                  </p>
                  <button
                    onClick={() => setActiveTab("services")}
                    className="btn-outline uppercase tracking-wider text-sm px-6 py-3 hover:bg-black hover:text-white hover:border-black transition-all duration-300"
                  >
                    View Services
                  </button>
                </div>
              ) : (
                <div className="animate-[fadeIn_0.5s_ease-in-out]">
                  <div className="mb-8">
                    <h3 className="text-sm uppercase tracking-wider text-black/60 mb-3">
                      Selected Services ({selectedServices.length})
                    </h3>

                    {selectedServices.map((serviceId) => {
                      const service = salon.services.find(
                        (s) => s.id === serviceId
                      );
                      if (!service) return null;

                      return (
                        <div
                          key={service.id}
                          className="p-4 border border-gold/30 bg-gold/5 mb-3 relative"
                        >
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedServices((prev) =>
                                prev.filter((id) => id !== service.id)
                              );
                            }}
                            className="absolute top-2 right-2 text-black/40 hover:text-black transition-colors"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>

                          <div className="font-display text-lg">
                            {service.name}
                          </div>
                          <div className="flex justify-between items-center mt-2">
                            <div className="text-black/60 text-sm flex items-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              {service.duration} minutes
                            </div>
                            <div className="font-display">
                              {service.price}{" "}
                              <span className="text-sm">TND</span>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {/* Total Price */}
                    <div className="mt-4 p-4 border-t border-black/10 flex justify-between items-center">
                      <span className="font-medium">Total</span>
                      <div className="font-display text-xl">
                        {selectedServices.reduce((total, serviceId) => {
                          const service = salon.services.find(
                            (s) => s.id === serviceId
                          );
                          return total + (service?.price || 0);
                        }, 0)}{" "}
                        <span className="text-sm">TND</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-sm uppercase tracking-wider text-black/60 mb-3">
                      Select Date
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {getAvailableDates().map((date, index) => (
                        <button
                          key={index}
                          className={`p-3 text-center border transition-all duration-300 ${
                            selectedDate === date.toISOString().split("T")[0]
                              ? "border-gold bg-gold/5 text-black"
                              : "border-black/10 hover:border-gold/50 text-black/80"
                          }`}
                          onClick={() =>
                            setSelectedDate(date.toISOString().split("T")[0])
                          }
                        >
                          <div className="text-xs uppercase tracking-wider mb-1">
                            {date.toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          </div>
                          <div className="font-display text-lg">
                            {date.getDate()}
                          </div>
                          <div className="text-xs uppercase tracking-wider">
                            {date.toLocaleDateString("en-US", {
                              month: "short",
                            })}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedDate && (
                    <div className="mb-8 animate-[fadeIn_0.5s_ease-in-out]">
                      <h3 className="text-sm uppercase tracking-wider text-black/60 mb-3">
                        Select Time
                      </h3>
                      <div className="grid grid-cols-3 gap-3">
                        {getAvailableTimeSlots().map((time, index) => (
                          <button
                            key={index}
                            className={`p-3 text-center border transition-all duration-300 ${
                              selectedTime === time
                                ? "border-gold bg-gold/5 text-black"
                                : "border-black/10 hover:border-gold/50 text-black/80"
                            }`}
                            onClick={() => setSelectedTime(time)}
                          >
                            <div className="font-display">{time}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <div className="animate-[fadeIn_0.5s_ease-in-out]">
                      <button
                        onClick={handleBooking}
                        className="btn-gold w-full py-4 uppercase tracking-wider text-sm hover:bg-black hover:text-white transition-all duration-300"
                      >
                        Book{" "}
                        {selectedServices.length > 1 ? "Services" : "Service"}
                      </button>

                      <p className="text-xs text-center text-black/60 mt-4">
                        By booking an appointment, you agree to our Terms of
                        Service and Privacy Policy
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalonDetail;
