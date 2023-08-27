import { Route, Routes, useNavigate } from 'react-router-dom';
import RegistPage from './pages/RegistPage';
import IndexPage from './pages/IndexPage';
import ModifyPage from './pages/ModifyPage';
import DetailPage from './pages/DetailPage';

function App() {
  const navigate = useNavigate();
  return (
    <>
      <h2 className='text-blue-500 text-xl font-bold'> movie review</h2>
      <button
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
        <Route path='/detail' element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default App;
