import React from "react";
import {Icons, fetchData, globalHandleSubmit} from './helpers';
import MaterialTable from "material-table";
import { DataContext } from "./Home";
import Button from '@material-ui/core/Button';

const Books = () => {
  //books array
    const [books, setBooks] = React.useState([]);
  // user, loading status
    const { data, setData } = React.useContext(DataContext);
  //book to be edited
    const [ book, setBook ] = React.useState({})
  // category and authors options in select menus
    const [options, setOptions] = React.useState({
        categories: [],
        authors: [],
      });
  React.useEffect(() => {
  //setting loading to true
    setData({...data, loading: true})
  // fetching books
    fetchData('books').then(res => setBooks(res));
  // setting loading to false
    setData({...data, loading: false})
  // fetching category and authors options in select menus
    getBookOptions();
  }, [data.loading,data.toggleUpdate]);

  const getBookOptions = async () => {
    await Promise.all([
        fetch("http://localhost:5000/categories").then((categories) => categories.json()),
        fetch("http://localhost:5000/authors").then((authors) => authors.json())])
        .then(([categories,authors]) => setOptions({categories,
            authors,
            loaded: true}));
  };
  
  const handleChange = (e) => {
      setBook({...book, image:e.target.files[0]});
  }
  const handleInputChange = (e) => {
    const { target: { name , value } } = e;
    setBook({...book, [name] : value})
  };
  return (
    <MaterialTable
      icons={Icons}
      title="Books"
      columns={[
        {
          title: "ID",
          render: (rowData) => rowData?.tableData.id + 1,
          editable: "never",
        },
        {
            title: 'Book Picture',
            field: 'image',
            editComponent: () => (
                <div value="photo">
                  <input
                    accept=".png, .jpg, .jpeg"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    type="file"
                    required
                    onChange={(e)=> handleChange(e)}
                  />
                  <label htmlFor="raised-button-file">
                    <Button variant="raised" component="span">
                      Upload Image
                    </Button>
                  </label>
                </div>
              ),
            render: rowData => (
              <img
                style={{ height: 200, width: 150,}}
                src={rowData.image}
                alt= 'Author Img'
              />
            ),
          },
        { title: 'Book Name', field: 'name' },
        { title: 'Author', field: 'author.firstName', editComponent: () => (
            <>
                <select name='author' onChange={(e) => {handleInputChange(e)}} value={book?.author || book?.author?._id || ''}>
          <option value='' disabled hidden>Choose author</option>
                {options.authors.map((author) => {
              return (
                <option
                  key={author._id}
                  value={author._id}
                >
                  {author.firstName}
                </option>
              );
            })}
                </select>
            </>
          )},
        { title: 'Category', field: 'category.name', editComponent: () => (
            <>
                <select name='category' onChange={(e) => {handleInputChange(e)}} value={book?.category || book?.category?._id || ''}>
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
            </>
          )},
      ]}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                null,
                "books",
                {   name: newData.name,
                    author: book.author  ,
                    category: book.category,
                    image: book.image
                },
                data,
                setData
                ).then(res => (res) ? resolve() : reject())
            }, 100);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                oldData,
                "books",
                {   name: newData.name,
                    author: book.author  ,
                    category: book.category,
                    image: book.image },
                data,
                setData
                ).then(res => (res) ? resolve() : reject())
            }, 100);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                oldData,
                "books",
                null,
                data,
                setData,
                true
                ).then(res => (res) ? resolve() : reject())
            }, 100);
          }),
      }}
      data={books}
    />
  );
};

export default Books;