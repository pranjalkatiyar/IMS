const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    pname:{
        type:String,
        required:true
    },
     pdescription:{
        type:String,
        required:true
    },
    pprice:{
        type:String,
        required:true
    },
    pcategory:{
        type:String,
        required:true
    },
});

const product=new mongoose.model("product",productSchema);

module.exports=product;