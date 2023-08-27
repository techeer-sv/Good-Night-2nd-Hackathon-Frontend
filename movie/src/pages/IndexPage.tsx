import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { baseInstance } from '../apis/config';
import DropDownBtn from '../components/DropDownBtn';

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

export default function IndexPage() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [view1, setView1] = useState(false);
  const [view2, setView2] = useState(false);
  const [genre, setGenre] = useState('');
  const [showing, setShowing] = useState('');
  const genres = ['스릴러', '로맨스', '코믹', '액션'];
  const isShowing = ['상영중', '상영 종료'];

  const getMovies = async () => {
    let isShowingParam;

    if (showing === '상영중') {
      isShowingParam = 1;
    } else if (showing === '상영 종료') {
      isShowingParam = 0;
    }

    const response = await baseInstance.get<Movie[]>('/movies', {
      params: { genre, isShowing: isShowingParam },
    });

    setMovies(response.data);
  };

  const deleteMovie = async (movieId: number) => {
    try {
      const response = await baseInstance.delete(`/movies/${movieId}`);
      if (response.status === 204) {
        setMovies([...movies.filter((item) => item.id !== movieId)]);
      }
    } catch (error) {
      console.error('영화 삭제 중 오류 발생:', error);
    }
  };

  useEffect(() => {
    getMovies();
  }, [genre, showing]);

  const isAdmin = localStorage.getItem('admin') === 'true';

  return (
    <div className='p-6'>
      {isAdmin && (
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => {
            navigate('/regist');
          }}
        >
          영화 등록하러 가기
        </button>
      )}

      <div className='mt-4'>
        <label
          className='cursor-pointer'
          onClick={() => {
            setView1(!view1);
          }}
        >
          <button className={`border p-1 ${isAdmin ? 'text-white' : ''}`}>
            장르 {view1 ? '▲' : '▼'}
          </button>
        </label>
        {view1 && <DropDownBtn items={genres} setting={setGenre} />}
      </div>

      <div className='mt-4'>
        <label
          className='cursor-pointer'
          onClick={() => {
            setView2(!view2);
          }}
        >
          <button className={`border p-1 ${isAdmin ? 'text-white' : ''}`}>
            상영 정보 {view2 ? '▲' : '▼'}
          </button>
        </label>
        {view2 && <DropDownBtn items={isShowing} setting={setShowing} />}
      </div>

      {movies === null ? (
        <div className='my-4'>영화가 없어요..</div>
      ) : (
        movies.map((item, index) => (
          <>
            <div
              key={index}
              className={`my-4 p-4 border rounded cursor-pointer hover:bg-gray-300 ${
                isAdmin ? 'text-white' : ''
              }`}
              onClick={() => {
                navigate(`/detail/${item.id}`);
              }}
            >
              <p className={`text-lg font-bold ${isAdmin ? 'text-white' : ''}`}>
                {item.title}
              </p>
              <p
                className={`text-sm text-gray-500 ${
                  isAdmin ? 'text-white' : ''
                }`}
              >
                {item.genre}
              </p>
              <p className={`text-sm ${isAdmin ? 'text-white' : ''}`}>
                {item.isShowing ? '상영중' : '상영 종료'}
              </p>
              <p className={`text-sm ${isAdmin ? 'text-white' : ''}`}>
                개봉일: {new Date(item.releasedAt).toLocaleDateString()}
              </p>
              <p className={`text-sm ${isAdmin ? 'text-white' : ''}`}>
                상영 종료일: {new Date(item.endAt).toLocaleDateString()}
              </p>
            </div>
            <div className='my-2'>
              {isAdmin && (
                <>
                  <button
                    className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 mr-2 rounded'
                    onClick={() => {
                      navigate('/modify', { state: { movie: item } });
                    }}
                  >
                    수정하기
                  </button>
                  <button
                    className='bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded'
                    onClick={() => {
                      deleteMovie(item.id);
                    }}
                  >
                    삭제하기
                  </button>
                </>
              )}
            </div>
          </>
        ))
      )}
    </div>
  );
}
