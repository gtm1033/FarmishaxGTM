import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  fullName: string;
  phone: string;
  password: string;
  PIN : string;
}

const userSchema = new Schema<IUser>({
  fullName: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  PIN: { type: String, required: true }
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
