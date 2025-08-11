import mongoose from 'mongoose';

const tableDataSchema = new mongoose.Schema({
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Table',
    required: true
  },
 data: {}
}, { strict: false, timestamps: true });
// Mencegah error OverwriteModelError
export default mongoose.models.TableData || mongoose.model('TableData', tableDataSchema);
