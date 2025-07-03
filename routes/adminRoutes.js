const express = require("express");
const { handleCreateLoanProvider, handleGetAllLoanProviders, handleUpdateLoanProvider, handleDeleteLoanProvider } = require("../controllers/loanProviderController");
const { handleAddCreditCardProvider, handleListCreditCardProviders, handleUpdateCreditCardProvider, handleDeleteCreditCardProvider } = require("../controllers/creditCardProviderController");
const { handleCreateOfferLimit, handleGetOfferLimit, handleUpdateOfferLimit} = require("../controllers/offerLimitController");
const adminRouter = express.Router();


//  Loan Provider Routes
/**
 * @swagger
 * /api/admin/loan-providers/create:
 *   post:
 *     summary: Create a new Loan Provider
 *     tags:
 *       - Loan Providers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - loanName
 *               - bankName
 *               - loanType
 *               - interestRate
 *               - minimumCreditScore
 *               - minimumIncome
 *               - maximumLoanAmount
 *               - minTenure
 *               - maxTenure
 *               - processingFee
 *               - prepaymentCharges
 *             properties:
 *               loanName:
 *                 type: string
 *               bankName:
 *                 type: string
 *               loanType:
 *                 type: string
 *               interestRate:
 *                 type: number
 *               minimumCreditScore:
 *                 type: number
 *               minimumIncome:
 *                 type: number
 *               maximumLoanAmount:
 *                 type: number
 *               minTenure:
 *                 type: number
 *               maxTenure:
 *                 type: number
 *               processingFee:
 *                 type: number
 *               prepaymentCharges:
 *                 type: number
 *     responses:
 *       201:
 *         description: Loan Provider created successfully
 */

adminRouter.post("/loan-providers/create", handleCreateLoanProvider);
/**
 * @swagger
 * /api/admin/loan-providers/list:
 *   get:
 *     summary: Get all Loan Providers
 *     tags:
 *       - Loan Providers
 *     responses:
 *       200:
 *         description: List of all loan providers
 */

adminRouter.get("/loan-providers/list", handleGetAllLoanProviders);
/**
 * @swagger
 * /api/admin/loan-providers/update/{id}:
 *   put:
 *     summary: Update Loan Provider by ID
 *     tags:
 *       - Loan Providers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Loan Provider ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               loanName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Loan Provider updated successfully
 */

adminRouter.put("/loan-providers/update/:id", handleUpdateLoanProvider);
/**
 * @swagger
 * /api/admin/loan-providers/delete/{id}:
 *   delete:
 *     summary: Delete Loan Provider by ID
 *     tags:
 *       - Loan Providers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Loan Provider ID
 *     responses:
 *       200:
 *         description: Loan Provider deleted successfully
 */

adminRouter.delete("/loan-providers/delete/:id", handleDeleteLoanProvider);

// Credit Card Provider Routes
/**
 * @swagger
 * /api/admin/credit-card-providers/create:
 *   post:
 *     summary: Create a new Credit Card Provider
 *     tags:
 *       - Credit Card Providers
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cardName
 *               - bankName
 *               - interestRate
 *               - minimumCreditScore
 *               - minimumIncome
 *               - maximumCreditLimit
 *               - annualFee
 *               - joiningFee
 *               - cardType
 *             properties:
 *               cardName:
 *                 type: string
 *               bankName:
 *                 type: string
 *               interestRate:
 *                 type: number
 *               minimumCreditScore:
 *                 type: number
 *               minimumIncome:
 *                 type: number
 *               maximumCreditLimit:
 *                 type: number
 *               annualFee:
 *                 type: number
 *               joiningFee:
 *                 type: number
 *               cardType:
 *                 type: string
 *               playStoreLink:
 *                 type: string
 *               websiteLink:
 *                 type: string
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *               eligibilityCriteria:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Credit Card Provider created successfully
 */

adminRouter.post("/credit-card-providers/create", handleAddCreditCardProvider);
/**
 * @swagger
 * /api/admin/credit-card-providers/list:
 *   get:
 *     summary: Get all Credit Card Providers
 *     tags:
 *       - Credit Card Providers
 *     responses:
 *       200:
 *         description: List of all credit card providers
 */

adminRouter.get("/credit-card-providers/list", handleListCreditCardProviders);
/**
 * @swagger
 * /api/admin/credit-card-providers/update/{id}:
 *   put:
 *     summary: Update Credit Card Provider by ID
 *     tags:
 *       - Credit Card Providers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Credit Card Provider ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Credit Card Provider updated successfully
 */

adminRouter.put("/credit-card-providers/update/:id", handleUpdateCreditCardProvider);
/**
 * @swagger
 * /api/admin/credit-card-providers/delete/{id}:
 *   delete:
 *     summary: Delete Credit Card Provider by ID
 *     tags:
 *       - Credit Card Providers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Credit Card Provider ID
 *     responses:
 *       200:
 *         description: Credit Card Provider deleted successfully
 */

adminRouter.delete("/credit-card-providers/delete/:id", handleDeleteCreditCardProvider);


// Offer Limit Routes
/**
 * @swagger
 * /api/admin/offer-limits/create:
 *   post:
 *     summary: Create Offer Limit (only one document maintained)
 *     tags:
 *       - Offer Limits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maximumLoanAmount:
 *                 type: number
 *               minimumLoanAmount:
 *                 type: number
 *               interestRate:
 *                 type: number
 *     responses:
 *       201:
 *         description: Offer Limit created successfully
 */

adminRouter.post("/offer-limits/create", handleCreateOfferLimit);
/**
 * @swagger
 * /api/admin/offer-limits/list:
 *   get:
 *     summary: Get current Offer Limit
 *     tags:
 *       - Offer Limits
 *     responses:
 *       200:
 *         description: Current Offer Limit
 */

adminRouter.get("/offer-limits/list", handleGetOfferLimit);
/**
 * @swagger
 * /api/admin/offer-limits/update:
 *   put:
 *     summary: Update the existing Offer Limit
 *     tags:
 *       - Offer Limits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maximumLoanAmount:
 *                 type: number
 *               minimumLoanAmount:
 *                 type: number
 *               interestRate:
 *                 type: number
 *     responses:
 *       200:
 *         description: Offer Limit updated successfully
 */

adminRouter.put("/offer-limits/update", handleUpdateOfferLimit);



module.exports = adminRouter;
