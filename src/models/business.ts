import mongoose from "mongoose";

const businessSchema = new mongoose.Schema({
    id: String,
    userId: String,
    name: String,
    phone: String
});

const Business = mongoose.model('Business', businessSchema);

export default Business;