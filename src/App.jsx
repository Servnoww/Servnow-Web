import { Route, Routes } from "react-router";
import SignUpPage from "./pages/signup/SignUpPage";

function App() {
  return (
    <Routes>
      <Route path="/" />
      <Route path="/signup" element={<SignUpPage />} />
    </Routes>
  );
}

export default App;
