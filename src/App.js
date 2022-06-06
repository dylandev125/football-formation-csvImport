import { Routes, Route } from 'react-router-dom';
import HomePage from './Page/Homepage';
import Roster from './Page/roster';
import Formation from './Page/formation';

function App() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/roster' element={<Roster />} />
      <Route path='/formation' element={<Formation />} />
    </Routes>
  );
}

export default App;
