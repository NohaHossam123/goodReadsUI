import React from "react";

const Fetcher = (props) => {
  const { current } = props;

  const [data, setData] = React.useState({ items: [], current, loaded: false });

  React.useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:5000/${current}`);
      const responseData = await res.json();
      setData({ ...data, items: responseData, current, loaded: true });
    };
    getData();
  }, [current]);

  return React.cloneElement(props.children, data);
};

export default Fetcher;
