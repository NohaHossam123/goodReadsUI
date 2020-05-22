import React from "react";

 const List = (props)=> {

        return (
                <div className="wrapper">
                <ul className="list-unstyled components">
                    <li>
                        <button type="button"className="btn btn-info">All</button>
                    </li>
                    <li>
                        <button type="button" className="btn btn-info">Read</button>
                    </li>
                    <li>
                        <button type="button" className="btn btn-info">Currently Reading</button>
                    </li>
                    <li>
                        <button type="button" className="btn btn-info">Want To Read</button>
                    </li>
                </ul>
                </div> 
        )

}
export default List;
