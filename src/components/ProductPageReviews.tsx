import { StarIcon } from "@heroicons/react/20/solid";
import { clsx } from "clsx";

interface ProductPageReviewsProps {
  score: number;
  reviewsCount: number;
}

export function ProductPageReviews({
  score,
  reviewsCount,
}: ProductPageReviewsProps) {
  return (
    <div className="flex items-center">
      <p className="text-sm text-gray-700">
        {score}
        <span className="sr-only"> out of 5 stars</span>
      </p>
      <div className="ml-1 flex items-center">
        {[0, 1, 2, 3, 4].map((rating) => (
          <StarIcon
            key={rating}
            className={clsx(
              score > rating ? "text-yellow-400" : "text-gray-200",
              "h-5 w-5 flex-shrink-0"
            )}
            aria-hidden="true"
          />
        ))}
      </div>
      <div aria-hidden="true" className="ml-4 text-sm text-gray-300">
        ·
      </div>
      <div className="ml-4 flex">
        <a
          href="#"
          className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
        >
          See all {reviewsCount} reviews
        </a>
      </div>
    </div>
  );
}
