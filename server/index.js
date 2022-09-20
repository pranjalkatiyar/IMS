const express=require('express');
const bodyParser=require('body-parser');
const app=express();
const mongoose=require('mongoose');
const cors=require('cors');
const CategoryModel=require('./models/category');
const ProductModel=require('./models/products');
require('dotenv').config()
 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());

mongoose.connect(process.env.MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
 
}).then(()=>{
    console.log("connection successful");
}).catch((e)=>{
    alert("no connection:,",e);
});

// category routes

app.post('/category',(req,res)=>{
const category=new CategoryModel({
    name:req.body.name,
    description:req.body.description,
});
category.save().then(()=>{
   console.log("Saved category")
}).catch((err)=>{
    res.send(err);
});
    res.send("hello from the server");
});

app.patch('/category/update',async (req,res)=>{
    const id=req.body.id;
    const name=req.body.name;
    // const description=req.body.description;
    CategoryModel.findByIdAndUpdate(id,(err,updatedCategory)=>{
        updatedCategory.name=name;
        updatedCategory.save();
    });
});

app.delete('/category/delete/:id',async (req,res)=>{
    const id=req.params.id;
    CategoryModel.findByIdAndRemove(id,(err,deletedCategory)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("deleted");
        }
    });
    res.send("deleted");    
});


app.get('/category',(req,res)=>{
    CategoryModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    });
});

 


// product routes
app.patch('/products/update/:id',async (req,res)=>{
    console.log("Entered the product patch")
    console.log(req.params.id);
    const id=req.params.id;
  
    const description=req.body.description;
    const price=req.body.price;
    const category=req.body.category;
 
    ProductModel.findByIdAndUpdate(id,(err,updatedProduct)=>{
         
        updatedProduct.pdescription=description;
        updatedProduct.pprice=price;
        updatedProduct.pcategory=category;
        updatedProduct.save();
    })
    .then(()=>{
        console.log("updated product");
    })
    .catch((err)=>{
        console.log("err category",err);
    }
    );
}
);

app.get('/products/get/:id',(req,res)=>{
    const id=req.params.id;
    ProductModel.findById({},(err,result)=>{
        if(err){
            res.send(err);
        }
        console.log(result);
        res.send(result);
    });
});


app.get('/products',(req,res)=>{
    ProductModel.find({},(err,result)=>{
        if(err){
            res.send(err);
        }
        res.send(result);
    });
});

app.post('/products',async(req,res)=>{
    const product=new ProductModel({
      pname:req.body.pname,
        pdescription:req.body.pdescription,
        pprice:req.body.pprice,
        pcategory:req.body.pcategory,
    });

    await product.save()
    .then(()=>{
        console.log("product saved");
        res.send("product saved");
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.delete('/products/delete/:id',async (req,res)=>{
    const id=req.params.id;
    ProductModel.findByIdAndRemove(id,(err,deletedProduct)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("deletedProduct");
        }
    });
    res.send("deleted");    
});


app.listen("3001",()=>{
    console.log("Server started on port 3001");
});