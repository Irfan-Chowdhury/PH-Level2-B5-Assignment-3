import { model, Schema } from "mongoose";
import { IAddress, IUser } from "../interfaces/user.interface";
import validator from "validator";


const addressSchema = new Schema<IAddress>({
    city: { type: String },
    street: { type: String },
    zip: { type: Number }
}, {
    _id: false
});

const userSchema = new Schema<IUser>(
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
        // address: {
        //     street: {type: String},
        //     city: {type: String},
        //     zip: {type: Number}
        // }
        address: {
            type: addressSchema
        },
        
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

export const User = model("User", userSchema)