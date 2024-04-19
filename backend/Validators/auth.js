const { check } = require("express-validator")
const signupValidator = [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").isEmail().withMessage("Invalid email").notEmpty().withMessage("Email is required"),
    check("password").isLength({ min: 6 }).withMessage("Password should be 6 characters long").notEmpty().withMessage("Password is required")
]
const signinValidator = [
    check("email").isEmail().withMessage("Invalid Email").notEmpty().withMessage("Email is required"),
    check("password").notEmpty().withMessage("password is required")
]
const emailValidator = [
    check("email").isEmail()
        .withMessage("Invalid Email")
        .notEmpty()
        .withMessage("Email is required")
]
const verifyUserValidator = [
    check("email").isEmail()
        .withMessage("Invalid Email")
        .notEmpty()
        .withMessage("Email is required"),
    check("code").notEmpty().withMessage("Code is required")
]
const resetPasswordValidator = [
    check("email").isEmail()
        .withMessage("Invalid Email")
        .notEmpty()
        .withMessage("Email is required"),
    check("code").notEmpty().withMessage("Code is required"),
    check("password").isLength({ min: 6 })
        .withMessage("Password should be 6 characters long")
        .notEmpty().withMessage("Password is required")
]
const changePasswordValidator = [
    check("oldPassword").notEmpty().withMessage("Old Passwor is required")
    , check("newPassword").notEmpty().withMessage("New Passwor is required")
]
const updateProfileValidator = [
    check("email").isEmail().withMessage("Invalid email")

]
module.exports = {
    signupValidator,
    signinValidator,
    emailValidator,
    verifyUserValidator,
    resetPasswordValidator,
    changePasswordValidator, 
    updateProfileValidator
}