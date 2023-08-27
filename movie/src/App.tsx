import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import RegistPage from './pages/RegistPage';
import IndexPage from './pages/IndexPage';
import ModifyPage from './pages/ModifyPage';
import DetailPage from './pages/DetailPage';

function App() {
  const navigate = useNavigate();
  const [isAdminBackground, setIsAdminBackground] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleBackgroundMode = () => {
    setIsAdminBackground(!isAdminBackground);
  };

  const toggleAdminStatus = () => {
    setIsAdmin(!isAdmin); // 관리자 상태 토글
    localStorage.setItem('admin', `${!isAdmin}`);
  };

  const backgroundButtonLabel = isAdminBackground
    ? '사용자 모드 전환'
    : '관리자 모드 전환';

  const buttonStyles = {
    backgroundColor: isAdminBackground ? 'black' : 'blue',
    color: 'white',
    fontWeight: 'bold',
    padding: '0.5rem 1rem',
    borderRadius: '0.25rem',
    cursor: 'pointer',
    marginBottom: '1rem',
  };

  return (
    <div className={`p-6 ${isAdminBackground ? 'bg-black' : ''}`}>
      <div className='flex justify-between items-center'>
        <h1 className='text-blue-600 text-6xl font-bold mb-4'>Movie Review</h1>
        <button
          style={buttonStyles}
          onClick={() => {
            toggleBackgroundMode();
            toggleAdminStatus();
          }}
        >
          {backgroundButtonLabel}
        </button>
      </div>

      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4'
        onClick={() => {
          navigate('/');
        }}
      >
        홈으로
      </button>

      <Routes>
        <Route path='/' element={<IndexPage />} />
        <Route path='/regist' element={<RegistPage />} />
        <Route path='/modify' element={<ModifyPage />} />
        <Route path='/detail/:id' element={<DetailPage />} />
      </Routes>
    </div>
  );
}

export default App;
