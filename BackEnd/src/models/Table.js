import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, default: '' }, // tambahkan ini
    fields: [{ type: String }]
});

export default mongoose.model('Table', tableSchema);
