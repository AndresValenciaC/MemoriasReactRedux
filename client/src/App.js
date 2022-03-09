/** @material-ui/core */
import React from "react";
import { Container } from "@material-ui/core";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
} from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import { Home } from "./components/Home/Home";

import Form from "./components/Form/Form";
import Posts from "./components/Posts/Posts";
import Post from "./components/Posts/Post/Post";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <Router>
      <Container maxwidth="lg">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/auth" element={<Auth />}></Route>
          <Route path="/form" element={<Form />}></Route>
          <Route path="/posts" element={<Posts />}></Route>
          <Route path="/post" element={<Post />}></Route>
        </Routes>
      </Container>
    </Router>
  );
};
export default App;
