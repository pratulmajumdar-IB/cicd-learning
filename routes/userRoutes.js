const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/authMiddleware");

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve all users.
 *     responses:
 *       200:
 *         description: Successfully retrieved users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/", authenticateToken, userController.getUsers);
/**
 * @swagger
 * /users/search:
 *   get:
 *     tags:
 *       - Users
 *     summary: Search users by name
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         required: true
 *         description: Name to search for
 *         schema:
 *           type: string
 *           example: John
 *     responses:
 *       200:
 *         description: Successfully retrieved matching users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/search", authenticateToken, userController.searchUsers);
/**
 * @swagger
 * /users/filter:
 *   get:
 *     tags:
 *       - Users
 *     summary: Search and filter users
 *     security:
 *       - bearerAuth: []
 *     description: Search users by name, filter by age range, sort results, and paginate the response.
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         description: Search users by name
 *         schema:
 *           type: string
 *           example: John
 *       - in: query
 *         name: minAge
 *         required: false
 *         description: Minimum age
 *         schema:
 *           type: integer
 *           minimum: 18
 *           example: 20
 *       - in: query
 *         name: maxAge
 *         required: false
 *         description: Maximum age
 *         schema:
 *           type: integer
 *           maximum: 120
 *           example: 40
 *       - in: query
 *         name: sort
 *         required: false
 *         description: Field to sort by. Prefix with '-' for descending order.
 *         schema:
 *           type: string
 *           example: name
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *           example: 1
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of users per page
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *           example: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved filtered users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserFilterResponse'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/filter", authenticateToken, userController.searchAndFilterUsers);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get a user by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB user ID
 *         schema:
 *           type: string
 *           example: 64f123456789abcdef123456
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         $ref: '#/components/responses/UserNotFound'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get("/:id", authenticateToken, userController.getUser);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB user ID
 *         schema:
 *           type: string
 *           example: 64f123456789abcdef123456
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateUser'
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         $ref: '#/components/responses/UserNotFound'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.put("/:id", authenticateToken, userController.updateUser);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB user ID
 *         schema:
 *           type: string
 *           example: 64f123456789abcdef123456
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         $ref: '#/components/responses/UserNotFound'
 *       400:
 *         $ref: '#/components/responses/ValidationError'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.delete("/:id", authenticateToken, userController.deleteUser);

module.exports = router;
