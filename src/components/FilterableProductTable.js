import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchUI from './SearchUI';
// import data from '../data.json';
import { SearchProvider } from '../searchContext';

const Search = styled.div`
  background-color: transparent;
  transform: translateY(-25px);
  padding: 10px;
  flex: 3 2rem;
  margin: 0;
  align-items: center;
  justify-content: center;
  width: 480px;
`;

// Form Group
//====================================================
const FormGroup = styled.div`
  transform: translateY(-12px);
  position: relative;
  padding: 15px 0 0;
  margin-top: 10px;
  width: 50%;
`;

const Label = styled.label`
  position: absolute;
  top: 0;
  display: block;
  transition: 0.2s;
  font-size: 0.5rem;
  color: white;
`;

const SearchBar = styled.input`
  &.active {
    width: 480px;
  }
  // position
  display: inline-block;
  z-index: 200;
  // font props
  font-weight: bold;
  font-size: 1rem;
  // border props
  border: 0;
  border-bottom: 2.5px solid white;
  // core props
  background: transparent;
  color: white;
  width: 200px;
  height: 20px;
  padding: 10px 0;
  outline: 0;
  transition: all 0.2s;

  &:required,
  &:invalid {
    box-shadow: none;
  }

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown ~ .label {
    font-size: 1.3rem;
    cursor: text;
    top: 20px;
  }

  &:focus {
    padding-bottom: 3px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(to right, #5ef8f0, #41ff80);
    border-image-slice: 1;

    ~ .label {
      position: absolute;
      top: 0;
      display: block;
      transition: 0.2s;
      font-size: 0.8rem;
      color: #5ef8f0;
      font-weight: 700;
    }
  }
`;

const SearchGroup = styled.div`
  background-color: #ff49a4;
  position: relative;
  border-radius: 8px;
  padding: 1.5rem;
  z-index: 200;
  width: 250px;
  transition: all ease-in-out 0.2s;

  &.expand {
    width: 500px;
  }
`;

// end of style
// ===================================================================================

const FilterableProductTable = () => {
  const [products, setProducts] = useState([]);
  const [UIisActive, setUIisActive] = useState(false);
  const [filterText, setFilterText] = useState('');

  const handleTyping = (event) => {
    if (event.target.value.length > 0) {
      setUIisActive(true);
      setFilterText(event.target.value);
    } else {
      setUIisActive(false);
    }
    // console.log(event.target.value.toLowerCase());
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const data = await fetch('https://fakestoreapi.com/products');
    const items = await data.json();
    setProducts(items);
  };

  const isActive = UIisActive;
  let searchUI;

  if (isActive) {
    searchUI = <SearchUI products={products}></SearchUI>;
  }
  return (
    <SearchProvider value={filterText}>
      <SearchGroup className={isActive ? 'expand' : null}>
        <Search>
          <FormGroup>
            <SearchBar
              className={isActive ? 'active' : null}
              placeholder="Search"
              type="input"
              onChange={handleTyping}
              products={products}
            ></SearchBar>
            <Label className="label">Search</Label>
          </FormGroup>
          {searchUI}
        </Search>
      </SearchGroup>
    </SearchProvider>
  );
};

export default FilterableProductTable;
