import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema;


const productSchema = mongoose.Schema({
 
    title: {
       type: String,
       maxLength:32,
       required: true
    },
    description:{
       type: String,
       required: true,
       maxLength:2000
    },
    image:{
        data: Buffer,
        contentType: String
    },
    // author:{

    // },
    // category:{

    // }


}, { timestamps: true })

 module.exports = mongoose.model("Product", productSchema)