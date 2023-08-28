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
  const [rating, setRating] = useState<number>(1);
  const [content, setContent] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleMinRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinRating(Number(e.target.value));
  };

  async function getReviews() {
    const reviewsUrl = new URL(`${baseURL}/reviews/${movieId}`);
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

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const handleSubmit = async () => {
    const url = `${baseURL}/reviews/${movieId}`;
    const data = {
      rating,
      content,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      getReviews();
    } catch (error) {
      console.error(error);
      alert("리뷰 작성에 실패했습니다.");
    }
  };

  useEffect(() => {
    getReviews();
  }, [minRating]);

  useEffect(() => {
    localStorage.getItem("isAdmin") ? setIsAdmin(true) : setIsAdmin(false);
  }, []);

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
        onChange={handleMinRatingChange}
      />
      {reviews.map((review) => (
        <div className="flex gap-2 mt-2" key={review.id}>
          <div>별점 : {review.rating}</div>
          <div>내용 : {review.content}</div>
        </div>
      ))}
      {isAdmin ? null : (
        <div className="flex flex-col mt-2">
          <input
            className="w-[200px] mt-2"
            type="range"
            id="range"
            name="rating"
            min="1"
            max="5"
            step="0.5"
            value={rating}
            onChange={handleRatingChange}
          />
          {rating}
          <textarea
            className="mx-2 w-[200px] h-[100px] resize-none mt-2"
            name="content"
            placeholder="리뷰내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className="w-[200px] mt-2"
            type="submit"
            onClick={handleSubmit}
          >
            리뷰 작성
          </button>
        </div>
      )}
    </div>
  );
}
