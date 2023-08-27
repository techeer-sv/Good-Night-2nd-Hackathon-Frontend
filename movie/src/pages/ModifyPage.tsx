import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { baseInstance } from '../apis/config';
import DropDownBtn from '../components/DropDownBtn';

export default function ModifyPage() {
  const { state } = useLocation();
  const { movie } = state;
  const [view, setView] = useState(false);
  const initialOpenDate = movie.releasedAt.split('T')[0];
  const initialFinDate = movie.endAt.split('T')[0];
  const [openDate, setOpenDate] = useState(initialOpenDate);
  const [finDate, setFinDate] = useState(initialFinDate);
  const [title, setTitle] = useState(movie.title);
  const [genre, setGenre] = useState('');
  const genres = ['스릴러', '로맨스', '코믹', '액션'];
  const navigate = useNavigate();

  const modifyMovie = async () => {
    if (!genre || !openDate || !finDate || !title) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    const formatOpenDate = new Date(openDate).toISOString(); // Convert to ISO 8601 format
    const formatFinDate = new Date(finDate).toISOString();
    const data = {
      endAt: formatFinDate,
      genre: genre,
      releasedAt: formatOpenDate,
      title: title,
    };
    const response = await baseInstance.put(`/movies/${movie.id}`, data);
    if (response.status === 200) {
      console.log('modify fin');
      navigate('/');
    } else console.log('error');
  };

  console.log(genre + openDate + finDate + title);
  return (
    <>
      <div>
        <label
          onClick={() => {
            setView(!view);
          }}
        >
          <button>장르 {view ? '▲' : '▼'}</button>
        </label>
        {view && <DropDownBtn items={genres} setting={setGenre} />}
      </div>
      <div>개봉일</div>
      <input
        type='date'
        value={openDate}
        onChange={(e) => setOpenDate(e.target.value)}
      />
      <div>상영 종료일</div>
      <input
        type='date'
        value={finDate}
        onChange={(e) => setFinDate(e.target.value)}
      />
      <div>제목</div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={modifyMovie}>확인</button>
    </>
  );
}
