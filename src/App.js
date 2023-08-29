import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {About} from './About';
import {Profile} from './Profile';
import  SharedLayout  from './SharedLayout';
import  Error  from './Error';
import  Homepage  from './Homepage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Homepage />} />
          <Route path='about' element={<About />} />
          <Route path='profile' element={<Profile />} />
          <Route path='*' element={<Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;