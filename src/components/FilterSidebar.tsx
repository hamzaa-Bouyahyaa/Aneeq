import { useState } from "react";

interface FilterSidebarProps {
  onFilterChange: (filters: any) => void;
}

const FilterSidebar = ({ onFilterChange }: FilterSidebarProps) => {
  const [filters, setFilters] = useState({
    services: [],
    rating: 0,
    price: [0, 200],
  });

  const services = [
    "Haircut",
    "Hair Coloring",
    "Manicure",
    "Pedicure",
    "Facial",
    "Massage",
    "Makeup",
    "Waxing",
  ];

  const handleServiceChange = (service: string) => {
    const updatedServices = filters.services.includes(service)
      ? filters.services.filter((s) => s !== service)
      : [...filters.services, service];

    const updatedFilters = {
      ...filters,
      services: updatedServices,
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleRatingChange = (rating: number) => {
    const updatedFilters = {
      ...filters,
      rating,
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handlePriceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = parseInt(e.target.value);
    const updatedPrice = [...filters.price];
    updatedPrice[index] = value;

    const updatedFilters = {
      ...filters,
      price: updatedPrice,
    };

    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className="bg-white rounded-xl shadow-card p-6">
      <h3 className="text-lg font-semibold mb-6 text-navy">Filters</h3>

      {/* Services */}
      <div className="mb-8">
        <h4 className="font-medium mb-3 text-navy">Services</h4>
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service} className="flex items-center">
              <input
                id={`service-${service}`}
                type="checkbox"
                checked={filters.services.includes(service)}
                onChange={() => handleServiceChange(service)}
                className="h-4 w-4 text-gold border-lightGray rounded focus:ring-gold/30"
              />
              <label
                htmlFor={`service-${service}`}
                className="ml-2 text-sm text-navy"
              >
                {service}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-8">
        <h4 className="font-medium mb-3 text-navy">Rating</h4>
        <div className="space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center">
              <input
                id={`rating-${rating}`}
                type="radio"
                name="rating"
                checked={filters.rating === rating}
                onChange={() => handleRatingChange(rating)}
                className="h-4 w-4 text-gold border-lightGray focus:ring-gold/30"
              />
              <label
                htmlFor={`rating-${rating}`}
                className="ml-2 text-sm text-navy flex items-center"
              >
                {Array.from({ length: rating }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gold"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-lightGray"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1">& up</span>
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-medium mb-3 text-navy">Price Range</h4>
        <div className="flex items-center space-x-4 mb-3">
          <div className="flex-1">
            <label htmlFor="min-price" className="block text-sm text-navy mb-1">
              Min (TND)
            </label>
            <input
              type="number"
              id="min-price"
              min="0"
              max={filters.price[1]}
              value={filters.price[0]}
              onChange={(e) => handlePriceChange(e, 0)}
              className="w-full border border-lightGray rounded-lg px-3 py-2 text-sm focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="max-price" className="block text-sm text-navy mb-1">
              Max (TND)
            </label>
            <input
              type="number"
              id="max-price"
              min={filters.price[0]}
              value={filters.price[1]}
              onChange={(e) => handlePriceChange(e, 1)}
              className="w-full border border-lightGray rounded-lg px-3 py-2 text-sm focus:border-gold focus:ring-1 focus:ring-gold/30 outline-none"
            />
          </div>
        </div>
        <div className="relative pt-1">
          <div className="flex items-center justify-between">
            <span className="text-xs text-navy/60">{filters.price[0]} TND</span>
            <span className="text-xs text-navy/60">{filters.price[1]} TND</span>
          </div>
        </div>
      </div>

      {/* Reset Filters */}
      <button
        onClick={() => {
          const resetFilters = {
            services: [],
            rating: 0,
            price: [0, 200],
          };
          setFilters(resetFilters);
          onFilterChange(resetFilters);
        }}
        className="mt-8 w-full py-2.5 text-sm text-gold hover:text-gold-dark font-medium border border-gold rounded-lg hover:bg-gold/5 transition-colors"
      >
        Reset Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
