import mongoose from 'mongoose';

let studentsSchema = new mongoose.Schema({ 
    sname: String,
    fname: String,
    address: String,
    mobile: String,
    cnic: String,
    email: String,
    password: String,    
});

const Students = mongoose.model('students', studentsSchema);
export { Students as StudentRout }
