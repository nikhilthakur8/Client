const express = require("express");
const {
	handleCreateLoanProvider,
	handleGetAllLoanProviders,
	handleUpdateLoanProvider,
	handleDeleteLoanProvider,
} = require("../controllers/loanProviderController");
const {
	handleAddCreditCardProvider,
	handleListCreditCardProviders,
	handleUpdateCreditCardProvider,
	handleDeleteCreditCardProvider,
} = require("../controllers/creditCardProviderController");
const {
	handleCreateOfferLimit,
	handleGetOfferLimit,
	handleUpdateOfferLimit,
} = require("../controllers/offerLimitController");
const {
	handleCreateEmployee,
	handleListEmployees,
	handleUpdateEmployee,
	handleDeleteEmployee,
} = require("../controllers/employeeController");
const adminRouter = express.Router();

//  Loan Provider Routes
/**
 * @swagger
 * /api/admin/loan-providers/create:
 *   post:
 *     summary: Create a new loan provider
 *     description: Allows the admin to create a new loan provider by providing required loan details.
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
 *                 example: "Personal Loan Express"
 *               bankName:
 *                 type: string
 *                 example: "HDFC Bank"
 *               loanType:
 *                 type: string
 *                 example: "Personal Loan"
 *               interestRate:
 *                 type: number
 *                 example: 11.5
 *               minimumCreditScore:
 *                 type: number
 *                 example: 700
 *               minimumIncome:
 *                 type: number
 *                 example: 30000
 *               maximumLoanAmount:
 *                 type: number
 *                 example: 1000000
 *               minTenure:
 *                 type: number
 *                 example: 12
 *               maxTenure:
 *                 type: number
 *                 example: 60
 *               processingFee:
 *                 type: number
 *                 example: 1500
 *               prepaymentCharges:
 *                 type: number
 *                 example: 2000
 *               playStoreLink:
 *                 type: string
 *                 example: "https://play.google.com/store/apps/details?id=com.example.loan"
 *               websiteLink:
 *                 type: string
 *                 example: "https://www.examplebank.com/loan"
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Quick approval", "Low interest"]
 *               EligibilityCriteria:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Minimum age 21", "Salaried individual"]
 *     responses:
 *       201:
 *         description: Loan provider created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Loan Provider created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64c8f9a2d9c8f9a2d9c8f9a2"
 *                     loanName:
 *                       type: string
 *                       example: "Personal Loan Express"
 *                     bankName:
 *                       type: string
 *                       example: "HDFC Bank"
 *                     loanType:
 *                       type: string
 *                       example: "Personal Loan"
 *                     interestRate:
 *                       type: number
 *                       example: 11.5
 *                     minimumCreditScore:
 *                       type: number
 *                       example: 700
 *                     minimumIncome:
 *                       type: number
 *                       example: 30000
 *                     maximumLoanAmount:
 *                       type: number
 *                       example: 1000000
 *                     minTenure:
 *                       type: number
 *                       example: 12
 *                     maxTenure:
 *                       type: number
 *                       example: 60
 *                     processingFee:
 *                       type: number
 *                       example: 1500
 *                     prepaymentCharges:
 *                       type: number
 *                       example: 2000
 *                     playStoreLink:
 *                       type: string
 *                       example: "https://play.google.com/store/apps/details?id=com.example.loan"
 *                     websiteLink:
 *                       type: string
 *                       example: "https://www.examplebank.com/loan"
 *                     features:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Quick approval", "Low interest"]
 *                     EligibilityCriteria:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Minimum age 21", "Salaried individual"]
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     __v:
 *                       type: number
 *                       example: 0
 *       400:
 *         description: Validation failed — invalid or missing data
 *       500:
 *         description: Internal server error
 */

adminRouter.post("/loan-providers/create", handleCreateLoanProvider);
/**
 * @swagger
 * /api/admin/loan-providers/list:
 *   get:
 *     summary: Get all loan providers
 *     description: Retrieves a list of all loan providers with their details.
 *     tags:
 *       - Loan Providers
 *     responses:
 *       200:
 *         description: Loan providers fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Loan providers fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64c8f9a2d9c8f9a2d9c8f9a2"
 *                       loanName:
 *                         type: string
 *                         example: "Personal Loan Express"
 *                       bankName:
 *                         type: string
 *                         example: "HDFC Bank"
 *                       loanType:
 *                         type: string
 *                         example: "Personal Loan"
 *                       interestRate:
 *                         type: number
 *                         example: 11.5
 *                       minimumCreditScore:
 *                         type: number
 *                         example: 700
 *                       minimumIncome:
 *                         type: number
 *                         example: 30000
 *                       maximumLoanAmount:
 *                         type: number
 *                         example: 1000000
 *                       minTenure:
 *                         type: number
 *                         example: 12
 *                       maxTenure:
 *                         type: number
 *                         example: 60
 *                       processingFee:
 *                         type: number
 *                         example: 1500
 *                       prepaymentCharges:
 *                         type: number
 *                         example: 2000
 *                       playStoreLink:
 *                         type: string
 *                         example: "https://play.google.com/store/apps/details?id=com.example.loan"
 *                       websiteLink:
 *                         type: string
 *                         example: "https://www.examplebank.com/loan"
 *                       features:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Quick approval", "Low interest"]
 *                       EligibilityCriteria:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Minimum age 21", "Salaried individual"]
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                       __v:
 *                         type: number
 *                         example: 0
 *       500:
 *         description: Failed to fetch loan providers
 */

adminRouter.get("/loan-providers/list", handleGetAllLoanProviders);
/**
 * @swagger
 * /api/admin/loan-providers/update/{id}:
 *   put:
 *     summary: Update loan provider details
 *     description: Allows the admin to update the details of an existing loan provider by ID. Only the provided fields will be updated.
 *     tags:
 *       - Loan Providers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the loan provider to update
 *         schema:
 *           type: string
 *           example: "64c8f9a2d9c8f9a2d9c8f9a2"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               loanName:
 *                 type: string
 *                 example: "Updated Loan Name"
 *               bankName:
 *                 type: string
 *                 example: "Updated Bank Name"
 *               loanType:
 *                 type: string
 *                 example: "Updated Loan Type"
 *               interestRate:
 *                 type: number
 *                 example: 10.5
 *               minimumCreditScore:
 *                 type: number
 *                 example: 750
 *               minimumIncome:
 *                 type: number
 *                 example: 40000
 *               maximumLoanAmount:
 *                 type: number
 *                 example: 1500000
 *               minTenure:
 *                 type: number
 *                 example: 6
 *               maxTenure:
 *                 type: number
 *                 example: 72
 *               processingFee:
 *                 type: number
 *                 example: 2000
 *               prepaymentCharges:
 *                 type: number
 *                 example: 2500
 *               playStoreLink:
 *                 type: string
 *                 example: "https://play.google.com/store/apps/details?id=com.example.updated"
 *               websiteLink:
 *                 type: string
 *                 example: "https://www.updatedbank.com/loan"
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Fast disbursal", "Low fees"]
 *               EligibilityCriteria:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Minimum age 25", "Valid PAN card"]
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Loan provider updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Loan provider updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64c8f9a2d9c8f9a2d9c8f9a2"
 *                     loanName:
 *                       type: string
 *                       example: "Updated Loan Name"
 *                     bankName:
 *                       type: string
 *                       example: "Updated Bank Name"
 *                     loanType:
 *                       type: string
 *                       example: "Updated Loan Type"
 *                     interestRate:
 *                       type: number
 *                       example: 10.5
 *                     minimumCreditScore:
 *                       type: number
 *                       example: 750
 *                     minimumIncome:
 *                       type: number
 *                       example: 40000
 *                     maximumLoanAmount:
 *                       type: number
 *                       example: 1500000
 *                     minTenure:
 *                       type: number
 *                       example: 6
 *                     maxTenure:
 *                       type: number
 *                       example: 72
 *                     processingFee:
 *                       type: number
 *                       example: 2000
 *                     prepaymentCharges:
 *                       type: number
 *                       example: 2500
 *                     playStoreLink:
 *                       type: string
 *                       example: "https://play.google.com/store/apps/details?id=com.example.updated"
 *                     websiteLink:
 *                       type: string
 *                       example: "https://www.updatedbank.com/loan"
 *                     features:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Fast disbursal", "Low fees"]
 *                     EligibilityCriteria:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Minimum age 25", "Valid PAN card"]
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     __v:
 *                       type: number
 *                       example: 0
 *       400:
 *         description: Validation failed — invalid or missing data
 *       404:
 *         description: Loan provider not found
 *       500:
 *         description: Failed to update loan provider
 */

adminRouter.put("/loan-providers/update/:id", handleUpdateLoanProvider);
/**
 * @swagger
 * /api/admin/loan-providers/delete/{id}:
 *   delete:
 *     summary: Delete a loan provider by ID
 *     description: Allows the admin to delete an existing loan provider using its unique ID.
 *     tags:
 *       - Loan Providers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the loan provider to delete
 *         schema:
 *           type: string
 *           example: "64c8f9a2d9c8f9a2d9c8f9a2"
 *     responses:
 *       200:
 *         description: Loan provider deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Loan provider deleted successfully
 *       404:
 *         description: Loan provider not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Loan provider not found
 *       500:
 *         description: Failed to delete loan provider
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to delete loan provider
 */

adminRouter.delete("/loan-providers/delete/:id", handleDeleteLoanProvider);

// Credit Card Provider Routes
/**
 * @swagger
 * /api/admin/credit-card-providers/create:
 *   post:
 *     summary: Create a new credit card provider
 *     description: Allows the admin to create a new credit card provider by providing required details such as card name, bank name, interest rate, credit score, and more.
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
 *                 example: "HDFC Regalia Credit Card"
 *               bankName:
 *                 type: string
 *                 example: "HDFC Bank"
 *               interestRate:
 *                 type: number
 *                 example: 15.99
 *               minimumCreditScore:
 *                 type: number
 *                 example: 750
 *               minimumIncome:
 *                 type: number
 *                 example: 40000
 *               maximumCreditLimit:
 *                 type: number
 *                 example: 500000
 *               annualFee:
 *                 type: number
 *                 example: 2500
 *               joiningFee:
 *                 type: number
 *                 example: 1000
 *               playStoreLink:
 *                 type: string
 *                 example: "https://play.google.com/store/apps/details?id=com.example.cardapp"
 *               websiteLink:
 *                 type: string
 *                 example: "https://www.hdfcbank.com/cards"
 *               cardType:
 *                 type: string
 *                 example: "Rewards"
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Airport Lounge Access", "Reward Points", "Fuel Surcharge Waiver"]
 *               eligibilityCriteria:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Minimum age 21", "Valid PAN card", "Salaried or self-employed"]
 *     responses:
 *       201:
 *         description: Credit Card Provider added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Credit Card Provider added successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64c8f9a2d9c8f9a2d9c8f9a2"
 *                     cardName:
 *                       type: string
 *                       example: "HDFC Regalia Credit Card"
 *                     bankName:
 *                       type: string
 *                       example: "HDFC Bank"
 *                     interestRate:
 *                       type: number
 *                       example: 15.99
 *                     minimumCreditScore:
 *                       type: number
 *                       example: 750
 *                     minimumIncome:
 *                       type: number
 *                       example: 40000
 *                     maximumCreditLimit:
 *                       type: number
 *                       example: 500000
 *                     annualFee:
 *                       type: number
 *                       example: 2500
 *                     joiningFee:
 *                       type: number
 *                       example: 1000
 *                     playStoreLink:
 *                       type: string
 *                       example: "https://play.google.com/store/apps/details?id=com.example.cardapp"
 *                     websiteLink:
 *                       type: string
 *                       example: "https://www.hdfcbank.com/cards"
 *                     cardType:
 *                       type: string
 *                       example: "Rewards"
 *                     features:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Airport Lounge Access", "Reward Points"]
 *                     eligibilityCriteria:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Minimum age 21", "Valid PAN card"]
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     __v:
 *                       type: number
 *                       example: 0
 *       400:
 *         description: Validation failed — invalid or missing fields
 *       500:
 *         description: Failed to add credit card provider
 */

adminRouter.post("/credit-card-providers/create", handleAddCreditCardProvider);
/**
 * @swagger
 * /api/admin/credit-card-providers/list:
 *   get:
 *     summary: Get all credit card providers
 *     description: Retrieves a list of all available credit card providers with their details.
 *     tags:
 *       - Credit Card Providers
 *     responses:
 *       200:
 *         description: Credit Card Providers fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Credit Card Providers fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "64c8f9a2d9c8f9a2d9c8f9a2"
 *                       cardName:
 *                         type: string
 *                         example: "HDFC Regalia Credit Card"
 *                       bankName:
 *                         type: string
 *                         example: "HDFC Bank"
 *                       interestRate:
 *                         type: number
 *                         example: 15.99
 *                       minimumCreditScore:
 *                         type: number
 *                         example: 750
 *                       minimumIncome:
 *                         type: number
 *                         example: 40000
 *                       maximumCreditLimit:
 *                         type: number
 *                         example: 500000
 *                       annualFee:
 *                         type: number
 *                         example: 2500
 *                       joiningFee:
 *                         type: number
 *                         example: 1000
 *                       playStoreLink:
 *                         type: string
 *                         example: "https://play.google.com/store/apps/details?id=com.example.cardapp"
 *                       websiteLink:
 *                         type: string
 *                         example: "https://www.hdfcbank.com/cards"
 *                       cardType:
 *                         type: string
 *                         example: "Rewards"
 *                       features:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Airport Lounge Access", "Reward Points"]
 *                       eligibilityCriteria:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Minimum age 21", "Valid PAN card"]
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *                       __v:
 *                         type: number
 *                         example: 0
 *       500:
 *         description: Failed to fetch credit card providers
 */

adminRouter.get("/credit-card-providers/list", handleListCreditCardProviders);
/**
 * @swagger
 * /api/admin/credit-card-providers/update/{id}:
 *   put:
 *     summary: Update credit card provider details
 *     description: Allows the admin to update an existing credit card provider by ID. Only the provided fields will be updated.
 *     tags:
 *       - Credit Card Providers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the credit card provider to update
 *         schema:
 *           type: string
 *           example: "64c8f9a2d9c8f9a2d9c8f9a2"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardName:
 *                 type: string
 *                 example: "Updated Credit Card Name"
 *               bankName:
 *                 type: string
 *                 example: "Updated Bank Name"
 *               interestRate:
 *                 type: number
 *                 example: 14.99
 *               minimumCreditScore:
 *                 type: number
 *                 example: 770
 *               minimumIncome:
 *                 type: number
 *                 example: 45000
 *               maximumCreditLimit:
 *                 type: number
 *                 example: 600000
 *               annualFee:
 *                 type: number
 *                 example: 2000
 *               joiningFee:
 *                 type: number
 *                 example: 1000
 *               playStoreLink:
 *                 type: string
 *                 example: "https://play.google.com/store/apps/details?id=com.updated.cardapp"
 *               websiteLink:
 *                 type: string
 *                 example: "https://www.updatedbank.com/cards"
 *               cardType:
 *                 type: string
 *                 example: "Cashback"
 *               features:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Cashback on purchases", "Zero lost card liability"]
 *               eligibilityCriteria:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Minimum age 23", "Valid ID proof"]
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Credit Card Provider updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Credit Card Provider updated successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64c8f9a2d9c8f9a2d9c8f9a2"
 *                     cardName:
 *                       type: string
 *                       example: "Updated Credit Card Name"
 *                     bankName:
 *                       type: string
 *                       example: "Updated Bank Name"
 *                     interestRate:
 *                       type: number
 *                       example: 14.99
 *                     minimumCreditScore:
 *                       type: number
 *                       example: 770
 *                     minimumIncome:
 *                       type: number
 *                       example: 45000
 *                     maximumCreditLimit:
 *                       type: number
 *                       example: 600000
 *                     annualFee:
 *                       type: number
 *                       example: 2000
 *                     joiningFee:
 *                       type: number
 *                       example: 1000
 *                     playStoreLink:
 *                       type: string
 *                       example: "https://play.google.com/store/apps/details?id=com.updated.cardapp"
 *                     websiteLink:
 *                       type: string
 *                       example: "https://www.updatedbank.com/cards"
 *                     cardType:
 *                       type: string
 *                       example: "Cashback"
 *                     features:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Cashback on purchases", "Zero lost card liability"]
 *                     eligibilityCriteria:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Minimum age 23", "Valid ID proof"]
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *                     __v:
 *                       type: number
 *                       example: 0
 *       400:
 *         description: Validation failed — invalid or missing fields
 *       404:
 *         description: Credit Card Provider not found
 *       500:
 *         description: Failed to update Credit Card Provider
 */

adminRouter.put(
	"/credit-card-providers/update/:id",
	handleUpdateCreditCardProvider
);
/**
 * @swagger
 * /api/admin/credit-card-providers/delete/{id}:
 *   delete:
 *     summary: Delete a credit card provider by ID
 *     description: Allows the admin to delete an existing credit card provider using its unique ID.
 *     tags:
 *       - Credit Card Providers
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the credit card provider to delete
 *         schema:
 *           type: string
 *           example: "64c8f9a2d9c8f9a2d9c8f9a2"
 *     responses:
 *       200:
 *         description: Credit Card Provider deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Credit Card Provider deleted successfully
 *       404:
 *         description: Credit Card Provider not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Credit Card Provider not found
 *       500:
 *         description: Failed to delete Credit Card Provider
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to delete Credit Card Provider
 */

adminRouter.delete(
	"/credit-card-providers/delete/:id",
	handleDeleteCreditCardProvider
);

// Offer Limit Routes
/**
 * @swagger
 * /api/admin/offer-limits/create:
 *   post:
 *     summary: Create or update the offer limit
 *     description: Creates or updates the offer limit with specified credit score mappings.
 *     tags:
 *       - Offer Limits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - creditScoreMappings
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Standard Loan Offer Limit"
 *               creditScoreMappings:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     minScore:
 *                       type: number
 *                       example: 650
 *                     maxScore:
 *                       type: number
 *                       example: 800
 *                     loanAmount:
 *                       type: number
 *                       example: 500000
 *     responses:
 *       200:
 *         description: Offer limit created/updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Offer limit created/updated successfully
 *                 data:
 *                   type: object
 *                   example:
 *                     _id: "64cb7f5b2fc13d6f9c4b7c2e"
 *                     name: "Standard Loan Offer Limit"
 *                     creditScoreMappings:
 *                       - minScore: 650
 *                         maxScore: 800
 *                         loanAmount: 500000
 *                     createdAt: "2024-07-04T12:34:56.789Z"
 *       400:
 *         description: Validation failed
 *       500:
 *         description: Failed to create/update offer limit
 */

adminRouter.post("/offer-limits/create", handleCreateOfferLimit);
/**
 * @swagger
 * /api/admin/offer-limits/list:
 *   get:
 *     summary: Get the current offer limit
 *     description: Retrieves the existing offer limit and its credit score mappings.
 *     tags:
 *       - Offer Limits
 *     responses:
 *       200:
 *         description: Offer limit fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   example:
 *                     _id: "64cb7f5b2fc13d6f9c4b7c2e"
 *                     name: "Standard Loan Offer Limit"
 *                     creditScoreMappings:
 *                       - minScore: 650
 *                         maxScore: 800
 *                         loanAmount: 500000
 *                     createdAt: "2024-07-04T12:34:56.789Z"
 *       404:
 *         description: No offer limit found
 *       500:
 *         description: Failed to retrieve offer limit
 */

adminRouter.get("/offer-limits/list", handleGetOfferLimit);
/**
 * @swagger
 * /api/admin/offer-limits/update:
 *   put:
 *     summary: Update the offer limit
 *     description: Updates the offer limit and its credit score mappings. Creates a new document if none exists.
 *     tags:
 *       - Offer Limits
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Loan Offer Limit"
 *               creditScoreMappings:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     minScore:
 *                       type: number
 *                       example: 680
 *                     maxScore:
 *                       type: number
 *                       example: 850
 *                     loanAmount:
 *                       type: number
 *                       example: 750000
 *     responses:
 *       200:
 *         description: Offer limit updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Offer limit updated successfully
 *                 data:
 *                   type: object
 *                   example:
 *                     _id: "64cb7f5b2fc13d6f9c4b7c2e"
 *                     name: "Updated Loan Offer Limit"
 *                     creditScoreMappings:
 *                       - minScore: 680
 *                         maxScore: 850
 *                         loanAmount: 750000
 *                     createdAt: "2024-07-04T12:34:56.789Z"
 *       500:
 *         description: Failed to update offer limit
 */

adminRouter.put("/offer-limits/update", handleUpdateOfferLimit);

// Employee Management Routes
/**
 * @swagger
 * /api/admin/employees/create:
 *   post:
 *     summary: Create a new employee
 *     description: Creates a new employee with provided details. Requires admin authentication.
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullName
 *               - email
 *               - phone
 *               - password
 *               - employeeId
 *               - address
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "john.doe@example.com"
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               password:
 *                 type: string
 *                 example: "password123"
 *               employeeId:
 *                 type: string
 *                 example: "EMP001"
 *               address:
 *                 type: string
 *                 example: "123 Main Street, City"
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Employee created successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60f6b3c4c456c4a3e8a2d7a9"
 *                     fullName:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       example: "john.doe@example.com"
 *                     phone:
 *                       type: string
 *                       example: "9876543210"
 *                     role:
 *                       type: string
 *                       example: "employee"
 *                     employeeId:
 *                       type: string
 *                       example: "EMP001"
 *                     employeeAddress:
 *                       type: string
 *                       example: "123 Main Street, City"
 *                     isActive:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 errors:
 *                   type: object
 *                   example:
 *                     fullName: "Full name is required"
 *                     email: "Invalid email format"
 *       409:
 *         description: Employee already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Employee with provided email, phone, or employee ID already exists
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Internal server error
 */
adminRouter.post("/employees/create", handleCreateEmployee);
/**
 * @swagger
 * /api/admin/employees/list:
 *   get:
 *     summary: Get the list of all employees
 *     description: Retrieves all employees from the system. Requires admin authentication.
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employees fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Employees fetched successfully
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60f6b3c4c456c4a3e8a2d7a9"
 *                       fullName:
 *                         type: string
 *                         example: "John Doe"
 *                       email:
 *                         type: string
 *                         example: "john.doe@example.com"
 *                       phone:
 *                         type: string
 *                         example: "9876543210"
 *                       role:
 *                         type: string
 *                         example: "employee"
 *                       employeeId:
 *                         type: string
 *                         example: "EMP001"
 *                       employeeAddress:
 *                         type: string
 *                         example: "123 Main Street, City"
 *                       isActive:
 *                         type: boolean
 *                         example: true
 *       500:
 *         description: Failed to fetch employees
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to fetch employees
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

adminRouter.get("/employees/list", handleListEmployees);
/**
 * @swagger
 * /api/admin/employees/update/{id}:
 *   put:
 *     summary: Update an employee's details by ID
 *     description: Allows the admin to update employee information such as name, phone number, email, and address.
 *     tags:
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Unique ID of the employee to update
 *         schema:
 *           type: string
 *           example: "64c2a0a5e1e2b91b4c1d3f12"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "Jane Smith"
 *               phone:
 *                 type: string
 *                 example: "9876543210"
 *               email:
 *                 type: string
 *                 example: "jane@example.com"
 *               address:
 *                 type: string
 *                 example: "456 Another Street, City"
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Employee updated successfully"
 *                 employee:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "64c2a0a5e1e2b91b4c1d3f12"
 *                     fullName:
 *                       type: string
 *                       example: "Jane Smith"
 *                     phone:
 *                       type: string
 *                       example: "9876543210"
 *                     email:
 *                       type: string
 *                       example: "jane@example.com"
 *                     address:
 *                       type: string
 *                       example: "456 Another Street, City"
 *       400:
 *         description: Validation failed — missing or invalid data
 *       404:
 *         description: Employee not found with the provided ID
 *       500:
 *         description: Internal server error
 */

adminRouter.put("/employees/update/:id", handleUpdateEmployee);
/**
 * @swagger
 * /api/admin/employees/delete/{id}:
 *   delete:
 *     summary: Delete an employee
 *     description: Deletes an employee by ID. Requires admin authentication.
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee to delete
 *         schema:
 *           type: string
 *           example: "60f6b3c4c456c4a3e8a2d7a9"
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Employee deleted successfully
 *       404:
 *         description: Employee not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Employee not found
 *       500:
 *         description: Failed to delete employee
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Failed to delete employee
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

adminRouter.delete("/employees/delete/:id", handleDeleteEmployee);

module.exports = adminRouter;
