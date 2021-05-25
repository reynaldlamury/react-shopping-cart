import React, { Component } from 'react';
import styled from 'styled-components';
import SubUI from './SubUI';

const MainUI = styled.div`
  height: 100px;
  background-color: #e7e745;
  z-index: 10;
  position: relative;
`;

export default class SearchUI extends Component {
  render() {
    return (
      <MainUI>
        <SubUI products={this.props.products} />
      </MainUI>
    );
  }
}
