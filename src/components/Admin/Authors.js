import React from "react";
import MaterialTable from "material-table";
import { Icons, fetchData, globalHandleSubmit } from "./helpers";
import { DataContext } from "./Home";
import Button from '@material-ui/core/Button';

const Authors = () => {
  // authors array
    const [authors, setAuthors] = React.useState([]);
  //user, loading status
    const { data, setData } = React.useContext(DataContext);
  // chosen image
    const [ image, setImage ] = React.useState()
  React.useEffect(() => {
  //setting loading to true
    setData({...data, loading: true})
  // fetching authors
    fetchData('authors').then(res => setAuthors(res));
  //setting loading to true
    setData({...data, loading: false})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.loading,data.toggleUpdate]);
  const handleChange = (e) => {
      setImage(e.target.files[0]);
  }
  return (
    <MaterialTable
      icons={Icons}
      title="Authors"
      columns={[
        {
          title: "ID",
          render: (rowData) => rowData?.tableData.id + 1,
          editable: "never",
        },
        {
            title: 'Author Picture',
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
        { title: 'First Name', field: 'firstName' },
        { title: 'Last Name', field: 'lastName' },
        { title: 'Birth Date', field: 'birthDate', type:'date' },
      ]}
      editable={{
        onRowAdd: (newData) =>
          new Promise((resolve, reject) => {
            setTimeout(() => {
              globalHandleSubmit(
                null,
                "authors",
                { firstName: newData.firstName,
                    lastName: newData.lastName,
                    birthDate: newData.birthDate,
                    image
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
                "authors",
                { firstName: newData.firstName,
                    lastName: newData.lastName,
                    birthDate: newData.birthDate,
                    image },
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
                "authors",
                null,
                data,
                setData,
                true
                ).then(res => (res) ? resolve() : reject())
            }, 100);
          }),
      }}
      data={authors}
    />
  );
};


export default Authors;