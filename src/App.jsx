import { Route, Routes } from "react-router";
import LoginPage from './pages/LoginPage'
function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
