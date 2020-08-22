import React from "react";
import { motion } from "framer-motion";
const Login = () => {
  return (
    <motion.h1 exit={{ opacity: 0 }} className="Login">
      Login
    </motion.h1>
  );
};

export default Login;
