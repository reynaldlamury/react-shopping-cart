import { css } from 'styled-components';

export const CustomScroll = css`
  /* custom scrollbar */
  ::-webkit-scrollbar {
    width: 20px;
  }

  ::-webkit-scrollbar-track {
    background-color: salmon;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ff5b49;
    border: 6px solid transparent;
    background-clip: content-box;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #e4331f;
  }
`;
