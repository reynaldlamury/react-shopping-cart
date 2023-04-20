import React, { useState, useEffect } from 'react';
import axios from 'axios';
// --------------------------------- REDUX
import { connect } from 'react-redux';
// --------------------------------- REDUX
// import { Redirect } from 'react-router-dom';

const ProductDetail = ({ match, auth }) => {
  const [Item, setItem] = useState({});
  // const { name } = Item;

  useEffect(() => {
    const fetchItem = async () => {
      const res = await axios.get(`/api/items/${match.params.id}`);
      setItem(res.data);
    };

    fetchItem();
  }, []);

  return (
    <div>
      <h1>{Item?.name}</h1>
    </div>
  );
};

// export default ProductDetail;
const mapStateToProps = (state) => ({
  error: state.error,
  auth: state.auth,
});

export default connect(mapStateToProps)(ProductDetail);
