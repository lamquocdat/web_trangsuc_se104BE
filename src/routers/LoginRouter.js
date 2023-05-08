import express from 'express';

const router = express.Router();
import * as loginController from '../controller/loginController.js';
import { localVariables } from '../helper/auth.js';
// // router
// //     .get("/cart/:id", cartController.getCartByMaKH)
// //     .post("/cart", cartController.addSpToCart)
// //     .put("/cart/makh=:makh", cartController.updateCart)
// //     .delete("/cart/productId=:productId", cartController.deleteSp)
// //     .delete("/cart/:id", cartController.deleteGH);
// //POST:
// router.route('/register').post(loginController.register);

// router.route('/login').post(loginController.login);
// //GET METHOD
// router.route('/user/:email').post(loginController.getUser);
// router.route('/userid/:_id').get(loginController.getUserbyId);
// router
//   .route('/generateOTP')
//   .get(controller.verifyUser, localVariables, loginController.generateOTP);
// router.route('/verifyOTP').get(loginController.verifyOTP);
// //PUT METHOD
// router.route('/updateuser').put(loginController.updateUser);
// router.route('/recovery').put(controller.resetPassword);
// export default router;

router.route('/register').post(loginController.register);
router.route('/login').post(loginController.verifyUser, loginController.login);
//first verify user=>  move next

//GET METHOD
router.route('/user/:email').post(loginController.getUser);
router.route('/userid/:_id').get(loginController.getUserbyId);
router
  .route('/generateOTP')
  .get(loginController.verifyUser, localVariables, loginController.generateOTP);
router.route('/verifyOTP').get(loginController.verifyOTP);
router.route('/createResetSession').get(loginController.createResetSession);

//PUT METHOD
router.route('/updateuser').put(loginController.updateUser);
router.route('/recovery').put(loginController.resetPassword);
router.route('/changepassword').put(loginController.changepassword);

export default router;
