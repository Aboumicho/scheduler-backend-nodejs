import Counter from "models/counter";

export const updatePrimaryKey = async (id: string) => {
    return Counter.findByIdAndUpdate(
        { _id: id },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
}