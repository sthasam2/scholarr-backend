const jwt = require("jsonwebtoken");

// middleware token check function
module.exports = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) res.status(401).send(`Error 401: Access denied!`);

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send(`Invalid Token!`);
    }
};
