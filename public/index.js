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

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst body_parser_1 = __importDefault(__webpack_require__(/*! body-parser */ \"body-parser\"));\nconst user_1 = __importDefault(__webpack_require__(/*! ./routes/user */ \"./src/routes/user.ts\"));\nconst business_1 = __importDefault(__webpack_require__(/*! ./routes/business */ \"./src/routes/business.ts\"));\nconst service_1 = __importDefault(__webpack_require__(/*! ./routes/service */ \"./src/routes/service.ts\"));\nconst appointment_1 = __importDefault(__webpack_require__(/*! ./routes/appointment */ \"./src/routes/appointment.ts\"));\nconst availability_1 = __importDefault(__webpack_require__(/*! ./routes/availability */ \"./src/routes/availability.ts\"));\n(__webpack_require__(/*! dotenv */ \"dotenv\").config)();\nconst app = (0, express_1.default)();\n// Middleware\napp.use(body_parser_1.default.json());\n// Connect to MongoDB\ntry {\n    mongoose_1.default.connect(process.env.MONGO_DB_URL);\n    const db = mongoose_1.default.connection;\n    db.on('error', console.error.bind(console, 'connection error:'));\n    db.once('open', () => {\n        console.log('Connected to MongoDB');\n    });\n}\ncatch (error) {\n    console.log(\"Error connecting to MongoDB: \", error.message);\n}\n// Routes\napp.use('/user', user_1.default);\napp.use('/business', business_1.default);\napp.use('/service', service_1.default);\napp.use('/appointment', appointment_1.default);\napp.use('/availability', availability_1.default);\nexports[\"default\"] = app;\n\n\n//# sourceURL=webpack://nodejs-api/./src/app.ts?");

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

/***/ "./src/models/appointment.ts":
/*!***********************************!*\
  !*** ./src/models/appointment.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst update_primary_key_1 = __webpack_require__(/*! utils/update-primary-key */ \"./src/utils/update-primary-key.ts\");\nconst validate_time_1 = __webpack_require__(/*! utils/validate-time */ \"./src/utils/validate-time.ts\");\nconst appointmentSchema = new mongoose_1.default.Schema({\n    _id: { type: Number },\n    userId: { type: Number, ref: \"User\" },\n    serviceId: {\n        type: Number,\n        ref: \"Service\"\n    },\n    businessId: { type: Number, ref: \"Business\" },\n    startTime: { type: String, required: true, validate: validate_time_1.validate },\n    endTime: { type: String, validate: validate_time_1.validate }\n});\n// Auto-increment _id before saving\nappointmentSchema.pre('save', async function (next) {\n    if (this.isNew) {\n        const counter = await (0, update_primary_key_1.updatePrimaryKey)(\"serviceId\");\n        this._id = counter.seq;\n    }\n    next();\n});\nconst Appointment = mongoose_1.default.model('Appointment', appointmentSchema);\nexports[\"default\"] = Appointment;\n\n\n//# sourceURL=webpack://nodejs-api/./src/models/appointment.ts?");

/***/ }),

/***/ "./src/models/availability.ts":
/*!************************************!*\
  !*** ./src/models/availability.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst update_primary_key_1 = __webpack_require__(/*! utils/update-primary-key */ \"./src/utils/update-primary-key.ts\");\nconst validateBreaks = (doc, next) => {\n    for (const breakTime of doc.breaks) {\n        const breakSplit = breakTime.split(\"&\");\n        const breakStartTime = new Date(breakSplit[0]);\n        const breakEndTime = new Date(breakSplit[1]);\n        const startTime = new Date(doc.startTime);\n        const endTime = new Date(doc.endTime);\n        if (breakStartTime < startTime || breakStartTime > endTime || breakEndTime > endTime || breakEndTime < breakStartTime) {\n            const error = new Error(\"Breaks or start/end time are not in the range of availability\");\n            next(error);\n        }\n    }\n};\nconst availabilitySchema = new mongoose_1.default.Schema({\n    _id: { type: Number },\n    businessId: {\n        type: Number,\n        ref: \"Business\"\n    },\n    startTime: { type: String, required: true },\n    endTime: { type: String, required: true },\n    breaks: { type: [String] },\n    userId: { type: Number, ref: \"User\" },\n    serviceId: { type: Number, ref: \"Service\" }\n});\navailabilitySchema.index({ startTime: 1, businessId: 1, serviceId: 1 }, { unique: true });\n// Auto-increment _id before saving\navailabilitySchema.pre('save', async function (next) {\n    if (this.isNew) {\n        const counter = await (0, update_primary_key_1.updatePrimaryKey)(\"appointmentId\");\n        this._id = counter.seq;\n    }\n    const doc = this;\n    const overlappingAvailability = await mongoose_1.default.models.Availability.findOne({\n        businessId: doc.businessId,\n        serviceId: doc.serviceId,\n        $or: [\n            { startTime: { $lt: doc.endTime }, endTime: { $gt: doc.startTime } }\n        ]\n    });\n    if (overlappingAvailability) {\n        const error = new Error('An availability entry overlaps with the existing one for the same businessId and serviceId.');\n        next(error);\n    }\n    validateBreaks(doc, next);\n    next();\n});\navailabilitySchema.pre('findOneAndUpdate', async function (next) {\n    const update = this.getUpdate();\n    const startTime = update.startTime;\n    const endTime = update.endTime;\n    const breaks = update.breaks;\n    const businessId = update.businessId;\n    const serviceId = update.serviceId;\n    const doc = {\n        startTime,\n        endTime,\n        breaks,\n        businessId,\n        serviceId\n    };\n    validateBreaks(doc, next);\n    next();\n});\nconst Availability = mongoose_1.default.model('Availability', availabilitySchema);\nexports[\"default\"] = Availability;\n\n\n//# sourceURL=webpack://nodejs-api/./src/models/availability.ts?");

/***/ }),

/***/ "./src/models/business.ts":
/*!********************************!*\
  !*** ./src/models/business.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst update_primary_key_1 = __webpack_require__(/*! utils/update-primary-key */ \"./src/utils/update-primary-key.ts\");\nconst businessSchema = new mongoose_1.default.Schema({\n    _id: { type: Number },\n    userId: {\n        type: Number,\n        ref: \"User\"\n    },\n    name: { type: String, unique: true, required: true },\n    phoneNumber: { type: String, required: true },\n    address: { type: String },\n    postalCode: { type: String, required: true }\n});\n// Auto-increment _id before saving\nbusinessSchema.pre('save', async function (next) {\n    if (this.isNew) {\n        const counter = await (0, update_primary_key_1.updatePrimaryKey)(\"businessId\");\n        this._id = counter.seq;\n    }\n    next();\n});\nconst Business = mongoose_1.default.model('Business', businessSchema);\nexports[\"default\"] = Business;\n\n\n//# sourceURL=webpack://nodejs-api/./src/models/business.ts?");

/***/ }),

/***/ "./src/models/counter.ts":
/*!*******************************!*\
  !*** ./src/models/counter.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst counterSchema = new mongoose.Schema({\n    _id: { type: String, required: true },\n    seq: { type: Number, default: 0 }\n});\nconst Counter = mongoose.model('Counter', counterSchema);\nexports[\"default\"] = Counter;\n\n\n//# sourceURL=webpack://nodejs-api/./src/models/counter.ts?");

/***/ }),

/***/ "./src/models/service.ts":
/*!*******************************!*\
  !*** ./src/models/service.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst update_primary_key_1 = __webpack_require__(/*! utils/update-primary-key */ \"./src/utils/update-primary-key.ts\");\nconst serviceSchema = new mongoose_1.default.Schema({\n    _id: { type: Number },\n    businessId: {\n        type: Number,\n        ref: \"Business\"\n    },\n    name: { type: String, required: true },\n    price: { type: String, required: true },\n    description: { type: String, required: true },\n    duration: { type: String, match: /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/ }\n});\nserviceSchema.index({ businessId: 1, name: 1 }, { unique: true });\n// Auto-increment _id before saving\nserviceSchema.pre('save', async function (next) {\n    if (this.isNew) {\n        const counter = await (0, update_primary_key_1.updatePrimaryKey)(\"serviceId\");\n        this._id = counter.seq;\n    }\n    next();\n});\nconst Service = mongoose_1.default.model('Service', serviceSchema);\nexports[\"default\"] = Service;\n\n\n//# sourceURL=webpack://nodejs-api/./src/models/service.ts?");

/***/ }),

/***/ "./src/models/user.ts":
/*!****************************!*\
  !*** ./src/models/user.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst mongoose_1 = __importDefault(__webpack_require__(/*! mongoose */ \"mongoose\"));\nconst bcrypt_1 = __importDefault(__webpack_require__(/*! bcrypt */ \"bcrypt\"));\nconst update_primary_key_1 = __webpack_require__(/*! utils/update-primary-key */ \"./src/utils/update-primary-key.ts\");\nconst userSchema = new mongoose_1.default.Schema({\n    _id: { type: Number },\n    name: String,\n    email: { type: String, required: true, unique: true },\n    password: String,\n    usertype: [String]\n});\nuserSchema.pre('save', async function (next) {\n    const doc = this;\n    if (doc.isNew) {\n        const counter = await (0, update_primary_key_1.updatePrimaryKey)(\"userId\");\n        doc._id = counter.seq;\n    }\n    if (doc.isModified('password')) {\n        const salt = await bcrypt_1.default.genSalt(10);\n        doc.password = await bcrypt_1.default.hash(doc.password, salt);\n    }\n    next();\n});\n// Method to compare password\nuserSchema.methods.comparePassword = function (candidatePassword) {\n    return bcrypt_1.default.compare(candidatePassword, this.password);\n};\nconst User = mongoose_1.default.model('User', userSchema);\nexports[\"default\"] = User;\n\n\n//# sourceURL=webpack://nodejs-api/./src/models/user.ts?");

/***/ }),

/***/ "./src/routes/appointment.ts":
/*!***********************************!*\
  !*** ./src/routes/appointment.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst appointment_1 = __importDefault(__webpack_require__(/*! models/appointment */ \"./src/models/appointment.ts\"));\nconst business_1 = __importDefault(__webpack_require__(/*! models/business */ \"./src/models/business.ts\"));\nconst jwt_1 = __webpack_require__(/*! utils/jwt */ \"./src/utils/jwt.ts\");\nconst router = express_1.default.Router();\nrouter.post(\"/add\", async (req, res) => {\n    try {\n        if (!(0, jwt_1.isValidToken)(req)) {\n            return res.status(403).json({ message: 'Invalid token' });\n        }\n        const token = (0, jwt_1.decodeJwtToken)(req);\n        const userId = token.id;\n        const { serviceId, businessId, startTime, endTime } = req.body;\n        //case if appointment already booked\n        const existingAppointment = await appointment_1.default.find({ businessId, serviceId, startTime });\n        if (existingAppointment && existingAppointment.length > 0) {\n            return res.status(400).json({ message: \"Appointment is already booked\" });\n        }\n        else {\n            const newAppointment = new appointment_1.default({\n                userId,\n                serviceId,\n                businessId,\n                startTime,\n                endTime\n            });\n            const appointment = await newAppointment.save();\n            return res.status(201).json({ appointment });\n        }\n    }\n    catch (error) {\n        if (error.code === 11000) {\n            return res.status(400).json({ message: \"Appointment already exists, try another name\" });\n        }\n        else {\n            return res.status(500).json({ message: \"Unable to create new appointment\" });\n        }\n    }\n});\nrouter.put(\"/update/:id\", async (req, res) => {\n    try {\n        if (!(0, jwt_1.isValidToken)(req)) {\n            return res.status(403).json({ message: 'Invalid token' });\n        }\n        const token = (0, jwt_1.decodeJwtToken)(req);\n        const userId = token.id;\n        const appointmentId = req.params.id;\n        const { startTime, endTime } = req.body;\n        const existingAppointment = await appointment_1.default.findById({ _id: appointmentId });\n        const existingBusiness = await business_1.default.findById({ _id: existingAppointment.businessId });\n        if (userId !== existingAppointment.userId || userId !== existingBusiness.userId) {\n            return res.status(401).json({ message: \"Unauthorized for user\" });\n        }\n        if (!existingAppointment) {\n            return res.status(404).json({ message: \"Appointment doesn't exist\" });\n        }\n        const newAppointment = await appointment_1.default.findOneAndUpdate({ _id: appointmentId }, { startTime, endTime });\n        return res.status(201).json(newAppointment);\n    }\n    catch (error) {\n        return res.status(500).json({ message: error.message });\n    }\n});\nrouter.get(\"/:appointmentId\", async (req, res) => {\n    try {\n        const { appointmentId } = req.params;\n        const appointment = await appointment_1.default.findById(appointmentId);\n        if (!appointment) {\n            res.status(404).json({ message: \"No appointment available\" });\n        }\n        else {\n            res.status(201).json({ appointment });\n        }\n    }\n    catch (error) {\n        res.status(500).json({ message: error.message });\n    }\n});\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://nodejs-api/./src/routes/appointment.ts?");

/***/ }),

/***/ "./src/routes/availability.ts":
/*!************************************!*\
  !*** ./src/routes/availability.ts ***!
  \************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst availability_1 = __importDefault(__webpack_require__(/*! models/availability */ \"./src/models/availability.ts\"));\nconst jwt_1 = __webpack_require__(/*! utils/jwt */ \"./src/utils/jwt.ts\");\nconst router = express_1.default.Router();\nrouter.put(\"/update/:id\", async (req, res) => {\n    try {\n        if (!(0, jwt_1.isValidToken)(req)) {\n            return res.status(403).json({ message: 'Invalid token' });\n        }\n        const token = (0, jwt_1.decodeJwtToken)(req);\n        const userId = token.id;\n        const { serviceId, businessId, startTime, endTime, breaks } = req.body;\n        const availabilityId = req.params.id;\n        const availability = await availability_1.default.findById(availabilityId);\n        if (!availability) {\n            return res.status(404).json({ message: 'Availability not found' });\n        }\n        // Ensure the user has permission to update this availability\n        if (availability.userId !== userId) {\n            return res.status(403).json({ message: 'You do not have permission to update this availability' });\n        }\n        else {\n            const updatedAvailability = await availability_1.default.findOneAndUpdate({ _id: availabilityId }, { serviceId, businessId, startTime, endTime, breaks });\n            return res.status(200).json({ updatedAvailability });\n        }\n    }\n    catch (error) {\n        return res.status(500).json({ message: error.message });\n    }\n});\nrouter.post(\"/add\", async (req, res) => {\n    try {\n        if (!(0, jwt_1.isValidToken)(req)) {\n            res.status(403).json({ message: 'Invalid token' });\n        }\n        const token = (0, jwt_1.decodeJwtToken)(req);\n        const userId = token.id;\n        const { serviceId, businessId, startTime, endTime, breaks } = req.body;\n        const newAppointment = new availability_1.default({\n            userId,\n            serviceId,\n            businessId,\n            startTime,\n            endTime,\n            breaks\n        });\n        const appointment = await newAppointment.save();\n        res.status(201).json({ appointment });\n    }\n    catch (error) {\n        res.status(500).json({ message: error.message });\n    }\n});\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://nodejs-api/./src/routes/availability.ts?");

/***/ }),

/***/ "./src/routes/business.ts":
/*!********************************!*\
  !*** ./src/routes/business.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst router = express_1.default.Router();\nconst business_1 = __importDefault(__webpack_require__(/*! ../models/business */ \"./src/models/business.ts\"));\nconst jwt_1 = __webpack_require__(/*! utils/jwt */ \"./src/utils/jwt.ts\");\nconst service_1 = __importDefault(__webpack_require__(/*! models/service */ \"./src/models/service.ts\"));\nrouter.post('/add', async (req, res) => {\n    try {\n        if (!(0, jwt_1.isValidToken)(req)) {\n            return res.status(403).json({ message: 'Invalid token' });\n        }\n        const { name, phoneNumber, address, postalCode } = req.body;\n        const token = (0, jwt_1.decodeJwtToken)(req);\n        const business = new business_1.default({\n            name,\n            phoneNumber,\n            userId: parseInt(token.id),\n            address,\n            postalCode\n        });\n        const newBusiness = await business.save();\n        return res.status(201).json(newBusiness);\n    }\n    catch (error) {\n        if (error.code === 11000) {\n            return res.status(400).json({ message: \"Business already exists, try another name\" });\n        }\n        else {\n            return res.status(500).json({ message: \"Unable to create new business\" });\n        }\n    }\n});\nrouter.put(\"/update/:businessId\", async (req, res) => {\n    try {\n        if (!(0, jwt_1.isValidToken)(req)) {\n            return res.status(403).json({ message: 'Invalid token' });\n        }\n        const { businessId } = req.params;\n        const { name, phoneNumber, address, postalCode } = req.body;\n        const token = (0, jwt_1.decodeJwtToken)(req);\n        const userId = token.id;\n        const business = await business_1.default.findById({ _id: businessId });\n        if (userId != business.userId) {\n            return res.status(403).json({ message: \"Not allowed for this user\" });\n        }\n        else {\n            const updatedBusiness = await business_1.default.findOneAndUpdate({ _id: businessId }, { name, phoneNumber, address, postalCode });\n            return res.status(201).json({ updatedBusiness });\n        }\n    }\n    catch (error) {\n        return res.status(500).json({ message: error.message });\n    }\n});\nrouter.get(\"/:businessId\", async (req, res) => {\n    try {\n        const { businessId } = req.params;\n        const business = await business_1.default.findById(businessId);\n        if (!business) {\n            return res.status(404).json({ message: \"Business not found.\" });\n        }\n        res.status(201).json(business);\n    }\n    catch (error) {\n        res.status(500).json({ error: error.message });\n    }\n});\nrouter.get(\"/get-business-services/:businessId\", async (req, res) => {\n    try {\n        const { businessId } = req.params;\n        const services = await service_1.default.find({ businessId });\n        // Check if any services were found\n        if (!services || services.length === 0) {\n            return res.status(404).json({ message: \"No services found for the specified businessId.\" });\n        }\n        // If services are found, return them as a response\n        res.json(services);\n    }\n    catch (error) {\n        res.status(500).json({ error: error.message });\n    }\n});\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://nodejs-api/./src/routes/business.ts?");

/***/ }),

/***/ "./src/routes/service.ts":
/*!*******************************!*\
  !*** ./src/routes/service.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst jwt_1 = __webpack_require__(/*! utils/jwt */ \"./src/utils/jwt.ts\");\nconst router = express_1.default.Router();\nconst service_1 = __importDefault(__webpack_require__(/*! ../models/service */ \"./src/models/service.ts\"));\nconst availability_1 = __importDefault(__webpack_require__(/*! models/availability */ \"./src/models/availability.ts\"));\nrouter.post(\"/add\", async (req, res) => {\n    try {\n        if (!(0, jwt_1.isValidToken)(req)) {\n            return res.status(403).json({ message: 'Invalid token' });\n        }\n        const { businessId, name, price, description, duration } = req.body;\n        const service = new service_1.default({\n            businessId,\n            name,\n            price,\n            description,\n            duration\n        });\n        const newService = await service.save();\n        res.status(201).json(newService);\n    }\n    catch (error) {\n        if (error.code === 11000) {\n            res.status(400).json({ message: \"This service already exists for this service.\" });\n        }\n        else {\n            res.status(400).json({ message: \"Couldn't add service\" });\n        }\n    }\n});\nrouter.get(\"/:serviceId\", async (req, res) => {\n    try {\n        const { serviceId } = req.params;\n        const service = service_1.default.findById(serviceId);\n        if (!service) {\n            res.status(404).json({ message: \"Service not found.\" });\n        }\n        else {\n            res.status(201).json({ service });\n        }\n    }\n    catch (error) {\n        res.status(500).json({ error: error.message });\n    }\n});\nrouter.get(\"/get-service-availabilities/:serviceId\", async (req, res) => {\n    try {\n        const { serviceId } = req.params;\n        const availabilities = await availability_1.default.find({ serviceId });\n        if (!availabilities || availabilities.length === 0) {\n            res.status(404).json({ message: \"No availabilities found for this service.\" });\n        }\n        else {\n            res.status(201).json({ availabilities });\n        }\n    }\n    catch (error) {\n        res.status(500).json({ error: error.message });\n    }\n});\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://nodejs-api/./src/routes/service.ts?");

/***/ }),

/***/ "./src/routes/user.ts":
/*!****************************!*\
  !*** ./src/routes/user.ts ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst router = express_1.default.Router();\nconst user_1 = __importDefault(__webpack_require__(/*! ../models/user */ \"./src/models/user.ts\"));\nconst jwt_1 = __webpack_require__(/*! utils/jwt */ \"./src/utils/jwt.ts\");\nconst user_type_1 = __webpack_require__(/*! constants/user-type */ \"./src/constants/user-type.ts\");\nconst business_1 = __importDefault(__webpack_require__(/*! models/business */ \"./src/models/business.ts\"));\n// Create a new user\nrouter.post('/register', async (req, res) => {\n    try {\n        if (!(0, user_type_1.isUserTypeValid)(req.body.usertype)) {\n            throw new Error(\"User type is not valid\");\n        }\n        const user = new user_1.default({\n            name: req.body.name,\n            email: req.body.email,\n            password: req.body.password,\n            usertype: [req.body.usertype]\n        });\n        const newUser = await user.save();\n        res.status(201).json(newUser);\n    }\n    catch (err) {\n        //Block to add new usertype to existing account\n        /**\n         * @todo refactor this later on\n         *  */\n        const user = await user_1.default.findOne({ email: req.body.email });\n        if (!user.usertype.includes(req.body.usertype)) {\n            const updatedUserType = user.usertype;\n            updatedUserType.push(req.body.usertype);\n            Object.assign(user, { usertype: updatedUserType });\n            const newUser = await user.save();\n            res.status(201).json(newUser);\n        }\n        if (err.code === 11000) {\n            // Duplicate email\n            res.status(400).json({ message: 'Email already exists' });\n        }\n        else {\n            res.status(400).json({ message: err.message });\n        }\n    }\n});\n// Login a user\nrouter.post('/login', async (req, res) => {\n    try {\n        const user = await user_1.default.findOne({ email: req.body.email });\n        if (!user) {\n            return res.status(403).json({ message: 'Invalid email or password' });\n        }\n        const isMatch = await user.comparePassword(req.body.password);\n        if (!isMatch) {\n            return res.status(401).json({ message: 'Invalid email or password' });\n        }\n        const token = (0, jwt_1.generateToken)(user);\n        res.status(200).json({ message: 'Login successful', token });\n    }\n    catch (err) {\n        res.status(500).json({ message: err.message });\n    }\n});\nrouter.get(\"/get-user-businesses/:userId\", async (req, res) => {\n    try {\n        const { userId } = req.params;\n        const businesses = await business_1.default.find({ userId });\n        if (businesses && businesses.length > 0) {\n            res.status(201).json(businesses);\n        }\n        else {\n            res.status(404).json({ message: \"No business for this user\" });\n        }\n    }\n    catch (error) {\n        res.status(500).json({ error: error.message });\n    }\n});\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://nodejs-api/./src/routes/user.ts?");

/***/ }),

/***/ "./src/utils/jwt.ts":
/*!**************************!*\
  !*** ./src/utils/jwt.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.decodeJwtToken = exports.isValidToken = exports.generateToken = void 0;\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nconst secret = 'your-secret-key'; // Use an environment variable in a real application\nconst extractToken = (req) => {\n    const authHeader = req.headers[\"authorization\"];\n    const token = authHeader && authHeader.split(\" \")[1];\n    return token;\n};\nconst generateToken = (user) => {\n    return jsonwebtoken_1.default.sign({ id: user._id, email: user.email, name: user.name }, secret, { expiresIn: '72h' });\n};\nexports.generateToken = generateToken;\nconst isValidToken = (req) => {\n    try {\n        const token = extractToken(req);\n        return jsonwebtoken_1.default.verify(token, secret, (err, user) => {\n            if (err) {\n                return false;\n            }\n            return true;\n        });\n    }\n    catch (err) {\n        return false; // Unauthorized if no token is provided\n    }\n};\nexports.isValidToken = isValidToken;\n/**\n * Function to decode a JWT token.\n * @param {string} token - The JWT token to decode.\n * @returns {object} - The decoded payload of the JWT.\n */\nconst decodeJwtToken = (req) => {\n    try {\n        const decoded = jsonwebtoken_1.default.decode(extractToken(req), { complete: true });\n        return decoded ? decoded.payload : null;\n    }\n    catch (error) {\n        console.error('Error decoding JWT:', error);\n        return null;\n    }\n};\nexports.decodeJwtToken = decodeJwtToken;\n\n\n//# sourceURL=webpack://nodejs-api/./src/utils/jwt.ts?");

/***/ }),

/***/ "./src/utils/update-primary-key.ts":
/*!*****************************************!*\
  !*** ./src/utils/update-primary-key.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.updatePrimaryKey = void 0;\nconst counter_1 = __importDefault(__webpack_require__(/*! models/counter */ \"./src/models/counter.ts\"));\nconst updatePrimaryKey = async (id) => {\n    return counter_1.default.findByIdAndUpdate({ _id: id }, { $inc: { seq: 1 } }, { new: true, upsert: true });\n};\nexports.updatePrimaryKey = updatePrimaryKey;\n\n\n//# sourceURL=webpack://nodejs-api/./src/utils/update-primary-key.ts?");

/***/ }),

/***/ "./src/utils/validate-time.ts":
/*!************************************!*\
  !*** ./src/utils/validate-time.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.validate = void 0;\nfunction validateTime(value) {\n    const regex = /^(Sun|Mon|Tue|Wed|Thu|Fri|Sat) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \\d{2} \\d{4} \\d{2}:\\d{2}:\\d{2} GMT[+-]\\d{4} \\([A-Za-z ]+\\)$/;\n    const date = new Date(value);\n    return !isNaN(date.getTime()) && !isNaN(date.getDay()) && !isNaN(date.getFullYear()) && !isNaN(date.getHours()) && !isNaN(date.getMinutes()) && regex.test(value);\n}\nexports.validate = {\n    validator: (value) => validateTime(value),\n    message: props => `${props.value} is not a valid date!`\n};\n\n\n//# sourceURL=webpack://nodejs-api/./src/utils/validate-time.ts?");

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