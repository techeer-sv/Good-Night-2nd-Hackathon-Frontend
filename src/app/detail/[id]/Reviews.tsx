"use client";

import { useEffect, useState } from "react";

type ReviewProps = {
  movieId: number;
};

type Review = {
  id: number;
  rating: number;
  content: string;
  createdAt: string;
  movie: {
    id: number;
    title: string;
    genre: string;
    releaseDate: string;
    endDate: string;
    isShowing: boolean;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
  };
};

export default function Reviews({ movieId }: ReviewProps) {
  const [minRating, setMinRating] = useState<number>(1);
  const [reviews, setReviews] = useState<Review[]>([]);

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinRating(Number(e.target.value));
  };

  async function getReviews() {
    const reviewsUrl = new URL(`http://localhost:8000/reviews/${movieId}`);
    const reviewsParams = new URLSearchParams();
    reviewsParams.append("minRating", minRating.toString());

    try {
      reviewsUrl.search = reviewsParams.toString();
      const reviewsRes = await fetch(reviewsUrl.toString());
      if (!reviewsRes.ok) {
        throw new Error(`HTTP error! Status: ${reviewsRes.status}`);
      }
      const reviewsJson = await reviewsRes.json();
      console.log(reviewsJson);
      setReviews(reviewsJson);
    } catch (error) {
      console.error(error);
      alert("리뷰 조회에 실패했습니다.");
    }
  }

  useEffect(() => {
    getReviews();
  }, [minRating]);

  return (
    <div>
      <input
        className="w-[200px] mt-2"
        type="range"
        id="range"
        name="rating"
        min="1"
        max="5"
        step="0.5"
        value={minRating}
        onChange={handleRatingChange}
      />
      {reviews.map((review) => (
        <div className="flex gap-2 mt-2" key={review.id}>
          <div>별점 : {review.rating}</div>
          <div>내용 : {review.content}</div>
        </div>
      ))}
    </div>
  );
}
