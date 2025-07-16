import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
    name: { type: String, required: true },
    fields: [{ type: String }]
});

export default mongoose.model('Data', tableSchema);