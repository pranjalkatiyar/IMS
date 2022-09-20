import React,{useState,useEffect} from 'react';
import TextField from '@mui/material/TextField';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Axios from 'axios';
import { useParams } from 'react-router';
import { useNavigate } from "react-router-dom";
import './prodCateList.css';

export default function Update(){

    const {id}=useParams();
    const navigate=useNavigate();
     

    const [updateProducts, setUpdateProducts] = useState({
        description: '',
        price: '',
        category: '',
    });   

    const [viewCategorySelect,setCategorySelect]=useState([]);
    const [viewProduct,setProductView]=useState();
    const productId=id;

    useEffect(async ()=>{
             Axios.get('http://localhost:3001/category')
        .then((response)=>{
            setCategorySelect(response.data);
        });
        
    },[]);

    const updateProductsData=()=>{
        Axios.patch(`http://localhost:3001/products/update/${id}`,{
            description:updateProducts.description,
            price:updateProducts.price,
            category:updateProducts.category,
            })
            .then(()=>{
                    navigate("/products");
            }).catch((error)=>{
                alert("error",error);
    });
    };

 
  return (
    <>
 
               {/* Update Products  */}
               <div id="addBox">
               <div className="pageName">
               <h1> Update Product</h1>
               <h1>{viewProduct}</h1>
               </div>
               <div>
               <FormControl>
               <label htmlFor="Select Category"></label>
               <select className="inputField dropdownCategory" onChange={e=>setUpdateProducts({
                   ...updateProducts,
                   category: e.currentTarget.value
               })} name="Products" id="Products">
               <option value="none" >Select Category</option>
               {viewCategorySelect.map((res)=>{
                     return <option value={res.id}>{res.name}</option>
               })}
               </select>
                   
                     <input
                   placeholder="Products Description"
                   className="inputField description"               
                   onChange={(e)=>setUpdateProducts({
               ...updateProducts,    
                   description:e.target.value})}
                   />
                   <input
                   placeholder="Products Price"
                     className="inputField  "
                   onChange={(e)=>setUpdateProducts({
               ...updateProducts,    
                   price:e.target.value})}
                   />
                   <button className="submitButton" type="submit" onClick={()=>updateProductsData()}>Update</button>
               </FormControl>

               </div>
               </div>

               </>
  )
}
