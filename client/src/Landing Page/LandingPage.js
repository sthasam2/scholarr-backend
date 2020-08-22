import React from "react";
import Nav from "./Nav";
import { motion, AnimatePresence } from "framer-motion";
import Login from "./Auth/Login";
import LandingHome from "./LandingHome";
import Register from "./Auth/Register";
import { Route, Switch } from "react-router-dom";

const LandingPage = ({ isLoggedIn, setIsLoggedIn, setShowModal }) => {
  return (
    <motion.div exit={{ opacity: 0 }} class="grid">
      <Nav />

      <Route path="/" exact render={(props) => <LandingHome />} />
      <Route path="/login" render={(props) => <Login />} />
      <Route path="/register" render={(props) => <Register />} />
    </motion.div>
  );
};

export default LandingPage;
