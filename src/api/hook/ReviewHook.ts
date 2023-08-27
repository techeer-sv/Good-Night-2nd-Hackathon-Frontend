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
    // onError: () => alert("리뷰 등록에 실패했습니다."),
  });
};

export const useFindAllReviews = (movieId: string, scoreCap?: string) => {
  return useQuery({
    queryFn: () => ReviewService.getAllReviews(movieId, scoreCap),
  });
};
