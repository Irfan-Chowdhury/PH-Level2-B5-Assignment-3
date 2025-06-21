import { Model, model, Schema } from "mongoose";
import { IAddress, IUser, UserInstanceMethods } from "../interfaces/user.interface";
import validator from "validator";
import bcrypt from "bcryptjs";


const addressSchema = new Schema<IAddress>({
    city: { type: String },
    street: { type: String },
    zip: { type: Number }
}, {
    _id: false
});

// const userSchema = new Schema<IUser>(
const userSchema = new Schema<IUser, Model<IUser>, UserInstanceMethods>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "First Name must be atleast 3 characters, got {VALUE}"],
            maxlength: 10
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: [3, "Name must be 3 characters"],
            maxlength: 10
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            unique: [true, "Email already exists"],
            // validate: {
            //     validator: function (value) {
            //         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            //     },
            //     message: function (props) {
            //         return `Email ${props.value} is not valid email`
            //     }
            // }
            validate: [validator.isEmail, "Invalid Email sent {VALUE}"]

        },
        age: {
            type: Number,
            required: true,
            min: [18, 'Age Must be at least 18, got {VALUE}'],
            max: 60,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            uppercase: true,

            enum: ['USER', 'ADMIN', 'SUPERADMIN'],
            default: 'USER'
        },
        address: {
            type: addressSchema
        },
        
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

userSchema.method("hashPassword", async function (plainPassword: string)  {
    const password = await bcrypt.hash(plainPassword, 10);
    this.password = password;    
    return password; 
});

export const User = model("User", userSchema)