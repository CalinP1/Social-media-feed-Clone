import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {Profile} from './Profile';
import  SharedLayout  from './SharedLayout';
import  Error  from './Error';
import  Homepage  from './Homepage';

function App() {
  return (
    <BrowserRouter basename='/Social-media-feed-Clone'>
      <Routes>
        <Route path='/' element={<SharedLayout />}>
          <Route index element={<Homepage />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;