import './App.css';
import PageNotFound from './component/PagenotFound';
import Password from './component/Password';
import Profile from './component/Profile';
import Recover from './component/Recover';
import Registered from './component/Registered';
import Reset from './component/Reset';
import Username from './component/Username';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Username />} />
        <Route path="/password" element={<Password />} />
        <Route path="/register" element={<Registered />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/recover" element={<Recover />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
