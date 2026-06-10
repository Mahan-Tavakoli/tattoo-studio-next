import getReviewsApi from "@/components/services/reviewService";
import { useQuery } from "@tanstack/react-query";

export default function useReview() {
  const {
    data,
    isLoading: reviewsIsLoading,
    isError: reviewsIsError,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: getReviewsApi,
    placeholderData: (prev) => prev,
    staleTime: 1000 * 60 * 60 * 24 /* 24 hours */
  });

  const reviews = data?.reviews || [];

  return { reviews, reviewsIsLoading, reviewsIsError };
}
