import express from "express";
import homePageController from "../controllers/homePageController";
import registerController from "../controllers/registerController";
import loginController from "../controllers/loginController";
import recordFaceController from "../controllers/recordFaceController";
import paymoneyController from "../controllers/paymoneyController";
import netbankingController from "../controllers/netbankingController";
import upiController from "../controllers/upiController";
import cardController from "../controllers/cardController";
import PaymentSuccsessfulController from "../controllers/PaymentSuccsessfulController"
import auth from "../validation/authValidation";
import passport from "passport";
import initPassportLocal from "../controllers/passportLocalController";
import { route } from "express/lib/application";


// Init all passport
initPassportLocal();

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", loginController.checkLoggedIn, homePageController.handleHelloWorld);
    router.get("/recordface", recordFaceController.recordFace);
    router.post("/recordface", recordFaceController.recordfaceData);  
    router.get("/login",loginController.checkLoggedOut, loginController.getPageLogin);
    router.post("/login", passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/login",
        successFlash: true,
        failureFlash: true
    }));

    router.get("/paymoney", paymoneyController.payMoney);
    router.get("/paymoney/netbanking", netbankingController.payMoneyViaNetBanking);
    router.post("/paymoney/netbanking", netbankingController.checkFaceNetBanking);
    router.get("/paymoney/upi", upiController.payMoneyViaupi);
    router.post("/paymoney/upi", upiController.checkFaceupi);
    router.get("/paymoney/card", cardController.payMoneyViacard);
    router.post("/paymoney/card", cardController.checkFaceCard);
    router.get("/paymoney/upi/paymentsuccessful", PaymentSuccsessfulController.PaymentSuccessful);
    router.get("/paymoney/netbanking/paymentsuccessful", PaymentSuccsessfulController.PaymentSuccessful);
    router.get("/paymoney/card/paymentsuccessful", PaymentSuccsessfulController.PaymentSuccessful);
    router.get("/register", registerController.getPageRegister);
    router.post("/register", auth.validateRegister, registerController.createNewUser);
    router.post("/logout", loginController.postLogOut);
    return app.use("/", router);
};
module.exports = initWebRoutes;
