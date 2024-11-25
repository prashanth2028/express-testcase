import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
},{timestamps: true});

UserSchema.pre('validate', async function(next) {
    try {
        if (this.isModified('password')) {
            this.password = await bcrypt.hash(this.password, 10); 
        }
        next(); 
    } catch (error) {
        next(error);
    }
});

export default mongoose.model('User', UserSchema);