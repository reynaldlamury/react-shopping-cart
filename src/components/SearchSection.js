import React, { Component } from 'react';
import styled from 'styled-components';
import SearchUI from './SearchUI';
import data from '../data.json';

const Search = styled.div`
  background-color: teal;
  flex: 3 2rem;
  align-items: center;
  justify-content: center;
`;

const SearchBar = styled.input`
  border: 1px solid orange;
  color: orange;
  width: 500px;
  height: 20px;
  padding: 5px;

  &:focus {
    border: 1px solid orange;
  }
`;

const ButtonSearch = styled.button`
  transition: all ease-in-out 0.3s;
  background-color: white;
  cursor: pointer;
  color: orange;
  border: none;
  width: 100px;
  height: 30px;
  padding: 5px;

  &:hover {
    background-color: orange;
    color: white;
  }
`;

const SearchGroup = styled.div`
  background-color: yellowgreen;
  padding: 1rem;
`;

export default class searchSection extends Component {
  constructor() {
    super();
    this.state = {
      products: data.products,
      UIisActive: false,
    };
  }

  handleTyping = (event) => {
    const finalArr = [];
    if (event.target.value.length > 0) {
      for (let product of this.state.products) {
        if (
          product.title
            .toLowerCase()
            .indexOf(event.target.value.toLowerCase()) >= 0
        ) {
          finalArr.push(product);
        }
      }
      this.setState({
        UIisActive: true,
        products: finalArr,
      });
    } else {
      this.setState({ UIisActive: false, products: data.products });
    }
    console.log(event.target.value.toLowerCase());
  };

  render() {
    const isActive = this.state.UIisActive;
    let searchUI;

    if (isActive) {
      searchUI = <SearchUI products={this.state.products}></SearchUI>;
    }

    return (
      <SearchGroup>
        <Search>
          <SearchBar
            onKeyUp={this.handleTyping}
            products={this.state.products}
          ></SearchBar>
          <ButtonSearch>Search</ButtonSearch>
        </Search>
        {searchUI}
      </SearchGroup>
    );
  }
}
