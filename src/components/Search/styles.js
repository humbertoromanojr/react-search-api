import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  margin: 16px auto;
  width: 100%;
  max-width: 800px;
`;

export const SearchInput = styled.label`
  position: relative;

  input {
    width: 100%;
    padding: 16px;
    font-size: 36px;
    font-style: italic;
    color: #444;
    box-sizing: border-box;
    outline: none;

    border-radius: 10px;
  }
`; 