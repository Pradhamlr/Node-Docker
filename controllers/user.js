const User = require("../model/userModel")

const signup = async (req, res) => {
    try {
        const user = await User.create({ ...req.body })
        req.session.user = user
        res.status(200).json({
            status: "Success",
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail"
        })
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await User.findOne({ username })
        if(!user) {
            return res.status(404).json({
                status: "Fail",
                message: "User Does Not Exist"
            })
        }

        const isPassword = user.comparePassword(password)
        if(!isPassword) {
            return res.status(400).json({
                status: "Fail",
                message: "Invalid Password"
            })
        }

        req.session.user = user
        res.status(200).json({
            status: "Success",
            data: {
                user
            }
        })
    } catch (error) {
        res.status(400).json({
            status: "Fail"
        })
    }
}

module.exports = { signup, login }