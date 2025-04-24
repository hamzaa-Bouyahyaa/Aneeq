import { useState } from "react";
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
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // In a real app, you would fetch the salon data based on the id
  const salon = salonData;

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
    // Get the selected service details
    const service = salon.services.find((s) => s.id === selectedService);

    if (!service || !selectedDate || !selectedTime) {
      alert("Please select a service, date, and time");
      return;
    }

    // Create booking details to pass to the checkout page
    const bookingDetails = {
      serviceName: service.name,
      price: service.price,
      date: selectedDate,
      time: selectedTime,
      salonName: salon.name,
      salonId: salon.id,
    };

    // Navigate to the checkout page with booking details
    navigate(`/checkout/${salon.id}`, { state: { bookingDetails } });
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="container-custom">
        {/* Salon Header */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
          <div className="relative h-64 md:h-80">
            <img
              src={salon.image}
              alt={salon.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h1 className="text-3xl font-bold mb-2">{salon.name}</h1>
              <div className="flex items-center mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-yellow-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="ml-1">{salon.rating}</span>
                <span className="ml-1 text-gray-300">
                  ({salon.reviewCount} reviews)
                </span>
              </div>
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {salon.location}
              </p>
            </div>
          </div>
        </div>

        {/* Salon Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Salon Info */}
          <div className="md:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
              <div className="flex border-b">
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === "services"
                      ? "text-primary-600 border-b-2 border-primary-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("services")}
                >
                  Services
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === "about"
                      ? "text-primary-600 border-b-2 border-primary-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === "reviews"
                      ? "text-primary-600 border-b-2 border-primary-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Reviews
                </button>
                <button
                  className={`flex-1 py-4 px-6 text-center font-medium ${
                    activeTab === "gallery"
                      ? "text-primary-600 border-b-2 border-primary-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("gallery")}
                >
                  Gallery
                </button>
              </div>

              <div className="p-6">
                {/* Services Tab */}
                {activeTab === "services" && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">Our Services</h2>
                    <div className="space-y-4">
                      {salon.services.map((service) => (
                        <div
                          key={service.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedService === service.id
                              ? "border-primary-600 bg-primary-50"
                              : "border-gray-200 hover:border-primary-300"
                          }`}
                          onClick={() => setSelectedService(service.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg">
                                {service.name}
                              </h3>
                              <p className="text-gray-600 mt-1">
                                {service.description}
                              </p>
                              <div className="flex items-center mt-2 text-sm text-gray-500">
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
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                {service.duration} min
                              </div>
                            </div>
                            <div className="text-lg font-semibold">
                              {service.price} TND
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* About Tab */}
                {activeTab === "about" && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">About Us</h2>
                    <p className="text-gray-700 mb-6">{salon.description}</p>

                    <h3 className="text-lg font-semibold mb-3">
                      Contact Information
                    </h3>
                    <div className="space-y-2 mb-6">
                      <p className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        <span>{salon.address}</span>
                      </p>
                      <p className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                        <span>{salon.phone}</span>
                      </p>
                      <p className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span>{salon.email}</span>
                      </p>
                      <p className="flex items-start">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-2 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                        <span>{salon.website}</span>
                      </p>
                    </div>

                    <h3 className="text-lg font-semibold mb-3">
                      Opening Hours
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Monday</span>
                        <span>{salon.openingHours.monday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tuesday</span>
                        <span>{salon.openingHours.tuesday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Wednesday</span>
                        <span>{salon.openingHours.wednesday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Thursday</span>
                        <span>{salon.openingHours.thursday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Friday</span>
                        <span>{salon.openingHours.friday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Saturday</span>
                        <span>{salon.openingHours.saturday}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Sunday</span>
                        <span>{salon.openingHours.sunday}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === "reviews" && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h2 className="text-xl font-semibold">
                        Customer Reviews
                      </h2>
                      <button className="btn-primary">Write a Review</button>
                    </div>

                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center mb-2">
                        <div className="text-4xl font-bold mr-4">
                          {salon.rating}
                        </div>
                        <div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-5 w-5 ${
                                  i < Math.floor(salon.rating)
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <div className="text-sm text-gray-500">
                            Based on {salon.reviewCount} reviews
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {salon.reviews.map((review) => (
                        <div key={review.id} className="border-b pb-6">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">{review.user}</div>
                            <div className="text-sm text-gray-500">
                              {review.date}
                            </div>
                          </div>
                          <div className="flex mb-2">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <svg
                                key={i}
                                xmlns="http://www.w3.org/2000/svg"
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                }`}
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                              </svg>
                            ))}
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 text-center">
                      <button className="text-primary-600 font-medium">
                        Load More Reviews
                      </button>
                    </div>
                  </div>
                )}

                {/* Gallery Tab */}
                {activeTab === "gallery" && (
                  <div>
                    <h2 className="text-xl font-semibold mb-4">
                      Salon Gallery
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {salon.gallery.map((image, index) => (
                        <div
                          key={index}
                          className="relative h-48 overflow-hidden rounded-lg"
                        >
                          <img
                            src={image}
                            alt={`Gallery image ${index + 1}`}
                            className="w-full h-full object-cover transition-transform hover:scale-105"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">
                Book an Appointment
              </h2>

              {!selectedService ? (
                <div className="text-center py-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400 mx-auto mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <p className="text-gray-600 mb-4">
                    Please select a service from the list to book an appointment
                  </p>
                  <button
                    onClick={() => setActiveTab("services")}
                    className="text-primary-600 font-medium"
                  >
                    View Services
                  </button>
                </div>
              ) : (
                <div>
                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Selected Service
                    </label>
                    <div className="p-3 bg-gray-50 rounded-md">
                      {
                        salon.services.find((s) => s.id === selectedService)
                          ?.name
                      }{" "}
                      -{" "}
                      {
                        salon.services.find((s) => s.id === selectedService)
                          ?.price
                      }{" "}
                      TND
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-gray-700 font-medium mb-2">
                      Select Date
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {getAvailableDates().map((date, index) => (
                        <button
                          key={index}
                          className={`p-2 text-center text-sm rounded-md ${
                            selectedDate === date.toISOString().split("T")[0]
                              ? "bg-primary-600 text-white"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                          onClick={() =>
                            setSelectedDate(date.toISOString().split("T")[0])
                          }
                        >
                          <div className="font-medium">
                            {date.toLocaleDateString("en-US", {
                              weekday: "short",
                            })}
                          </div>
                          <div>
                            {date.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {selectedDate && (
                    <div className="mb-6">
                      <label className="block text-gray-700 font-medium mb-2">
                        Select Time
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {getAvailableTimeSlots().map((time, index) => (
                          <button
                            key={index}
                            className={`p-2 text-center text-sm rounded-md ${
                              selectedTime === time
                                ? "bg-primary-600 text-white"
                                : "bg-gray-100 hover:bg-gray-200"
                            }`}
                            onClick={() => setSelectedTime(time)}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedDate && selectedTime && (
                    <button
                      onClick={handleBooking}
                      className="btn-primary w-full py-3"
                    >
                      Book Appointment
                    </button>
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
