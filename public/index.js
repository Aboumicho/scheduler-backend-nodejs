/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ \"body-parser\"));\nconst user_1 = __importDefault(__webpack_require__(/*! ./routes/user */ \"./src/routes/user.ts\"));\nconst app = (0, express_1.default)();\n// Middleware\napp.use(body_parser_1.default.json());\n// Connect to MongoDB\nmongoose_1.default.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });\nconst db = mongoose_1.default.connection;\ndb.on('error', console.error.bind(console, 'connection error:'));\ndb.once('open', () => {\n    console.log('Connected to MongoDB');\n});\n// Routes\napp.use('/users', user_1.default);\nexports[\"default\"] = app;\n\n\n//# sourceURL=webpack://nodejs-api/./src/app.ts?");

/***/ }),

/***/ "./src/constants/user-type.ts":
/*!************************************!*\
  !*** ./src/constants/user-type.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.isUserTypeValid = exports.USERTYPE = void 0;\nvar USERTYPE;\n(function (USERTYPE) {\n    USERTYPE[USERTYPE[\"ADMIN\"] = 0] = \"ADMIN\";\n    USERTYPE[USERTYPE[\"CUSTOMER\"] = 1] = \"CUSTOMER\";\n    USERTYPE[USERTYPE[\"BUSINESSOWNER\"] = 2] = \"BUSINESSOWNER\";\n})(USERTYPE || (exports.USERTYPE = USERTYPE = {}));\n;\nfunction isUserTypeValid(value) {\n    for (const key of Object.keys(USERTYPE)) {\n        if (USERTYPE[key] === value) {\n            return true;\n        }\n    }\n    return false;\n}\nexports.isUserTypeValid = isUserTypeValid;\n\n\n//# sourceURL=webpack://nodejs-api/./src/constants/user-type.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst app_1 = __importDefault(__webpack_require__(/*! ./app */ \"./src/app.ts\"));\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\nconst port = 5000;\n// Start server\napp_1.default.listen(port, () => {\n    console.log(`Server is running on http://localhost:${port}`);\n});\n\n\n//# sourceURL=webpack://nodejs-api/./src/index.ts?");

/***/ }),

/***/ "./src/models/counter.ts":
/*!*******************************!*\
  !*** ./src/models/counter.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst counterSchema = new mongoose.Schema({\n    _id: { type: String, required: true },\n    seq: { type: Number, default: 0 }\n});\nconst Counter = mongoose.model('Counter', counterSchema);\nexports[\"default\"] = Counter;\n\n\n//# sourceURL=webpack://nodejs-api/./src/models/counter.ts?");

/***/ }),

/***/ "./src/models/user.ts":
/*!****************************!*\
  !*** ./src/models/user.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst counter_1 = __importDefault(__webpack_require__(/*! ./counter */ \"./src/models/counter.ts\"));\nconst bcrypt_1 = __importDefault(__webpack_require__(/*! bcrypt */ \"bcrypt\"));\nconst userSchema = new mongoose_1.default.Schema({\n    _id: { type: Number },\n    name: String,\n    email: { type: String, required: true, unique: true },\n    password: String,\n    usertype: [String]\n});\nuserSchema.pre('save', async function (next) {\n    const doc = this;\n    if (doc.isNew) {\n        const counter = await counter_1.default.findByIdAndUpdate({ _id: 'userId' }, { $inc: { seq: 1 } }, { new: true, upsert: true });\n        doc._id = counter.seq;\n    }\n    if (doc.isModified('password')) {\n        const salt = await bcrypt_1.default.genSalt(10);\n        doc.password = await bcrypt_1.default.hash(doc.password, salt);\n    }\n    next();\n});\n// Method to compare password\nuserSchema.methods.comparePassword = function (candidatePassword) {\n    return bcrypt_1.default.compare(candidatePassword, this.password);\n};\nconst User = mongoose_1.default.model('User', userSchema);\nexports[\"default\"] = User;\n\n\n//# sourceURL=webpack://nodejs-api/./src/models/user.ts?");

/***/ }),

/***/ "./src/routes/user.ts":
/*!****************************!*\
  !*** ./src/routes/user.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst router = express_1.default.Router();\nconst user_1 = __importDefault(__webpack_require__(/*! ../models/user */ \"./src/models/user.ts\"));\nconst jwt_1 = __webpack_require__(/*! utils/jwt */ \"./src/utils/jwt.ts\");\nconst user_type_1 = __webpack_require__(/*! constants/user-type */ \"./src/constants/user-type.ts\");\n// Create a new user\nrouter.post('/register', async (req, res) => {\n    try {\n        if (!(0, user_type_1.isUserTypeValid)(req.body.usertype)) {\n            throw new Error(\"User type is not valid\");\n        }\n        const user = new user_1.default({\n            name: req.body.name,\n            email: req.body.email,\n            password: req.body.password,\n            usertype: [req.body.usertype]\n        });\n        const newUser = await user.save();\n        res.status(201).json(newUser);\n    }\n    catch (err) {\n        const user = await user_1.default.findOne({ email: req.body.email });\n        if (!user.usertype.includes(req.body.usertype)) {\n            const updatedUserType = user.usertype;\n            updatedUserType.push(req.body.usertype);\n            Object.assign(user, { usertype: updatedUserType });\n            const newUser = await user.save();\n            res.status(201).json(newUser);\n        }\n        else if (err.code === 11000) {\n            // Duplicate email\n            res.status(400).json({ message: 'Email already exists' });\n        }\n        else {\n            res.status(400).json({ message: err.message });\n        }\n    }\n});\n// Login a user\nrouter.post('/login', async (req, res) => {\n    try {\n        const user = await user_1.default.findOne({ email: req.body.email });\n        if (!user) {\n            return res.status(400).json({ message: 'Invalid email or password' });\n        }\n        const isMatch = await user.comparePassword(req.body.password);\n        if (!isMatch) {\n            return res.status(400).json({ message: 'Invalid email or password' });\n        }\n        const token = (0, jwt_1.generateToken)(user);\n        res.status(200).json({ message: 'Login successful', token });\n    }\n    catch (err) {\n        res.status(500).json({ message: err.message });\n    }\n});\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://nodejs-api/./src/routes/user.ts?");

/***/ }),

/***/ "./src/utils/jwt.ts":
/*!**************************!*\
  !*** ./src/utils/jwt.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.verifyToken = exports.generateToken = void 0;\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nconst secret = 'your-secret-key'; // Use an environment variable in a real application\nconst generateToken = (user) => {\n    return jsonwebtoken_1.default.sign({ id: user._id, email: user.email, name: user.name }, secret, { expiresIn: '72h' });\n};\nexports.generateToken = generateToken;\nconst verifyToken = (token) => {\n    try {\n        return jsonwebtoken_1.default.verify(token, secret);\n    }\n    catch (err) {\n        return null;\n    }\n};\nexports.verifyToken = verifyToken;\n\n\n//# sourceURL=webpack://nodejs-api/./src/utils/jwt.ts?");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("body-parser");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	
/******/ })()
;