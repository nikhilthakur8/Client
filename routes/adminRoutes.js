const express = require("express");
const { handleCreateLoanProvider, handleGetAllLoanProviders, handleUpdateLoanProvider, handleDeleteLoanProvider } = require("../controllers/loanProviderController");
const { handleAddCreditCardProvider, handleListCreditCardProviders, handleUpdateCreditCardProvider, handleDeleteCreditCardProvider } = require("../controllers/creditCardProviderController");
const { handleCreateOfferLimit, handleGetOfferLimit, handleUpdateOfferLimit} = require("../controllers/offerLimitController");
const adminRouter = express.Router();


//  Loan Provider Routes
adminRouter.post("/loan-providers/create", handleCreateLoanProvider);
adminRouter.get("/loan-providers/list", handleGetAllLoanProviders);
adminRouter.put("/loan-providers/update/:id", handleUpdateLoanProvider);
adminRouter.delete("/loan-providers/delete/:id", handleDeleteLoanProvider);

// // Credit Card Provider Routes

adminRouter.post("/credit-card-providers/create", handleAddCreditCardProvider);
adminRouter.get("/credit-card-providers/list", handleListCreditCardProviders);
adminRouter.put("/credit-card-providers/update/:id", handleUpdateCreditCardProvider);
adminRouter.delete("/credit-card-providers/delete/:id", handleDeleteCreditCardProvider);


// // Offer Limit Routes
adminRouter.post("/offer-limits/create", handleCreateOfferLimit);
adminRouter.get("/offer-limits/list", handleGetOfferLimit);
adminRouter.put("/offer-limits/update", handleUpdateOfferLimit);

module.exports = adminRouter;
