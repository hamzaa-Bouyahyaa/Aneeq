import { useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SalonCard from "../components/SalonCard";

// Mock data for salons
const mockSalons = [
  {
    id: "1",
    name: "Glamour Beauty Salon",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    rating: 4.8,
    reviewCount: 124,
    location: "Tunis, Tunisia",
    services: ["Haircut", "Hair Coloring", "Manicure", "Pedicure", "Facial"],
  },
  {
    id: "2",
    name: "Elegance Spa & Beauty",
    image:
      "https://images.unsplash.com/photo-1470259078422-826894b933aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    rating: 4.6,
    reviewCount: 98,
    location: "Sousse, Tunisia",
    services: ["Massage", "Facial", "Body Treatments", "Waxing"],
  },
  {
    id: "3",
    name: "Chic Nails & Beauty",
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    rating: 4.7,
    reviewCount: 87,
    location: "Sfax, Tunisia",
    services: ["Manicure", "Pedicure", "Nail Art", "Gel Nails"],
  },
  {
    id: "4",
    name: "Luxe Hair Studio",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1669&q=80",
    rating: 4.9,
    reviewCount: 156,
    location: "Tunis, Tunisia",
    services: ["Haircut", "Hair Styling", "Hair Treatments", "Hair Extensions"],
  },
];

// Mock data for popular services
const popularServices = [
  {
    id: "1",
    name: "Haircut & Styling",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    path: "/services/haircut",
  },
  {
    id: "2",
    name: "Manicure & Pedicure",
    image:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    path: "/services/nails",
  },
  {
    id: "3",
    name: "Facial & Skincare",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    path: "/services/facial",
  },
  {
    id: "4",
    name: "Massage & Spa",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    path: "/services/massage",
  },
];

const Home = () => {
  const [nearestSalons] = useState(mockSalons);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-navy to-navy-dark text-white py-20">
        <div className="container-custom relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Book Your Beauty Appointment Today
            </h1>
            <p className="text-lg md:text-xl mb-8">
              Find and book appointments with the best beauty salons in Tunisia
            </p>
            <SearchBar className="max-w-3xl mx-auto" />
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </section>

      {/* Popular Services */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            Popular Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularServices.map((service) => (
              <Link
                key={service.id}
                to={service.path}
                className="group relative overflow-hidden rounded-lg shadow-md h-64"
              >
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                  <h3 className="text-white text-xl font-semibold p-6">
                    {service.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Nearest Salons */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Nearest Beauty Salons</h2>
            <Link
              to="/salons"
              className="text-primary-600 hover:text-primary-700 font-medium"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {nearestSalons.map((salon) => (
              <SalonCard key={salon.id} {...salon} />
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Find</h3>
              <p className="text-gray-600">
                Search for beauty salons near you or browse by service type
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Book</h3>
              <p className="text-gray-600">
                Choose your preferred date, time, and service
              </p>
            </div>
            <div className="text-center">
              <div className="bg-primary-100 text-primary-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
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
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enjoy</h3>
              <p className="text-gray-600">
                Receive confirmation and enjoy your beauty treatment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Look Your Best?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who book their beauty
            appointments online
          </p>
          <Link
            to="/salons"
            className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
          >
            Find a Salon Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
