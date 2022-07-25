import mongoose from 'mongoose';
const schema = mongoose.Schema;

const userSchema = new schema({
    name: {
        type: String,
        min: 2,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },

    createdAt: {
        type: Date,
        default: new Date(),
    },
});
//function that checks if email is already used or not
userSchema.statics.isThisEmailInUse = async function (email) {
    if (!email) throw new Error('Invalid Email');
    try {
        const user = await this.findOne({ email });
        if (user) return false;

        return true;
    } catch (error) {
        console.log(error.message);
        return false;
    }
};

const User = mongoose.model('User', userSchema);

export default User;
