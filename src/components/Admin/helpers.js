import React from "react";
import { DataContext } from "./Home";
import { objectToFormData } from 'object-to-formdata';

let error;

export const tableData = (item, current) => {
  switch (current) {
    case "books":
      return (
        <>
          <td>
            <img src={item.image} height='200px' width='150px' alt = 'Book Img'></img>
          </td>
          <td>{item.name}</td>
          <td>{item.category.name}</td>
          <td>
            {item.author.firstName} {item.author.lastName}
          </td>
        </>
      );
    case "authors":
      return (
        <>
          <td>
            <img src={item.image} height='200px' width='150px' alt='Author Img'></img>
          </td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{new Date(item.birthDate).toISOString().substr(0,10)}</td>
        </>
      );
    default:
    case "categories":
      return <td>{item.name}</td>;
  }
};

export const tableHeaders = (current) => {
  switch (current) {
    case "books":
      return (
        <>
          <th>Photo</th>
          <th>Name</th>
          <th>Category</th>
          <th>Author</th>
        </>
      );
    case "authors":
      return (
        <>
          <th>Photo</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Date of Birth</th>
        </>
      );
    default:
    case "categories":
      return <th>Name</th>;
  }
};

export const editForm = (item, current) => {
  return (
    <div className="text-center border p-5">
      {error && (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )}
        {(() => {
          switch (current) {
            case 'categories':
                return <EditCategoryForm category={item} />;
            case 'authors':
                return <EditAuthorForm author={item} />;
            case 'books':
                return <EditBookForm book={item} />;
              default:
                break;
          }
        })()}
    </div>
  );
};

const EditCategoryForm = (props) => {
  const {data, setData} = React.useContext(DataContext)

  const {category} = props
  let categoryObject = category || { name: ''}
  const handleInputChange = (e) => {
    const { target: { value } } = e;
    categoryObject.name = value
  };
  return (
    <form onSubmit={(e) => globalHandleSubmit(e,category,'categories', categoryObject,data,setData)}>
      <h2 className="">{(category?.name)||"New Category"}</h2>
      <div className="form-group row py-2">
        <label className="col-sm-2 col-form-label">Name: </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter category name"
            defaultValue={(category?.name)}
            required
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button className="btn btn-primary col-3 p-2 cl" type="submit">
        Submit
      </button>
    </form>
  );
};

const EditBookForm = (props) => {
  const {data, setData} = React.useContext(DataContext)

  const { book } = props
  const [options, setOptions] = React.useState({
    categories: [],
    authors: [],
    loaded: false,
  });
  const [bookToEdit, setBookToEdit] = React.useState({})
  const handleInputChange = (e) => {
    const { target: { name , value } } = e;
    setBookToEdit({...bookToEdit, [name] : value})
  };
  const fileSelectHandler = (e) => {
    const param = e.target.files[0];
    setBookToEdit({ ...bookToEdit, image: param });  
  };
  React.useEffect(() => {
    const getBookOptions = async () => {
        await Promise.all([
            fetch("http://localhost:5000/categories").then((categories) => categories.json()),
            fetch("http://localhost:5000/authors").then((authors) => authors.json())])
            .then(([categories,authors]) => setOptions({categories,
                authors,
                loaded: true}));
      };
    getBookOptions();
  }, [options.loaded]);
  return (
    <form encType="multipart/form-data" onSubmit={(e) => globalHandleSubmit(e,book,'books', bookToEdit,data,setData)}>
      <h2 className="">{(book?.name) || "New Book"}</h2>
      <div className="form-group row p-2">
        <label className="col-sm-2 col-form-label">Name: </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter book name"
            defaultValue={(book?.name)}
            required
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="form-group row p-2">
        <label className="col-sm-2 col-form-label">Category: </label>
        <div className="col-sm-10">
          <select className="custom-select" name="category" required onChange={handleInputChange} value={bookToEdit?.category || book?.category?._id || ''}>
            <option value='' disabled hidden>Choose category</option>
            {options.categories.map((cat) => {
              return (
                <option
                  key={cat._id}
                  value={cat._id}
                >
                  {cat.name}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="form-group row p-2">
        <label className="col-sm-2 col-form-label">Author: </label>
        <div className="col-sm-10">
          <select className="custom-select" name="author" required onChange={handleInputChange}  value={bookToEdit.author || book?.author?._id || ''}>
          <option value='' disabled hidden>Choose author</option>
            {options.authors.map((author) => {
              return (
                <option
                  key={author._id}
                  value={author._id}
                >
                  {author.firstName} {author.lastName}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <div className="form-group row p-2">
        <label className="col-sm-2 col-form-label">Image: </label>
        <div className="col-sm-10">
          <input type="file" accept=".png, .jpg, .jpeg" className="form-control" name="image" required={!book} onChange={fileSelectHandler}/>
        </div>
      </div>
      <button className="btn btn-primary col-3 p-2" type="submit">
        Submit
      </button>
    </form>
  );
};

const EditAuthorForm = (props) => {
  const { author } = props;
  const {data, setData} = React.useContext(DataContext);
  const [authorToEdit, setAuthorToEdit] = React.useState({});
  const handleInputChange = (e) => {
    const { target: { name , value } } = e;
    setAuthorToEdit({...authorToEdit, [name] : value});
  };
  
  const fileSelectHandler = (e) => {
    const param = e.target.files[0];
    setAuthorToEdit({ ...authorToEdit, image: param });  
  };

  return (
    <form encType="multipart/form-data"
      onSubmit={(e) => globalHandleSubmit(e,author,'authors', authorToEdit,data,setData)}>
      <h2 className="">{author?.firstName || "New Author"}</h2>
      <div className="form-group row py-2">
        <label className="col-sm-2 col-form-label">First Name: </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            name="firstName"
            placeholder="Enter author's first name"
            defaultValue={author?.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="form-group row py-2">
        <label className="col-sm-2 col-form-label">Last Name: </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            name="lastName"
            placeholder="Enter author's last name"
            defaultValue={author?.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <div className="form-group row py-2">
          <label className='col-sm-2 col-form-label'>Birth Date:</label>
        <div className="col-sm-10">
          <input type="date" name="birthDate" min="1800-01-01"
              max="2020-12-31" className="form-control" 
              value={authorToEdit.birthDate || (author && new Date(author.birthDate).toISOString().substr(0,10)) || '' }
              onChange={handleInputChange}/>
        </div>
      </div>
      <div className="form-group row p-2">
      <label className="col-sm-2 col-form-label">Image: </label>
      <div className="col-sm-10">
        <input type="file" accept=".png, .jpg, .jpeg" className="form-control" name="image" required={!author} onChange={fileSelectHandler}/>
      </div>
    </div>
      <button className="btn btn-primary col-3 p-2" type="submit">
        Submit
      </button>
    </form>
  );
};

export const confirmDelete = (item,current,data,setData) => {
  return (
    <div className="text-center border p-5">
          <h5 className=""><strong>Delete Confirmation</strong></h5>
          <div className="form-group row p-4">
            <h6 className="mx-auto">Are you sure you want to delete this record?</h6>
          </div>
          <button className="btn btn-danger col-3 p-2 mx-2" 
            onClick={(e) => globalHandleSubmit(e,item,current,null,data,setData,true)}>
            Yes
          </button>
          <button className="btn btn-info col-3 p-2 mx-2" onClick={() => hidePopup(data,setData)}>
            No
          </button>
    </div>
  );
}


const globalHandleSubmit = async(e,item,current,payload,data,setData,remove=false) => {
  e.preventDefault();
  let method,url = `http://localhost:5000/${current}/`;
  let headers = new Headers ({
    'Authorization': 'Bearer ' + data?.user?.token,
  });
  let body = (payload && objectToFormData(payload)) || null;
  if (item){
    remove ? method = 'DELETE' : method = 'PATCH';
    url += item._id;
  }else{
    method = 'POST';
  }
  if (current === 'categories') {
    headers.append('Content-Type', 'application/json');
    body = (payload && JSON.stringify(payload)) || null;
  }
  const fetchResponse = await fetch(url, {
    method,
    headers,
    body
    });
    await fetchResponse.json() && hidePopup(data,setData);
}

const hidePopup = (data,setData) => {
  let popup = document.getElementsByClassName('popup-content')[0];
  popup.parentNode.style.display= 'none';
  popup.parentNode.removeChild(popup);
  setData({...data, toggleModal: !data.toggleModal});
}