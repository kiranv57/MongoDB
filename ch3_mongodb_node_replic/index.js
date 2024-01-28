// establish mongodb connection using mongoose

//import mongoose and save it
const mongoose = require('mongoose');

//importing environment variables
require('dotenv').config;


//create a schema

const userSchema = mongoose.Schema({
     // Basic Information
     firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // Address
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
    },
    // Contact Information
    phone: {
        type: String,
    },
    // Personal Information
    dateOfBirth: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
    },
    // Interests
    hobbies: {
        type: [String],
    },
    // Radio Options
    employmentStatus: {
        type: String,
        enum: ['Employed', 'Unemployed', 'Student', 'Retired'],
    },
    // Checkboxes
    notifications: {
        email: {
            type: Boolean,
            default: true,
        },
        sms: {
            type: Boolean,
            default: false,
        },
    },
    // Social Media
    socialMedia: {
        facebook: String,
        twitter: String,
        linkedIn: String,
        // Add other social media platforms as needed
    },
    educationalQualifications:{
        HighestQualification: {
            Qualifications: [{
                type: String,
                enum: ['HighSchool', 'Diploma', 'Degree', 'PostGraduation'],
            }],
            Degree_completion: {
                type:Boolean,
                default:false,   
            },
            stream: {
                streamName: String,    
                graduatedIn: Number,
                
            }
        }
    }


});

//create a model instance
const userModel = mongoose.model("User", userSchema);


const uri = process.env.CONN_STRING;

// connect to the mongodb atlas using mongoose connect method
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })


//import express and create server instance
const app = require('express')();


//create get method, specify endpoint and respective http response callback
app.get('/', (req, res) => {
    console.log("server is running");
})

//create a port
const port = 8080;
 
//get the server instance to listen to port number
app.listen(port, ()=>{
    console.log("connected");
})



//create an async function, within it create model instance through constructor instantiation, and save it , 
// and call save() method to make changes to db. 
async function insert() {
    try {
         
            const newUser = new userModel( {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john.doe@example.com',
            password: 'hashedpassword', // Hash the password before storing it
            address: {
                street: '123 Main St',
                city: 'Anytown',
                state: 'CA',
                postalCode: '12345',
            },
            phone: '555-1234',
            dateOfBirth: new Date('1990-01-01'),
            gender: 'Male',
            hobbies: ['Reading', 'Gaming'],
            employmentStatus: 'Employed',
            notifications: {
                email: true,
                sms: false,
            },
            socialMedia: {
                facebook: 'https://facebook.com/johndoe',
                twitter: 'https://twitter.com/johndoe',
                linkedIn: 'https://linkedin.com/in/johndoe',
            },
            educationalQualifications:{
                HighestQualification: {
                    Qualifications:  ['HighSchool', 'Diploma', 'Degree'],
                    Degree_completion: true,
                    stream: {
                        streamName: "Engineering",    
                        graduatedIn: "2020",
                    }
                }
            }
        
        
        });
   
            newUser.save();
    }  catch (error) {
        console.error(error);
        
    }
  }
  insert();
  
  
  
  