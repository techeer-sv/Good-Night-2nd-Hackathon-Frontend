import { useState } from 'react';
import DropDownBtn from '../components/DropDownBtn';
import { baseInstance } from '../apis/config';

export default function RegistPage() {
  const [view, setView] = useState(false);
  const [openDate, setOpenDate] = useState('');
  const [finDate, setFinDate] = useState('');
  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const genres = ['스릴러', '로맨스', '코믹', '액션'];

  const registMovie = async () => {
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
    const response = await baseInstance.post('/movies', data);
    if (response.status === 201) console.log('regist fin');
    else console.log('error');
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
      <button onClick={registMovie}>확인</button>
    </>
  );
}
