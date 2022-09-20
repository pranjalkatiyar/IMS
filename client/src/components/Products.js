import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Axios from 'axios';
import EditIcon from '@mui/icons-material/Edit';
import Update from './Update';
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import './prodCateList.css';

export default function Products() {

    const navigate = useNavigate();

    const [products, setProducts] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
    });
    
    
    const [viewProduct,setProductView]=useState([]);
    const [viewCategorySelect,setCategorySelect]=useState([]);


    useEffect(()=>{
        Axios.get('http://localhost:3001/products')
        .then((response)=>{
            setProductView(response.data);
        });
        Axios.get('http://localhost:3001/category')
        .then((response)=>{
            setCategorySelect(response.data);
        });
    },[]);


    const handleaddProducts=(event)=>{
        Axios.post("http://localhost:3001/products",{
            pname:products.name,
            pdescription:products.description,
            pprice:products.price,
            pcategory:products.category,
            }).then((res)=>{
                window.location.reload();
                if(res.status!=200)
                {
                    alert(res)
                }
                console.log("success");
            });
     }; 

     const deleteProductData=(id)=>{
        Axios.delete(`http://localhost:3001/products/delete/${id}`)
        .then((response)=>{
            if(response.status===200){
             window.location.reload();
            }
            else{
                Promise.reject();
            }
        })
        .catch((err)=>{
            console.log(err);
            });
    };
            

  return (
 
       <Container maxWidth='xl' >
        <Box>
        <div id="addBox">
        <div className="pageName">
        <h1> Add Product</h1>
        </div>
        {/* ADD Products */}
        <div>
            <FormControl>
            <label htmlFor="Select Category"></label>

            {/* select category */}
            <select className='inputField dropdownCategory' onChange={(e)=>setProducts({
                ...products,
                category: e.target.value
            })} name="Products" id="Products">
            <option value="none" >Select Category</option>
            {viewCategorySelect.map((val)=>{
                {console.log("val",val.name)}
                return <option value={val.name}>{val.name}</option>
            })}
            </select>

            {/* Product name */}
                <input type="text" 
                className='inputField'
                placeholder="Product Name"
                value={products.name}
                onChange={(e)=> setProducts({
                    ...products,
                    name: e.target.value
                })}
                />

                {/* Description */}
                  <input 
                    type="text"
                    className='inputField description'
                    placeholder="Description"
                value={products.description}
                onChange={(e)=>setProducts({
            ...products,    
                description:e.target.value})}
                />

                {/* Price */}
                <input
                    type="text"
                    className='inputField'
                    placeholder="Price"
                value={products.price}
                onChange={(e)=>setProducts({
            ...products,    
                price:e.target.value})}
                />
                <button className="submitButton" type="submit" onClick={handleaddProducts}>Add</button>
            </FormControl>
            </div>
            </div>

            <hr />
            <table id="tableList">
                <tr>
                    <th>Product Name</th>
                    <th>Product Description</th>
                    <th>Product Price</th>
                    <th>Product Category</th>
                    <th>Action</th>
                </tr>

            {/* LIst view of the product */}
            {viewProduct.map((val)=>{
        return(
            <tr>
            
                <td>{val.pname}</td>
                <td>{val.pdescription}</td>
                <td>{val.pprice}</td>
                <td>{val.pcategory}</td>
                <td>
                <a href={`/products/update/${val._id}`}><EditIcon /></a>
                <Button onClick={()=>deleteProductData(val._id)}><DeleteIcon/></Button>
                </td>
             </tr>
        )
      })}
</table>


        </Box>
      </Container>
    
  );
}
