import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseInstance } from '../apis/config';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

type Movie = {
  id: number;
  title: string;
  genre: string;
  isShowing: boolean;
  releasedAt: string;
  endAt: string;
  createdAt: string;
  updatedAt: string;
};

type Review = {
  id: number;
  movieId: number;
  score: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

export default function DetailPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [rating, setRating] = useState<number>(0);
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);

  const getMovies = async () => {
    const response = await baseInstance.get(`/movies/${id}`);
    console.log(response.data);
    setMovie(response.data);
  };

  const getReviews = async () => {
    const response = await baseInstance.get('/reviews');
    console.log(response.data);
    setReviews(response.data);
  };

  useEffect(() => {
    getMovies();
    getReviews();
  }, []);

  const handleStarHover = (value: number) => {
    setRating(value); // 마우스를 올린 위치까지 별점 증가
  };

  const registReview = async () => {
    const data = {
      comment: review,
      movieId: Number(id),
      score: rating,
    };
    const response = await baseInstance.post('/reviews', data);
    if (response.status === 201) {
      console.log('review fin');
      // Update the reviews state with the new review
      setReviews([...reviews, response.data]);
    }
  };

  console.log(review);
  console.log(rating);

  return (
    <>
      {movie ? (
        <>
          <div>제목: {movie.title}</div>
          <div>장르: {movie.genre}</div>
          <div>{movie.isShowing ? '상영중' : '상영 종료'}</div>
          <div>개봉일: {new Date(movie.releasedAt).toLocaleDateString()}</div>
          <div>상영 종료일: {new Date(movie.endAt).toLocaleDateString()}</div>
        </>
      ) : (
        <div>Loading...</div>
      )}
      <div>----리뷰 작성----</div>
      <div>
        {[1, 2, 3, 4, 5].map((value) => (
          <span
            key={value}
            onMouseEnter={() => handleStarHover(value)}
            style={{ cursor: 'pointer' }}
          >
            {rating >= value ? (
              <StarIcon color='primary' />
            ) : (
              <StarBorderIcon color='primary' />
            )}
          </span>
        ))}
        <p>선택한 별점: {rating}</p>
      </div>
      <input value={review} onChange={(e) => setReview(e.target.value)} />
      <button onClick={registReview}>확인</button>
      <div>----리뷰 목록----</div>

      {reviews.map((item, index) => (
        <div key={index}>
          <div>{item.score}</div>
          <div>{item.comment}</div>
          <div>{new Date(item.createdAt).toISOString().split('T')[0]}</div>
        </div>
      ))}
    </>
  );
}
