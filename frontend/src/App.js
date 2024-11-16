import React, { useState } from "react";
import SignUp from "./pages/signup";
import Login from "./pages/login";

function App() {
  const [currentPage, setCurrentPage] = useState("signup");

  return (
    <div>
      {currentPage === "signup" ? (
        <SignUp switchToLogin={() => setCurrentPage("login")} />
      ) : (
        <Login switchToSignup={() => setCurrentPage("signup")} />
      )}
    </div>
  );
}

export default App;
