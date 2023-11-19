// PaginationStyles.js

import styled from 'styled-components';

export const PaginationContainer = styled.div`
  ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 20px 0;
  }

  li {
    margin: 0 5px;
    cursor: pointer;
    user-select: none;
    padding: 10px;
    border-radius: 5px;
    transition: background-color 0.3s;

    &:hover {
      background-color: #eee;
    }
  }

  a {
    text-decoration: none;
    color: #333;
  }

  .active {
    background-color: #007bff;
    color: #fff;
  }
`;
