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
    const response = await baseInstance.get('/reviews', {
      params: { movieId: id },
    });
    console.log(response.data);
    setReviews(response.data);
  };

  useEffect(() => {
    getMovies();
    getReviews();
  }, [reviews]);

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

  const isAdmin = localStorage.getItem('admin') === 'true';

  return (
    <div className='p-6'>
      {movie ? (
        <div className={`mb-4 ${isAdmin ? 'text-white' : ''}`}>
          <div className='font-bold text-lg mb-2'>제목: {movie.title}</div>
          <div className='text-gray-600'>장르: {movie.genre}</div>
          <div className='text-gray-600'>
            {movie.isShowing ? '상영중' : '상영 종료'}
          </div>
          <div className='text-gray-600'>
            개봉일: {new Date(movie.releasedAt).toLocaleDateString()}
          </div>
          <div className='text-gray-600'>
            상영 종료일: {new Date(movie.endAt).toLocaleDateString()}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}

      {isAdmin ? null : (
        <div>
          <div className='mb-4'>----리뷰 작성----</div>
          <div className='flex items-center mb-4'>
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className='cursor-pointer'
                onMouseEnter={() => handleStarHover(value)}
              >
                {rating >= value ? (
                  <StarIcon className='text-yellow-500' />
                ) : (
                  <StarBorderIcon className='text-yellow-500' />
                )}
              </span>
            ))}
            <p className='text-gray-600 ml-2'>선택한 별점: {rating}</p>
          </div>
          <input
            className='border p-1 mb-2'
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            onClick={registReview}
          >
            확인
          </button>
        </div>
      )}

      <div className={`mt-4 ${isAdmin ? 'text-white' : ''}`}>
        ----리뷰 목록----
      </div>

      {reviews === null ? (
        <div className={`my-4 ${isAdmin ? 'text-white' : ''}`}>
          리뷰가 없어요..
        </div>
      ) : (
        reviews.map((item, index) => (
          <div
            key={index}
            className={`border p-4 mt-2 ${isAdmin ? 'bg-white' : ''}`}
          >
            <div className='font-bold mb-1'>{item.score}</div>
            <div className='text-gray-600 mb-1'>{item.comment}</div>
            <div className='text-gray-600'>
              {new Date(item.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
}
