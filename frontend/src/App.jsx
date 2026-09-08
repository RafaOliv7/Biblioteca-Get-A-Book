import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Navbar from "./components/Layouts/Navbar";
import Footer from "./components/Layouts/Footer";
import Container from "./components/Layouts/Container";
import Message from "./components/Layouts/Message";

// pages
import Login from "./components/pages/Auth/Login";
import Register from "./components/pages/Auth/Register";
import Home from "./components/pages/Home";
import Profile from "./components/pages/User/Profile";
import AddBook from "./components/pages/Book/AddBook";
import MyBooks from "./components/pages/Book/MyBooks";
// EditBook, BookDetails e MyAdoptions entram nas próximas funcionalidades

import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Container>
          <Message />
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/user/profile" element={<Profile />}></Route>
            <Route path="/book/add" element={<AddBook />}></Route>
            <Route path="/book/mybooks" element={<MyBooks />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
