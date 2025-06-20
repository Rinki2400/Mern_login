import './App.css';
import PageNotFound from './component/PagenotFound';
import Password from './component/Password';
import Profile from './component/Profile';
import Recover from './component/Recover';
import Registered from './component/Registered';
import Reset from './component/Reset';
import Username from './component/Username';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/** Auth middleware */
import { AuthoriceUser, ProtectRoute } from './middleware/auth';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Username />} />
        <Route path="/password" element={ <ProtectRoute><Password /></ProtectRoute>} />
        <Route path="/register" element={<Registered />} />
        <Route path="/recover" element={<Recover />} />
        <Route path="/reset" element={<Reset />} />

        {/* Protected Route */}
        <Route path="/profile" element={
          <AuthoriceUser>
            <Profile />
          </AuthoriceUser>
        } />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;