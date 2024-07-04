const { User } = require("../models/index.js")
const comparePassword = require("../Validators/comparePassword.js")
const generateToken = require("../utils/tokenGenerate.js")
const { ApiError, ApiResponse, hashPassword, generateCode, sendEmail } = require("../utils/index.js")
// const {signupValidator}=require("../Validators/auth.js")
const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    if (!name) {
      throw new ApiError(400, "Name is required")
    }
    if (!email) {
      throw new ApiError(400, "Email is required")
    }
    if (!password) {
      throw new ApiError(400, "Password is required")
    }
    if (!password.length > 6) {
      throw new ApiError(400, "Password should be 6 character long")
    }
    const user = await User.findOne({ email })
    if (user) {
      throw new ApiError(400, "User already registered")
    }
    const hashedPassword = await hashPassword(password)
    const newUser = new User({ name, email, password: hashedPassword })
    const refreshToken = await generateToken(newUser)
    newUser.refreshToken = refreshToken
    const result = await newUser.save()
    res.send(new ApiResponse(201, result, "User Created Successfully"))
  } catch (error) {
    console.log(error.message);
    // throw new ApiError(400,"User Already Registered")
    next(error)
  }
}
const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      throw new ApiError(400, "Email or password is required")
    }
    const hashedPassword = await hashPassword(password)
    const user = await User.findOne({ email })
    if (!user) {
      throw new ApiError(400, "User Not Found or invalid credentials")
    }
    if (!await comparePassword(password, user.password)) {
      throw new ApiError(401, "Wrong password")
    }
    const token = generateToken(user)
    res.send(new ApiResponse(200, { user, token }, "User signed in successfully"))
  } catch (error) {
    next(error)
  }
}
const verifyCode = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      throw new ApiError(400, "User Not Found or invalid credentials")
    }
    if (user.isVerified) {
      throw new ApiError(400, "User already verified")
    }
    const code = generateCode(6)
    user.verificationCode = code
    await user.save()
    await sendEmail({
      toEmail: user.email,
      subject: "Email verification code",
      code,
      message: "Verify your account"
    })
    res.send(new ApiResponse(200, { user }, "User verification code sent successfully"))
  } catch (error) {
    next(error)
  }
}
const verifyUser = async (req, res, next) => {
  try {
    const { email, code } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      throw new ApiError(404, "User not found")
    }
    if (user.verificationCode !== code) {
      throw new ApiError(400, "Invalid Verification code")
    }
    user.isVerified = true
    user.verificationCode = null
    await user.save()
    res.send(new ApiResponse(200, user, "User verified successfully"))
  } catch (error) {
    next(error)
  }
}
const forgetPasswordCode = async (req, res, next) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      throw new ApiError(404, "User not found")
    }
    const code = generateCode(6)
    user.verificationCode = code
    await user.save()
    await sendEmail({ toEmail: user.email, code, subject: "Forgot password code", content: "Change your password using this code" })
    res.send(new ApiResponse(200, { code }, "Forgot password verification code sent successfully"))
  } catch (error) {
    next(error)
  }
}
const resetPassword = async (req, res, next) => {
  try {
    const { email, code, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      throw new ApiError(404, "User not found")
    }
    if (code !== user.verificationCode) {
      throw new ApiError(400, "Invalid verification code")
    }
    const hashedPassword = await hashPassword(password)
    user.password = hashedPassword
    user.forgetPasswordCode = null
    await user.save()
    res.send(new ApiResponse(200, { name: user.name, email: user.email }, "Password Changed  successfully"))

  } catch (error) {
    next(error)
  }
}
const changePassword = async (req, res, next) => {
  try {
    // console.log(req.user);
    const { oldPassword, newPassword } = req.body
    const { _id } = req.user
    const user = await User.findById(_id)
    // console.log(user);
    if (!user) {
      res.status(404)
      throw new ApiError(404, "User is not registered yet")
    }
    const match = await comparePassword(oldPassword, user.password)
    if (!match) {
      res.status(401)
      throw new ApiError(401, "Incorrect old password")
    }
    if (oldPassword === newPassword) {
      res.status(401)
      throw new ApiError(401, "Both old and new passwords are same")
    }
    const hashedNewPassword = await hashPassword(newPassword)
    user.password = hashedNewPassword
    await user.save()

    res.send(new ApiResponse(200, user, "Password Changed successfully"))
    console.log(req.headers);
  } catch (error) {
    next(error)
  }
}
const updateProfile = async (req, res, next) => {
  try {
    const { _id } = req.user
    const { name, email } = req.body
    const user = await User.findById(_id)
    if (!user) {
      res.status(404)
      throw new ApiError(404, "User not found")
    }
    const isUserAlreadyExist = await User.findOne({ email })
    if (isUserAlreadyExist && isUserAlreadyExist.email === email && String(isUserAlreadyExist._id) === String(_id)) {
      res.status(400)
      throw new ApiError(400, "User with this email already exists")
    }
    user.name = name ? name : user.name
    user.email = email ? email : user.email
    if (email) {
      user.isVerified = false
    }
    await user.save()
    res.status(200).send(new ApiResponse(200, user, "User profile Updated successfully"))
  } catch (error) {
    next(error)
  }
}
const getUserProfile = async (req, res, next) => {
  if (!req.user) {
    throw new ApiError(400, "User not logged in")
  }
  res.status(200).send(new ApiResponse(200, req.user, "User Profile Found"))
}
const logoutCurrentUser = async (req, res, next) => {
  try {
    const user = req.user
    // console.log(user);
    if (!user) {
      throw new ApiError(400, "User is already logged out")
    }
    await User.findByIdAndUpdate(req.user?._id, {
      $set: {
        refreshToken: undefined
      }
    },
      {
        new: true
      })
    const options = {
      httpOnly: true,
      secure: true
    }
    res.status(200).clearCookie("accessToken", options).clearCookie("refreshToken", options).
      send(new ApiResponse(200, {}, "User logged out"))
  } catch (error) {
    next(error)
  }
}
module.exports = {
  signup,
  signin,
  verifyCode,
  verifyUser,
  forgetPasswordCode,
  resetPassword,
  changePassword,
  updateProfile,
  getUserProfile,
  logoutCurrentUser
}