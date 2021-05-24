import React, { Component } from 'react';
import styled from 'styled-components';

const FilterSection = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: pink;
  padding: 0.2rem;
  margin: 0.2rem;
  border-bottom: 0.1rem solid;
  border-bottom-color: palegreen;
`;

const Count = styled.div`
  background-color: turquoise;
`;

const Sort = styled.div`
  background-color: palegoldenrod;
`;

const Size = styled.div`
  background-color: palegreen;
`;

export default class Filter extends Component {
  render() {
    return (
      <FilterSection>
        <Count> {this.props.count} products</Count>
        <Sort>
          Order{' '}
          <select value={this.props.sort} onChange={this.props.sortProducts}>
            <option>Latest</option>
            <option value="lowest">Lowest</option>
            <option value="highest">Highest</option>
          </select>
        </Sort>
        <Size>
          Filter{' '}
          <select value={this.props.size} onChange={this.props.filterProducts}>
            <option value="">All</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </Size>
      </FilterSection>
    );
  }
}
