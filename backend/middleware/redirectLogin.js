const redirectLogin = (req, res, next) => {
    // console.log(req.session);
    if (!req.session.user) {
        console.log("Session not found, unauthorized");
        return res.status(401).json({
            message: "Unauthorized, please sign in first!",
        })
    }
    else {
        next();
    }
}

module.exports = redirectLogin;