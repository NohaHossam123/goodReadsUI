import React from 'react';
import { useState, useEffect } from "react";
import axios from 'axios';
import   {Link}  from "react-router-dom";


const Category = (props) => {

    const [categories, setCategories] = useState([]); 
    useEffect(() => {
    axios.get(`http://localhost:5000/categories`).then((res) => {
      console.log(res)
    setCategories(res.data);
    }).catch(err => {
    console.log(err.message);
    });
    }, []);
    return(
      <div>
          {
        categories.map(cat =>
          <div class="card">
            <div class="card-body">
               <Link  key={cat.id} to={`/categories/${cat.name}/${cat._id}`}>
                <h5 class="card-title">{cat.name}</h5>
               </Link>
            </div>
         </div>
        
        )}
      </div>
     )

    }
    //  <div>
      //  {
      //   categories.map(cat =>
    //   <div class="card">     
    //   <div class="card-header">
    //          <h4> {cat.name} </h4>
    //   </div>    
    //   <div class="card-body"> 
    //     <a href="#" class="btn btn-primary">Go</a>
    //   </div>
      

    // </div> 
    // )} 
    // </div>  
    


// const Categories = props => {
//     const [categories, setCategories] = useState([]);
//     useEffect(() => {
//         axios.get(`http://localhost:5000/categories`).then((res) => {
//             setCategories(res.data);

//         }).catch(err => {
//             console.log(err.message);
//         });
//     }, []);

//     return (

        // <div> {
        //     categories.map(cat =>
        //         <h4> {cat.name} </h4>
        //     )
        // }
//            <h4> Hi </h4>
//         </div>

//     );
// }

// const Categories = () => {
//     return ( 
//         <div className="container col-12">
//             <div className="card border-dark mb-3">
//                 <div className="card-header">All Categories</div>
//             </div>
//             <div className="row m-1">
//                 <div className="card-deck col-6">
//                     <div className="row">
//                         <div className="card border-dark mb-3 col-6">
//                             <div className="card-header">Header</div>
//                             <div className="card-body text-dark">
//                                 <h5 className="card-title">Dark card title</h5>
//                                 <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                             </div>
//                         </div>
//                         <div className="card border-dark mb-3 col-6">
//                             <div className="card-header">Header</div>
//                             <div className="card-body text-dark">
//                                 <h5 className="card-title">Dark card title</h5>
//                                 <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="card border-dark mb-3 col-6">
//                             <div className="card-header">Header</div>
//                             <div className="card-body text-dark">
//                                 <h5 className="card-title">Dark card title</h5>
//                                 <p className="card-text">Some quick example text to build on k of the card's content.</p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="row">
//                         <div className="card border-dark mb-3 col-6">
//                             <div className="card-header">Header</div>
//                             <div className="card-body text-dark">
//                                 <h5 className="card-title">Dark card title</h5>
//                                 <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//      );
// }

export default Category;