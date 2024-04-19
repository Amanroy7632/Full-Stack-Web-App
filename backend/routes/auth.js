const express = require("express")
const router = express.Router()
const { signupValidator,
    signinValidator,
    emailValidator,
    verifyUserValidator,
    resetPasswordValidator,
    changePasswordValidator,
    updateProfileValidator } = require("../Validators/auth.js")
const isAuth = require("../middlewares/isAuth.js")
const validate = require("../Validators/validate.js")
const { authController } = require("../controllers/index.js")
const ApiResponse = require("../utils/ApiResponse.js")
router.post("/signup", signupValidator, validate, authController.signup)
router.post("/signin", signinValidator, validate, authController.signin)
router.post("/email-verification", emailValidator, validate, authController.verifyCode)
router.post("/verify-user", verifyUserValidator, validate, authController.verifyUser)
router.post("/forgot-password-code", emailValidator, validate, authController.forgetPasswordCode)
router.post("/reset-password", resetPasswordValidator, validate, authController.resetPassword)
router.put("/change-password", isAuth, changePasswordValidator, validate, authController.changePassword)
router.put("/update-profile", isAuth,updateProfileValidator,validate, authController.updateProfile)
module.exports = router
