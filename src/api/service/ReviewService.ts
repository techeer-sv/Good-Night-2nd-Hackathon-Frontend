import { api } from "../api";

export class ReviewService {
  public static addReview = async (
    comment: string,
    movieId: number,
    score: number
  ): Promise<void> => {
    await api.post("/reviews", {
      comment,
      movieId,
      score,
    });
  };

  public static getAllReviews = async (movieId: string, scoreCap?: string) => {
    return api.get(
      `/reviews?movieId=${movieId}` + (scoreCap ? `&scoreCap=${scoreCap}` : "")
    );
  };
}
