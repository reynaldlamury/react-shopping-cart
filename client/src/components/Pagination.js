import React from 'react';
import styled, { css } from 'styled-components';

const Button = css`
  cursor: pointer;
  margin: 2px;
  padding: 3px 7px;
  border: 1px solid white;
  background-color: #ff6655;
  transition: all ease-in-out 0.2s;
  &:hover {
    background-color: #ff3aff;
  }
`;

const PageBar = styled.div`
  background-color: #a0ff6a;
  color: white;
  margin: 4px;
  padding: 5px;
  display: flex;
  justify-content: center;

  div {
    ${Button}
    &.active {
      background-color: #ff3aff;
    }
  }
`;

const PrevBtn = styled.div`
  ${Button}
`;
const NextBtn = styled.div`
  ${Button}
`;

const Pagination = (props) => {
  console.log('currentpage:', props.currentpage);
  return (
    <PageBar>
      <PrevBtn onClick={props.handleprevbtn}>Prev</PrevBtn>
      {props.totalPaginationNum.map((num) => (
        <div
          key={num}
          id={num}
          onClick={props.handleClick}
          className={props.currentpage === num ? 'active' : null}
        >
          {' '}
          {num}{' '}
        </div>
      ))}
      <NextBtn onClick={props.handlenextbtn}>Next</NextBtn>
    </PageBar>
  );
};

export default Pagination;
