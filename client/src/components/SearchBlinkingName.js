import React, { useState } from 'react';
import styled from 'styled-components';
import BlinkNameIndividual from './BlinkNameIndividual';

const Wrapper = styled.div`
  display: flex;
`;

const SearchBlinkingName = ({ targetName, filterText }) => {
  const [BlinkingName] = useState(targetName.split(''));

  return (
    <Wrapper>
      {BlinkingName.map((blinkLetter, index) => (
        <BlinkNameIndividual
          key={index}
          letter={blinkLetter}
          filterText={filterText}
        ></BlinkNameIndividual>
      ))}
      {/* <h3> {targetName} yeah</h3> */}
      {/* <h5> {filterText} </h5> */}
    </Wrapper>
  );
};

export default SearchBlinkingName;
