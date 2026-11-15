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
import MyBooks from "./components/pages/Book/MyBooks";
import AddBook from "./components/pages/Book/AddBook";
import EditBook from "./components/pages/Book/EditBook";
import BookDetails from "./components/pages/Book/BookDetails";
import MyAdoptions from "./components/pages/Book/MyAdoptions";

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
            <Route path="/book/mybooks" element={<MyBooks />}></Route>
            <Route path="/book/add" element={<AddBook />}></Route>
            <Route path="/book/edit/:id" element={<EditBook />}></Route>
            <Route path="/book/MyAdoptions" element={<MyAdoptions />}></Route>
            <Route path="/book/:id" element={<BookDetails />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </Container>
        <Footer />
      </UserProvider>
    </Router>
  );
}

export default App;
