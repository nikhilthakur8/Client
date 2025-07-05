const { Router } = require("express");
const {
	handleGetAllLoanProviders,
	handleGetLoanProvider,
} = require("../controllers/loanProviderController");
const {
	handleListCreditCardProviders,
	handleGetCreditCardProvider,
} = require("../controllers/creditCardProviderController");
const { handleGetOfferLimit } = require("../controllers/offerLimitController");

const staticRouter = Router();

staticRouter.get("/", (req, res) => {
	res.send("Welcome to the Loan Application API");
});

staticRouter.get("/loan-providers/list", handleGetAllLoanProviders);
staticRouter.get("/loan-providers/:id", handleGetLoanProvider);

staticRouter.get("/credit-card-providers/list", handleListCreditCardProviders);
staticRouter.get("/credit-card-providers/:id", handleGetCreditCardProvider);

staticRouter.get("/offer-limits/list", handleGetOfferLimit);

module.exports = staticRouter;




/**
 * @swagger
 * /api/loan-providers/list:
 *   get:
 *     summary: Get all Loan Providers (Public)
 *     description: Retrieves a public list of all available loan providers.
 *     tags:
 *       - Static
 *     responses:
 *       200:
 *         description: Loan providers fetched successfully
 *       500:
 *         description: Failed to fetch loan providers
 */

/**
 * @swagger
 * /api/loan-providers/{id}:
 *   get:
 *     summary: Get Loan Provider by ID (Public)
 *     description: Retrieves details of a specific loan provider by ID.
 *     tags:
 *       - Static
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Loan Provider ID
 *     responses:
 *       200:
 *         description: Loan provider fetched successfully
 *       404:
 *         description: Loan provider not found
 */

/**
 * @swagger
 * /api/credit-card-providers/list:
 *   get:
 *     summary: Get all Credit Card Providers (Public)
 *     description: Retrieves a public list of all available credit card providers.
 *     tags:
 *       - Static
 *     responses:
 *       200:
 *         description: Credit card providers fetched successfully
 *       500:
 *         description: Failed to fetch credit card providers
 */

/**
 * @swagger
 * /api/credit-card-providers/{id}:
 *   get:
 *     summary: Get Credit Card Provider by ID (Public)
 *     description: Retrieves details of a specific credit card provider by ID.
 *     tags:
 *       - Static
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Credit Card Provider ID
 *     responses:
 *       200:
 *         description: Credit card provider fetched successfully
 *       404:
 *         description: Credit card provider not found
 */

/**
 * @swagger
 * /api/offer-limits/list:
 *   get:
 *     summary: Get all Offer Limits (Public)
 *     description: Retrieves a public list of all offer limits.
 *     tags:
 *       - Static
 *     responses:
 *       200:
 *         description: Offer limits fetched successfully
 *       500:
 *         description: Failed to fetch offer limits
 */
