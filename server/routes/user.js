import express from "express"
import {register,login,logout, forgotPassword, resetPassword, userDetail} from "../controllers/user.js"
import {authMid} from "../middlewares/auth.js"
  
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.post('/forgotpassword', forgotPassword)
router.post('/resetpassword/:token', resetPassword) 
router.get('/me',authMid , userDetail)

export default router 