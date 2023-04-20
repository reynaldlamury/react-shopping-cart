import React from 'react';
import styled from 'styled-components';

const Desclook = styled.div`
  background-color: #ffe91e;
  color: #353535;
  font-weight: bold;
  padding: 2px;

  div {
    transition: all ease-in-out 0.2s;
    margin: 5px;
    padding: 5px;
    cursor: pointer;
    background-color: #a7ff5f;
    border-radius: 10;

    &:hover {
      background-color: #73deff;
    }

    &.active {
      background-color: #73deff;
    }
  }
`;

function Desc(props) {
  return (
    <div>
      <Desclook>
        <div>Click to see desc ... </div>
      </Desclook>
      <p> {props.desc} </p>
    </div>
  );
}

export default Desc;
