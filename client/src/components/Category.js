import React,{useState,useEffect} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import Axios from 'axios';
import './prodCateList.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



export default function Category() {

    const [category, setcategory] = useState({
        name: '',
        description: '',
    });
    const [viewCategory,setCategoryView]=useState([]);
    const [newCategory,setNewCategory]=useState({
        name:'',
        description:''
    });
    const [categoryNameDelete,setCategoryNameDelete]=useState("");

    useEffect(()=>{
        Axios.get('http://localhost:3001/category')
        .then((response)=>{
            setCategoryView(response.data);
        })
    },[category]);


    const handleaddCategory=(event)=>{
        Axios.post("http://localhost:3001/category",{
            name:category.name,
            description:category.description,
            }).then(()=>{
                window.location.reload();
            });
    }

 
    const updateCategoryData=(id)=>{
        Axios.patch("http://localhost:3001/category/update",{
            name:newCategory.name,
            id:id,
            }).then(()=>{
                    window.location.reload();
            });
    }

    const deleteCategoryData=(id)=>{
           
        Axios.delete(`http://localhost:3001/category/delete/${id}`)
        .then((response)=>{
            if(response.status===200){
             window.location.reload();
            }
            else{
                Promise.reject();
            }
        })
        .catch((err)=>{
            alert(err);
            });
    };
            
    

  return (
 
       <Container maxWidth='xl' >
        <Box  >
        <div id="addBox">
        <div className="pageName">
        <h1>Add Category</h1>
        </div>
        {/* ADD CATEGORY */}
        <div>
            <FormControl>
                <input type="text" 
                className="inputField"
                placeholder="Category Name"  
                value={category.name}
                onChange={(e)=>setcategory({
            ...category,    
            name:e.target.value})}
                />
                  <input                                   className="inputField description"
                    type="textbox"
                    placeholder="description"
                value={category.description}
                onChange={(e)=>setcategory({
            ...category,    
                description:e.target.value})}
                />
                <button className="submitButton" variant="contained" type="submit" onClick={handleaddCategory}>Add Category</button>
            </FormControl>

            </div>
            {/* Update Category */}
            </div>

     {/* List of the category with the description */}
      <hr />
      <table id="tableList">
      <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Update Description</th>
            <th>Action</th>
      </tr>
      {viewCategory.map((val)=>{
        return(
            <tr>
                <td>{val.name}</td>
                <td>{val.description}</td>
                <td><TextField id="outlined-basic"
                label="New Category Name"
                variant="outlined" 
                onChange={(e)=>{
                    setNewCategory({
                        ...newCategory,
                        name:e.target.value,
                    });
                }}
                />
                </td>
                <td>
                <Button onClick={()=>updateCategoryData(val._id)}><EditIcon /></Button>
                <Button onClick={()=>deleteCategoryData(val._id)}><DeleteIcon/></Button>
                </td>
            </tr>
        )
      })}
      </table>
        </Box>
      </Container>
    
  );
}
