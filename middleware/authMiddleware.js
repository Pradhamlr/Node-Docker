const authenticationMiddleware = (req, res, next) => {
    const { user } = req.session
    if(!user) {
        return res.status(401).json({
            status: "Fail",
            message: "Unauthorized To View The Page"
        })
    }

    req.user = user
    next()
}

module.exports = authenticationMiddleware