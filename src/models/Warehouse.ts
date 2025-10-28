
import mongoose, { Document, Schema } from 'mongoose';

export interface IWarehouse extends Document {
  warehouseName: string;
  ownerName: string;
  capacity: number;
  location: string;
  description?: string;
   price: number;
  images: string[]; // We will store URLs of the images
}

const WarehouseSchema: Schema = new Schema({
  warehouseName: { type: String, required: true },
  ownerName: { type: String, required: true },
  capacity: { type: Number, required: true },
  location: { type: String, required: true },
  description: { type: String },
   price: { type: Number, required: true },
  images: [{ type: String, required: true }],
}, { timestamps: true });

export default mongoose.model<IWarehouse>('Warehouse', WarehouseSchema);