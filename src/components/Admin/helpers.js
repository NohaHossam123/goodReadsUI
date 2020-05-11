import React from "react";

export const tableData = (item, current) => {
  switch (current) {
    case "books":
      return (
        <>
          <td>
            <img src={item.image}></img>
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
            <img src={item.image}></img>
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
      {/* {error && (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    )} */}
        {(() => {
               switch (current) {
              case 'categories':
                  return editCategoryForm(item);
              case 'authors':
                  return editAuthorForm(item);
              case 'books':
                  return EditBookForm(item);
                default:
                    break;
          }
        })()}
    </div>
  );
};

const editCategoryForm = (item) => {
  return (
    <form>
      <h2 className="">{(item && item.name)||"New Category"}</h2>
      <div className="form-group row py-2">
        <label className="col-sm-2 col-form-label">Name: </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter category name"
            defaultValue={(item && item.name) || null}
            required
          />
        </div>
      </div>
      <button className="btn btn-primary col-3 p-2" type="submit">
        Submit
      </button>
    </form>
  );
};

const EditBookForm = (item) => {
  const [data, setData] = React.useState({
    categories: [],
    authors: [],
    loaded: false,
  });
  React.useEffect(() => {
    const getBookOptions = async () => {
        await Promise.all([
            fetch("http://localhost:5000/categories").then((categories) => categories.json()),
            fetch("http://localhost:5000/authors").then((authors) => authors.json())])
            .then(([categories,authors]) => setData({categories,
                authors,
                loaded: true}));
      };
    getBookOptions();
  }, [data.loaded]);
  return (
    <form>
      <h2 className="">{(item && item.name) || "New Book"}</h2>
      <div className="form-group row p-2">
        <label className="col-sm-2 col-form-label">Name: </label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter book name"
            defaultValue={(item && item.name) || null}
            required
          />
        </div>
      </div>
      <div className="form-group row p-2">
        <label className="col-sm-2 col-form-label">Category: </label>
        <div className="col-sm-10">
          <select className="custom-select" name="category" required>
            {data.categories.map((cat) => {
              return (
                <option
                  key={cat._id}
                  value={cat._id}
                  defaultValue={((item && item.category._id) || null) === cat._id}
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
          <select className="custom-select" name="author" required>
            {data.authors.map((author) => {
              return (
                <option
                  key={author._id}
                  value={author._id}
                  defaultValue={((item && item._id)||null) === author._id}
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
          <input type="file" className="form-control" name="image" required />
        </div>
      </div>
      <button className="btn btn-primary col-3 p-2" type="submit">
        Submit
      </button>
    </form>
  );
};

const editAuthorForm = (item) => {
    return (
      <form>
        <h2 className="">{(item && item.firstName + " " + item && item.lastName)|| "New Author"}</h2>
        <div className="form-group row py-2">
          <label className="col-sm-2 col-form-label">First Name: </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="firstName"
              placeholder="Enter author's first name"
              defaultValue={(item && item.firstName) || null}
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
              defaultValue={(item && item.lastName) || null}
              required
            />
          </div>
        </div>
        <div className="form-group row py-2">
            <label className='col-sm-2 col-form-label'>Birth Date:</label>
          <div className="col-sm-10">
            <input type="date" name="birthDate" min="1800-01-01"
                    max="2020-12-31" className="form-control" value={((item && new Date(item.birthDate).toISOString().substr(0,10)) || null)}/>
                    </div>
        </div>
        <div className="form-group row p-2">
        <label className="col-sm-2 col-form-label">Image: </label>
        <div className="col-sm-10">
          <input type="file" className="form-control" name="image" required />
        </div>
      </div>
        <button className="btn btn-primary col-3 p-2" type="submit">
          Submit
        </button>
      </form>
    );
  };

export const confirmDelete = (item,current) => {
    return (
    <div className="text-center border p-5">
        <form>
          <h5 className="">Delete Confirmation</h5>
          <div className="form-group row p-4">
            {/* <label className="col-sm-2 col-form-label">Category Name: </label> */}
            <h6>Are you sure you want to delete this record?</h6>
          </div>
          <button className="btn btn-danger col-3 p-2" type="submit">
            Delete
          </button>
        </form>
    </div>
      );
  }