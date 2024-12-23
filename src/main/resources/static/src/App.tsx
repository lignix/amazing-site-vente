import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignupPage from "./pages/SignUpPage";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />{" "}
        {/* Redirect to signup page */}
      </Routes>
    </Router>
  );
};

export default App;
