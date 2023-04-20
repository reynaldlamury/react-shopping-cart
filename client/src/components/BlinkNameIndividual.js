import React from 'react';
import styled from 'styled-components';

const OuterWrapper = styled.div`
  padding: 3px;
  padding-left: 0;
  padding-right: 0;
  background-color: crimson;
  color: white;

  p {
    margin: 0;
    padding: 0;
    font-size: 18px;

    &.active {
      font-weight: bold;
      color: #24f6fd;
      border-bottom: 2px solid #24f6fd;
    }
  }
`;

const BlinkNameIndividual = ({ letter, filterText }) => {
  // const [FilterText, setFilterText] = useState([]);
  // const [IsMatch, setIsMatch] = useState(false);
  const filterTextArr = filterText.split('');
  // setFilterText(filterTextArr);
  const found = filterTextArr.find((letterTyped) => letterTyped === letter);

  return (
    <OuterWrapper>
      <p className={found ? 'active' : null}> {letter} </p>
    </OuterWrapper>
  );
};

export default BlinkNameIndividual;
