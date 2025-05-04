import mongoose from 'mongoose';
import crypto from 'crypto';

// https://mongoosejs.com/docs/typescript/schemas.html
interface IUser {
    username: string;
    passwordHash: string;
    salt: string;
    role: 'user' | 'admin';
    setPassword(password: string): void;
    validatePassword(password: string): boolean;
}

const userSchema = new mongoose.Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    passwordHash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true });

userSchema.methods.setPassword = function (plainPassword: string): void {
    this.salt = crypto.randomBytes(16).toString('hex'); // randomize the password and make it hex format
    this.passwordHash = crypto // take the plain password, and then pass it through the params; salt the random password, 1000 = iterations, output len, and finally the sha512 is the hashing algorithm. 
        .pbkdf2Sync(plainPassword, this.salt, 1000, 64, 'sha512')
        .toString('hex');
};

userSchema.methods.validatePassword = function (plainPassword: string): boolean {
    const hash = crypto
        .pbkdf2Sync(plainPassword, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    return this.passwordHash === hash;
};


const User: mongoose.Model<IUser> = mongoose.model<IUser>('User', userSchema);
export default User;


/* References >>>
    1) https://www.w3schools.com/mongodb/mongodb_schema_validation.php
    2) https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
    3) https://www.mongodb.com/docs/manual/core/schema-validation/
    4) https://stackoverflow.com/questions/66383516/add-mongoose-validation-for-phone-numbers
    5) https://www.geeksforgeeks.org/mongoose-schematype/
    6) https://mongoosejs.com/docs/guide.html
    7) https://stackoverflow.com/questions/62908969/password-hashing-in-nodejs-using-built-in-crypto
*/