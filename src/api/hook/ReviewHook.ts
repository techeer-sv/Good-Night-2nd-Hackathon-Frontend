import { useMutation, useQuery } from "react-query";
import { ReviewService } from "../service/ReviewService";

export const useAddReview = (
  comment: string,
  movieId: number,
  score: number,
  onSuccess: () => void
) => {
  return useMutation({
    mutationFn: () => ReviewService.addReview(comment, movieId, score),
    onSuccess: onSuccess,
    onError: () => alert("리뷰 등록에 실패했습니다."),
  });
};

export const useFindAllReviews = (movieId: number, scoreCap?: string) => {
  return useQuery({
    queryKey: ["reviews", movieId, scoreCap],
    queryFn: () => ReviewService.getAllReviews(movieId.toString(), scoreCap),
  });
};
