import { useState } from 'react';
import DropDownBtn from '../components/DropDownBtn';
import { baseInstance } from '../apis/config';
import { useNavigate } from 'react-router-dom';

export default function RegistPage() {
  const [view, setView] = useState(false);
  const [openDate, setOpenDate] = useState('');
  const [finDate, setFinDate] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const genres = ['스릴러', '로맨스', '코믹', '액션'];
  const navigate = useNavigate();

  const registMovie = async () => {
    if (!genre || !openDate || !finDate || !title) {
      alert('모든 필드를 입력해주세요.');
      return;
    }
    const formatOpenDate = new Date(openDate).toISOString();
    const formatFinDate = new Date(finDate).toISOString();
    const data = {
      endAt: formatFinDate,
      genre: genre,
      releasedAt: formatOpenDate,
      title: title,
    };
    const response = await baseInstance.post('/movies', data);
    if (response.status === 201) {
      navigate('/');
    } else console.log('error');
  };

  return (
    <div className='p-6'>
      <div className='mb-4'>
        <label
          className='cursor-pointer'
          onClick={() => {
            setView(!view);
          }}
        >
          <button className='border p-1 text-white'>
            장르 {view ? '▲' : '▼'}
          </button>
        </label>
        {view && <DropDownBtn items={genres} setting={setGenre} />}
      </div>
      <div className='mb-2 text-white'>개봉일</div>
      <input
        type='date'
        className='border p-1'
        value={openDate}
        onChange={(e) => setOpenDate(e.target.value)}
      />
      <div className='mb-2 text-white'>상영 종료일</div>
      <input
        type='date'
        className='border p-1'
        value={finDate}
        onChange={(e) => setFinDate(e.target.value)}
      />
      <div className='mb-2 text-white'>제목</div>
      <input
        className='border p-1'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'
        onClick={registMovie}
      >
        확인
      </button>
    </div>
  );
}
