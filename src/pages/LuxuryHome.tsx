import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Mock data for salons
const featuredSalons = [
  {
    id: "1",
    name: "Glamour Beauty Salon",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    location: "Tunis, Tunisia",
    rating: 4.8,
    category: "Full Service",
  },
  {
    id: "2",
    name: "Elegance Spa & Beauty",
    image:
      "https://images.unsplash.com/photo-1470259078422-826894b933aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    location: "Sousse, Tunisia",
    rating: 4.6,
    category: "Spa",
  },
  {
    id: "3",
    name: "Chic Nails & Beauty",
    image:
      "https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    location: "Sfax, Tunisia",
    rating: 4.7,
    category: "Nails",
  },
];

// Mock data for services
const featuredServices = [
  {
    id: "1",
    name: "Haircut & Styling",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    description: "Expert haircuts and styling for any occasion",
  },
  {
    id: "2",
    name: "Spa & Massage",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    description: "Relaxing treatments to rejuvenate your body and mind",
  },
  {
    id: "3",
    name: "Makeup",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    description: "Professional makeup for special events and everyday",
  },
  {
    id: "4",
    name: "Nails",
    image:
      "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    description: "Manicures and pedicures with the latest trends",
  },
];

const LuxuryHome = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const heroSlides = [
    {
      image:
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
      title: "Luxury Beauty Experience",
      subtitle: "Discover the finest Aneeq salons in Tunisia",
    },
    {
      image:
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
      title: "Expert Beauty Services",
      subtitle: "Professional treatments tailored to your needs",
    },
    {
      image:
        "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
      title: "Relaxation & Wellness",
      subtitle: "Rejuvenate your body and mind",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would handle the search here
    console.log("Searching for:", searchQuery);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-screen">
        {/* Hero Slider */}
        <div className="absolute inset-0 overflow-hidden">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-2000 ${
                activeSlide === index ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="absolute inset-0 bg-black/50 z-10"></div>
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1
                className="text-5xl md:text-6xl lg:text-7xl font-display uppercase tracking-luxury mb-6 slide-up"
                style={{ animationDelay: "0.3s" }}
              >
                {heroSlides[activeSlide].title}
              </h1>
              <p
                className="text-xl md:text-2xl mb-10 slide-up"
                style={{ animationDelay: "0.6s" }}
              >
                {heroSlides[activeSlide].subtitle}
              </p>

              {/* Search Bar */}
              <div
                className="mt-12 slide-up"
                style={{ animationDelay: "0.9s" }}
              >
                <form
                  onSubmit={handleSearch}
                  className={`relative transition-all duration-500 ${
                    isSearchFocused ? "scale-105" : ""
                  }`}
                >
                  <input
                    type="text"
                    placeholder="Search for salons, services, or locations..."
                    className="w-full py-4 px-6 bg-white/10 backdrop-blur-md border-b border-white/30 text-white placeholder-white/60 outline-none focus:border-gold transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  <button
                    type="submit"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gold transition-colors"
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
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </button>
                </form>
              </div>

              {/* Slider Navigation */}
              <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all ${
                      activeSlide === index
                        ? "bg-gold w-8"
                        : "bg-white/50 hover:bg-white/80"
                    }`}
                    onClick={() => setActiveSlide(index)}
                  ></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Salons Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Featured Salons</h2>
            <div className="luxury-divider mx-auto"></div>
            <p className="section-subtitle mx-auto">
              Discover our handpicked selection of the finest Aneeq salons in
              Tunisia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredSalons.map((salon) => (
              <Link
                key={salon.id}
                to={`/salon/${salon.id}`}
                className="group block"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={salon.image}
                    alt={salon.name}
                    className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs uppercase tracking-wider text-gold">
                        {salon.category}
                      </span>
                      <div className="flex items-center text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gold mr-1"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{salon.rating}</span>
                      </div>
                    </div>
                    <h3 className="text-xl font-display uppercase tracking-wider text-white mb-2">
                      {salon.name}
                    </h3>
                    <p className="text-white/70 flex items-center">
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
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/salons" className="btn-outline">
              View All Salons
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Our Services</h2>
            <div className="luxury-divider mx-auto"></div>
            <p className="section-subtitle mx-auto">
              Experience a wide range of premium beauty services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredServices.map((service) => (
              <div key={service.id} className="group">
                <div className="relative overflow-hidden mb-6">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="luxury-overlay">
                    <Link to={`/services/${service.id}`} className="btn-gold">
                      Learn More
                    </Link>
                  </div>
                </div>
                <h3 className="text-xl font-display uppercase tracking-wider mb-2">
                  {service.name}
                </h3>
                <p className="text-black/70">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Process Section */}
      <section className="py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">How It Works</h2>
            <div className="luxury-divider mx-auto"></div>
            <p className="section-subtitle mx-auto">
              Book your beauty appointment in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-2xl font-display mx-auto">
                  1
                </div>
                <div className="absolute top-1/2 left-full w-full h-px bg-black/10 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-display uppercase tracking-wider mb-4">
                Discover
              </h3>
              <p className="text-black/70">
                Browse through our curated selection of top-rated Aneeq salons
                and services
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-2xl font-display mx-auto">
                  2
                </div>
                <div className="absolute top-1/2 left-full w-full h-px bg-black/10 hidden md:block"></div>
              </div>
              <h3 className="text-xl font-display uppercase tracking-wider mb-4">
                Book
              </h3>
              <p className="text-black/70">
                Select your preferred date, time, and service for your
                appointment
              </p>
            </div>

            <div className="text-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center text-2xl font-display mx-auto">
                  3
                </div>
              </div>
              <h3 className="text-xl font-display uppercase tracking-wider mb-4">
                Enjoy
              </h3>
              <p className="text-black/70">
                Relax and enjoy your premium beauty treatment at your chosen
                salon
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-luxury mb-6">
              Ready for Your Luxury Experience?
            </h2>
            <p className="text-xl text-white/70 mb-10">
              Join thousands of satisfied customers who book their beauty
              appointments online
            </p>
            <Link to="/salons" className="btn-gold">
              Book Your Appointment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LuxuryHome;
