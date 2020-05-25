import React from 'react';

const Pagination = ({ booksPerPage , totalBooks , paginate }) => {
    const pageNumbers = [];
    for(let i = 1 ; i <= Math.ceil(totalBooks / booksPerPage); i++){
        pageNumbers.push(i);
    }

    return ( 
        <div>
        <ul className="pagination" id="paginate">
            {pageNumbers.map(number =>(
              <li key = {number} className="page-item">
                  <a  href="#" onClick={()=> paginate(number)}className="page-link">
                      {number}
                  </a>
              </li>  
            ))}
        </ul>
        </div>
     );
}
 
export default Pagination;