const jwt = require("jsonwebtoken")
// const { jwtSecret } = require("../constants/keys.js")
const generateToken = (user) => {
    const token = jwt.sign(
        { _id: user._id, name: user.name, email: user.email, role: user.role },
        "askbdkas",{expiresIn:"7d"})
        // console.log(`jwt token generated ${token}`);
    return token
}
module.exports = generateToken