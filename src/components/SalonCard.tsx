import { Link } from 'react-router-dom';

interface SalonCardProps {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  location: string;
  services: string[];
}

const SalonCard = ({ id, name, image, rating, reviewCount, location, services }: SalonCardProps) => {
  return (
    <Link to={`/salon/${id}`} className="card group transition-transform hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
              />
            </svg>
            <span className="ml-1 text-gray-700">{rating}</span>
            <span className="ml-1 text-gray-500">({reviewCount})</span>
          </div>
        </div>
        <p className="mt-2 text-gray-500 flex items-center">
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
          {location}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {services.slice(0, 3).map((service, index) => (
            <span
              key={index}
              className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full"
            >
              {service}
            </span>
          ))}
          {services.length > 3 && (
            <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
              +{services.length - 3} more
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default SalonCard;
