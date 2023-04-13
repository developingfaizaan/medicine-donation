import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider from "./context/auth";
import TranslateProvider from "./context/translate";
import { HomePage, CreatePage, PostPage, ProfilePage, Signup, Login } from "./pages";
import { Navbar, ProtectedRoute, RoleRoute } from "./components";

const App = () => {

  return (
    <BrowserRouter>
      <AuthProvider>
        <TranslateProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/create" element={<ProtectedRoute><CreatePage /></ProtectedRoute>}/>
            <Route path="/job/:id" element={<PostPage />} />
            <Route path="/user/:id" element={<ProfilePage />} />
            {/* AUTH */}
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </TranslateProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
