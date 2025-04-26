import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MapView from "../components/MapView";

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

// Mock data for nearby salons
const nearbySalons = [
  {
    id: "4",
    name: "Luxe Hair Studio",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1669&q=80",
    location: "Tunis, Tunisia",
    distance: "0.8 km",
    rating: 4.9,
    category: "Hair",
    coordinates: [36.8065, 10.1815], // Tunis coordinates
    address: "123 Avenue Habib Bourguiba, Tunis",
    phone: "+216 71 123 456",
    openHours: "9:00 AM - 8:00 PM",
  },
  {
    id: "5",
    name: "Zen Day Spa",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    location: "Tunis, Tunisia",
    distance: "1.2 km",
    rating: 4.5,
    category: "Spa",
    coordinates: [36.8125, 10.1855], // Slightly different coordinates
    address: "45 Rue de Marseille, Tunis",
    phone: "+216 71 987 654",
    openHours: "10:00 AM - 7:00 PM",
  },
  {
    id: "6",
    name: "Blush Beauty Lounge",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    location: "Tunis, Tunisia",
    distance: "1.5 km",
    rating: 4.3,
    category: "Makeup",
    coordinates: [36.8095, 10.1765], // Slightly different coordinates
    address: "78 Avenue Mohamed V, Tunis",
    phone: "+216 71 456 789",
    openHours: "9:30 AM - 6:30 PM",
  },
  {
    id: "7",
    name: "Pure Skin Clinic",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    location: "Tunis, Tunisia",
    distance: "2.3 km",
    rating: 4.8,
    category: "Skin Care",
    coordinates: [36.8195, 10.1905], // Slightly different coordinates
    address: "12 Rue d'Algérie, Tunis",
    phone: "+216 71 321 654",
    openHours: "10:00 AM - 8:00 PM",
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

// Define the salon type
interface Salon {
  id: string;
  name: string;
  image: string;
  location: string;
  distance: string;
  rating: number;
  category: string;
  coordinates: [number, number]; // Tuple type for coordinates
  address: string;
  phone: string;
  openHours: string;
}

// Type the nearbySalons array
const typedNearbySalons: Salon[] = nearbySalons as Salon[];

const LuxuryHome = () => {
  // Search functionality commented out as requested
  // const [isSearchFocused, setIsSearchFocused] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);

  // Ensure video plays when component mounts
  useEffect(() => {
    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement
        .play()
        .catch((err) => console.error("Video play error:", err));
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  // Search functionality commented out as requested
  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // In a real app, you would handle the search here
  //   console.log("Searching for:", searchQuery);
  // };

  const handleUpdateLocation = () => {
    // In a real app, this would use the browser's geolocation API
    // to get the user's current location and then fetch nearby salons
    if (navigator.geolocation) {
      // Show loading state
      setIsLoadingLocation(true);
      console.log("Getting your location...");

      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Success callback
          console.log(
            "Location found:",
            position.coords.latitude,
            position.coords.longitude
          );
          // In a real app, you would make an API call to get nearby salons based on these coordinates
          setTimeout(() => {
            setIsLoadingLocation(false);
            alert("Location updated! Nearby salons have been refreshed.");
          }, 1500); // Simulate API call delay
        },
        (error) => {
          // Error callback
          console.error("Error getting location:", error);
          setIsLoadingLocation(false);
          alert(
            "Could not get your location. Please check your browser settings and try again."
          );
        },
        { timeout: 10000, enableHighAccuracy: true }
      );
    } else {
      alert(
        "Geolocation is not supported by your browser. Please enter your location manually."
      );
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section with Single Video Background - Richard Mille Style */}
      <section className="relative h-screen">
        {/* Hero Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient overlay for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 z-10"></div>

          {/* Single Video Element */}
          <div className="absolute inset-0 w-full h-full">
            <video
              src={`${
                import.meta.env.BASE_URL
              }src/assets/videos/barberShop.mp4`}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted
              playsInline
            >
              {/* Fallback for browsers that don't support video */}
              <img
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
                alt="Barber Shop"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </video>
          </div>
        </div>

        {/* Hero Content - Richard Mille Style (Bottom Left) */}
        <div className="relative z-20 h-full">
          <div className="absolute bottom-0 left-0 p-12 pb-20">
            <div className="text-white">
              <h1
                className="text-4xl text-white md:text-5xl lg:text-6xl font-display uppercase tracking-luxury mb-4 slide-up"
                style={{ animationDelay: "0.3s" }}
              >
                Luxury Beauty Experience
              </h1>
              <div className="w-24 h-[2px] bg-gold mb-8"></div>
              <p
                className="text-lg md:text-xl slide-up font-light tracking-wide"
                style={{ animationDelay: "0.6s" }}
              >
                Discover the finest Aneeq salons in Tunisia
              </p>

              {/* Richard Mille style button */}
              <div className="mt-8 slide-up" style={{ animationDelay: "0.9s" }}>
                <a
                  href="#featured-salons"
                  className="inline-flex items-center group"
                >
                  <span className="w-10 h-[1px] bg-gold mr-4 transition-all duration-300 group-hover:w-16"></span>
                  <span className="uppercase text-sm tracking-widest font-medium">
                    Explore
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Search Bar - Commented out as requested */}
          {/* <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center text-white">
              <div className="mt-12 slide-up" style={{ animationDelay: "0.9s" }}>
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
            </div>
          </div> */}
        </div>
      </section>

      {/* Featured Salons Section */}
      <section id="featured-salons" className="py-24">
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

      {/* Nearest Salons Section */}
      <section className="py-24 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="section-title">Nearest Salons</h2>
            <div className="luxury-divider mx-auto"></div>
            <p className="section-subtitle mx-auto">
              Find the closest Aneeq salons to your current location
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Salon Cards - Vertical Stack */}
            <div className="w-full md:w-1/2 space-y-6">
              {typedNearbySalons.map((salon) => (
                <div
                  key={salon.id}
                  className={`bg-white shadow-luxury rounded-sm overflow-hidden transition-all duration-300 ${
                    selectedSalon?.id === salon.id
                      ? "ring-2 ring-gold transform scale-[1.02]"
                      : "hover:shadow-xl"
                  }`}
                >
                  <div
                    className="flex cursor-pointer"
                    onClick={() => setSelectedSalon(salon)}
                  >
                    <div className="w-1/3 relative overflow-hidden">
                      <img
                        src={salon.image}
                        alt={salon.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                      <div className="absolute top-0 right-0 m-2">
                        <span className="text-xs uppercase tracking-wider text-white bg-gold px-2 py-1 rounded-sm">
                          {salon.category}
                        </span>
                      </div>
                    </div>
                    <div className="w-2/3 p-5">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-display uppercase tracking-wider mb-1">
                          {salon.name}
                        </h3>
                        <div className="flex items-center bg-gray-50 px-2 py-1 rounded-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gold mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm font-medium">
                            {salon.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center text-black/70 mb-2">
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
                      </div>

                      <div className="flex items-center text-black/70 mb-4">
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
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                        <span className="text-sm">{salon.distance}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <a
                          href={`https://www.openstreetmap.org/?mlat=${salon.coordinates[0]}&mlon=${salon.coordinates[1]}&zoom=16&layers=M&marker=${salon.coordinates[0]},${salon.coordinates[1]}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-navy hover:text-gold transition-colors text-sm flex items-center group relative external-map-link"
                          title="Opens in a new window"
                        >
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
                              d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                            />
                          </svg>
                          View Map
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3 w-3 ml-1 opacity-70"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>

                        <Link
                          to={`/salon/${salon.id}`}
                          className="btn-gold py-2 px-4 text-xs"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Additional info when selected */}
                  {selectedSalon?.id === salon.id && (
                    <div className="p-5 pt-0 border-t border-gray-100 mt-2">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-black/50 mb-1">Address</p>
                          <p>{salon.address}</p>
                        </div>
                        <div>
                          <p className="text-black/50 mb-1">Phone</p>
                          <p>{salon.phone}</p>
                        </div>
                        <div>
                          <p className="text-black/50 mb-1">Hours</p>
                          <p>{salon.openHours}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Map Container */}
            <div className="w-full md:w-1/2 bg-white shadow-luxury rounded-sm overflow-hidden h-[600px]">
              {selectedSalon ? (
                <MapView
                  key={selectedSalon.id}
                  coordinates={selectedSalon.coordinates}
                  name={selectedSalon.name}
                  address={selectedSalon.address}
                  phone={selectedSalon.phone}
                />
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-8 text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-300 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                    />
                  </svg>
                  <h3 className="text-xl font-display uppercase tracking-wider mb-2">
                    Select a Salon
                  </h3>
                  <p className="text-black/70">
                    Click on any salon from the list to view its location on the
                    map
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="text-center mt-12">
            <button
              onClick={handleUpdateLocation}
              disabled={isLoadingLocation}
              className={`btn-outline flex items-center mx-auto ${
                isLoadingLocation ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoadingLocation ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-gold"
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
                  Finding Nearby Salons...
                </>
              ) : (
                <>
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
                  Update My Location
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
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
