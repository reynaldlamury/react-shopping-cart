import React, { Component } from 'react';
import styled from 'styled-components';
import { SearchConsumer } from '../searchContext';
import SubUI from './SubUI';

const MainUI = styled.div`
  background-color: #e7e745;
  z-index: 10;
  position: relative;
  width: 480px;
  /* transition: all ease 0.2s; */
`;

export default class SearchUI extends Component {
  render() {
    return (
      <div>
        <MainUI>
          <SubUI products={this.props.products} />
          <SearchConsumer>
            {(filtertext) => {
              return (
                <p
                  style={{
                    backgroundColor: 'green',
                    color: 'white',
                    padding: 5,
                  }}
                >
                  hello {filtertext}
                </p>
              );
            }}
          </SearchConsumer>
        </MainUI>
      </div>
    );
  }
}
