import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

// Mock data for salons
const allSalons = [
  {
    id: "1",
    name: "Glamour Beauty Salon",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    rating: 4.8,
    reviewCount: 124,
    location: "Tunis, Tunisia",
    services: ["Haircut", "Hair Coloring", "Manicure", "Pedicure", "Facial"],
    priceRange: [30, 150],
    category: "Full Service",
    description:
      "Luxury beauty salon offering a wide range of premium services in an elegant setting.",
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
    priceRange: [50, 200],
    category: "Spa",
    description:
      "Premium spa offering relaxing treatments to rejuvenate your body and mind.",
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
    priceRange: [20, 80],
    category: "Nails",
    description:
      "Specialized nail salon offering the latest trends and techniques in nail care.",
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
    priceRange: [40, 180],
    category: "Hair",
    description:
      "Premium hair salon specializing in cutting-edge styles and treatments.",
  },
  {
    id: "5",
    name: "Zen Day Spa",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    rating: 4.5,
    reviewCount: 112,
    location: "Hammamet, Tunisia",
    services: ["Massage", "Facial", "Body Scrub", "Aromatherapy"],
    priceRange: [60, 200],
    category: "Spa",
    description:
      "Tranquil spa offering holistic treatments for complete relaxation and rejuvenation.",
  },
  {
    id: "6",
    name: "Blush Beauty Lounge",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    rating: 4.3,
    reviewCount: 78,
    location: "Monastir, Tunisia",
    services: ["Makeup", "Eyebrow Shaping", "Eyelash Extensions", "Waxing"],
    priceRange: [25, 120],
    category: "Makeup",
    description:
      "Specialized beauty lounge offering professional makeup and beauty services.",
  },
  {
    id: "7",
    name: "Pure Skin Clinic",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    rating: 4.8,
    reviewCount: 143,
    location: "Tunis, Tunisia",
    services: [
      "Facial",
      "Skin Treatment",
      "Microdermabrasion",
      "Chemical Peel",
    ],
    priceRange: [70, 200],
    category: "Skin Care",
    description:
      "Advanced skin care clinic offering professional treatments for all skin types.",
  },
  {
    id: "8",
    name: "Trendy Cuts",
    image:
      "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80",
    rating: 4.2,
    reviewCount: 65,
    location: "Bizerte, Tunisia",
    services: ["Haircut", "Hair Styling", "Hair Coloring", "Beard Trim"],
    priceRange: [20, 100],
    category: "Hair",
    description:
      "Modern hair salon offering trendy cuts and styles for men and women.",
  },
];

// Available service categories
const serviceCategories = [
  "All",
  "Hair",
  "Nails",
  "Makeup",
  "Spa",
  "Skin Care",
];

const LuxurySalons = () => {
  const [searchParams] = useSearchParams();
  const [filteredSalons, setFilteredSalons] = useState(allSalons);
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortOption, setSortOption] = useState("recommended");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleSalons, setVisibleSalons] = useState(4);
  const [isLoading, setIsLoading] = useState(false);

  // Get search parameters
  const searchTerm = searchParams.get("search") || "";
  const locationTerm = searchParams.get("location") || "";

  useEffect(() => {
    // Initialize search query from URL parameters
    if (searchTerm) {
      setSearchQuery(searchTerm);
    }

    // Filter salons based on search parameters and active category
    filterSalons();
  }, [searchTerm, locationTerm, activeCategory, sortOption]);

  const filterSalons = () => {
    let result = allSalons;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (salon) =>
          salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          salon.services.some((service) =>
            service.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
    }

    // Filter by location
    if (locationTerm) {
      result = result.filter((salon) =>
        salon.location.toLowerCase().includes(locationTerm.toLowerCase())
      );
    }

    // Filter by category
    if (activeCategory !== "All") {
      result = result.filter((salon) => salon.category === activeCategory);
    }

    // Sort results
    switch (sortOption) {
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        result = [...result].sort((a, b) => a.priceRange[0] - b.priceRange[0]);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.priceRange[1] - a.priceRange[1]);
        break;
      default:
        // 'recommended' - no additional sorting
        break;
    }

    setFilteredSalons(result);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would update the URL with the search parameters
    filterSalons();
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    // Reset visible salons when changing category
    setVisibleSalons(4);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const loadMoreSalons = () => {
    setIsLoading(true);

    // Simulate loading delay
    setTimeout(() => {
      setVisibleSalons((prev) => Math.min(prev + 4, filteredSalons.length));
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img
            src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80"
            alt="Aneeq Salons"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 h-full flex items-center">
          <div className="container-custom">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-luxury text-white mb-6">
                Aneeq Salons
              </h1>
              <div className="w-16 h-px bg-gold mb-6"></div>
              <p className="text-xl text-white/80 mb-8">
                Discover and book appointments at the finest beauty salons in
                Tunisia
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Search Bar */}
            <div className="md:w-2/3">
              <form
                onSubmit={handleSearch}
                className={`relative transition-all duration-500 ${
                  isSearchFocused ? "scale-[1.02]" : ""
                }`}
              >
                <input
                  type="text"
                  placeholder="Search for salons, services, or locations..."
                  className="w-full py-4 px-6 bg-white border-b border-black/10 text-black placeholder-black/40 outline-none focus:border-gold transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                />
                <button
                  type="submit"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-black hover:text-gold transition-colors"
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

            {/* Sort Options */}
            <div className="md:w-1/3">
              <div className="flex items-center h-full">
                <span className="text-sm text-black/60 mr-3 whitespace-nowrap">
                  Sort by:
                </span>
                <select
                  value={sortOption}
                  onChange={handleSortChange}
                  className="w-full py-4 px-4 bg-white border-b border-black/10 text-black outline-none focus:border-gold transition-all appearance-none cursor-pointer"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <div className="relative right-8 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-black/60"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 border-b border-black/10">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4">
            {serviceCategories.map((category) => (
              <button
                key={category}
                className={`px-6 py-2 text-sm uppercase tracking-wider transition-colors ${
                  activeCategory === category
                    ? "bg-black text-white"
                    : "bg-transparent text-black hover:bg-black/5"
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Salons Listing */}
      <section className="py-16">
        <div className="container-custom">
          {filteredSalons.length > 0 ? (
            <>
              <div className="mb-8">
                <p className="text-black/60">
                  Showing {Math.min(visibleSalons, filteredSalons.length)} of{" "}
                  {filteredSalons.length} salons
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {filteredSalons.slice(0, visibleSalons).map((salon) => (
                  <Link
                    key={salon.id}
                    to={`/salon/${salon.id}`}
                    className="group block"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={salon.image}
                        alt={salon.name}
                        className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-black/70 text-white text-xs uppercase tracking-wider">
                          {salon.category}
                        </span>
                      </div>
                    </div>
                    <div className="pt-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-xl font-display uppercase tracking-wider">
                          {salon.name}
                        </h3>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 text-gold mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="text-sm">{salon.rating}</span>
                          <span className="text-sm text-black/60 ml-1">
                            ({salon.reviewCount})
                          </span>
                        </div>
                      </div>
                      <p className="text-black/60 flex items-center mb-3">
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
                      <p className="text-black/80 mb-4">{salon.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {salon.services.slice(0, 3).map((service, index) => (
                          <span
                            key={index}
                            className="inline-block px-3 py-1 bg-gray-100 text-black/70 text-xs"
                          >
                            {service}
                          </span>
                        ))}
                        {salon.services.length > 3 && (
                          <span className="inline-block px-3 py-1 bg-gray-100 text-black/70 text-xs">
                            +{salon.services.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {visibleSalons < filteredSalons.length && (
                <div className="mt-12 text-center">
                  <button
                    onClick={loadMoreSalons}
                    className="btn-outline flex items-center mx-auto"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
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
                        Loading...
                      </>
                    ) : (
                      "Load More"
                    )}
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-16 text-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-black/20 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-display uppercase tracking-wider mb-2">
                No salons found
              </h3>
              <p className="text-black/60 mb-8 max-w-md mx-auto">
                We couldn't find any salons matching your search criteria.
                Please try different filters or search terms.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All");
                  setSearchQuery("");
                  filterSalons();
                }}
                className="btn-outline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LuxurySalons;
