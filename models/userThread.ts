import mongoose, { Schema, Document } from 'mongoose';

export interface IUserThread extends Document {
  userId: string;
  threadId: string;
  createdAt: Date;
}

const UserThreadSchema: Schema = new Schema({
  userId: { type: String, unique: true, required: true },
  threadId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.UserThread || mongoose.model<IUserThread>('UserThread', UserThreadSchema);
