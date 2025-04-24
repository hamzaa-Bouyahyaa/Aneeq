import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import SalonCard from "../components/SalonCard";
import FilterSidebar from "../components/FilterSidebar";

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
  },
];

const Salons = () => {
  const [searchParams] = useSearchParams();
  const [filteredSalons, setFilteredSalons] = useState(allSalons);
  const [activeFilters, setActiveFilters] = useState({
    services: [],
    rating: 0,
    price: [0, 200],
  });

  // Get search parameters
  const searchTerm = searchParams.get("search") || "";
  const locationTerm = searchParams.get("location") || "";

  useEffect(() => {
    // Filter salons based on search parameters and active filters
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

    // Filter by services
    if (activeFilters.services.length > 0) {
      result = result.filter((salon) =>
        activeFilters.services.some((service) =>
          salon.services.includes(service)
        )
      );
    }

    // Filter by rating
    if (activeFilters.rating > 0) {
      result = result.filter((salon) => salon.rating >= activeFilters.rating);
    }

    // Filter by price range
    result = result.filter(
      (salon) =>
        salon.priceRange[0] <= activeFilters.price[1] &&
        salon.priceRange[1] >= activeFilters.price[0]
    );

    setFilteredSalons(result);
  }, [searchTerm, locationTerm, activeFilters]);

  const handleFilterChange = (filters: any) => {
    setActiveFilters(filters);
  };

  return (
    <div className="bg-lightGray pt-24 pb-12">
      <div className="container-custom">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar />
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="md:w-1/4">
            <FilterSidebar onFilterChange={handleFilterChange} />
          </div>

          {/* Salon Listings */}
          <div className="md:w-3/4">
            <div className="bg-white rounded-xl shadow-card p-6 mb-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-navy">
                  {filteredSalons.length}{" "}
                  {filteredSalons.length === 1 ? "Salon" : "Salons"} Found
                </h2>
                <div className="flex items-center">
                  <span className="text-sm text-navy/70 mr-2">Sort by:</span>
                  <select className="border border-lightGray rounded-lg text-sm p-2 focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none">
                    <option value="recommended">Recommended</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {filteredSalons.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSalons.map((salon) => (
                  <SalonCard key={salon.id} {...salon} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-card p-8 text-center">
                <div className="w-20 h-20 bg-lightGray rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-navy/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-navy">
                  No salons found
                </h3>
                <p className="text-navy/70 mb-6">
                  We couldn't find any salons matching your search criteria.
                </p>
                <button
                  onClick={() => {
                    setActiveFilters({
                      services: [],
                      rating: 0,
                      price: [0, 200],
                    });
                  }}
                  className="btn-primary"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salons;
