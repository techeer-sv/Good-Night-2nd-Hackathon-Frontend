"use client";

import { useState } from "react";

type ReviewSubmitProps = {
  movieId: number;
};

export default function ReviewSubmit({ movieId }: ReviewSubmitProps) {
  const [rating, setRating] = useState<number>(1);
  const [content, setContent] = useState<string>("");

  const handleRatingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };

  const handleSubmit = async () => {
    const url = `http://localhost:8000/reviews/${movieId}`;
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
    } catch (error) {
      console.error(error);
      alert("리뷰 작성에 실패했습니다.");
    }
  };

  return (
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
      <button className="w-[200px] mt-2" type="submit" onClick={handleSubmit}>
        리뷰 작성
      </button>
    </div>
  );
}
