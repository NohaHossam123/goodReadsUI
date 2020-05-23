import React from "react";
import { DataContext } from "./Home";

const Fetcher = (props) => {
  const { current } = props;
  const {data} = React.useContext(DataContext)

  const [dataToFetch, setDataToFetch] = React.useState({ items: [], current });

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:5000/${current}`);
      const responseData = await res.json();
      setDataToFetch({ ...dataToFetch, items: responseData, current });
    };
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current,data.toggleModal]);

  return React.cloneElement(props.children, dataToFetch);
};

export default Fetcher;
