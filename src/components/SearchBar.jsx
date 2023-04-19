import React, { useState } from "react";
import styled from "styled-components";

const fontSize = "20px";
const frameColor = "#000000";
const size = "3em";
const openWidth = "18em";
const openPadding = "0.3em 2.1em 0.3em 0.4em";
const frameThickness = "0.15em";
const openTransTime = "800ms";
const closeTransTime = "150ms";

const Form = styled.form`
  font-size: ${fontSize};
  border: solid ${frameThickness} ${frameColor};
  display: inline-block;
  /* position: relative; */
  border-radius: ${size};
`;

const Input = styled.input`
  padding-right: 20px;
  font-family: inherit;
  font-weight: bold;
  width: ${openWidth};
  height: ${size};
  padding: ${openPadding};
  border: none;
  outline: none;
  padding-left: 20px;
  border-color: transparent;
  box-sizing: border-box;
  border-radius: ${size};

  &:focus {
    padding-left: 20px;
    outline: none;
  }

  /* transition: width ${openTransTime} cubic-bezier(0.68, -0.55, 0.27, 1.55)
    ${closeTransTime};
  &:focus {
    outline: none;
  }
  &:focus,
  &:not(:placeholder-shown) {
    width: ${openWidth};
    transition: width ${openTransTime} cubic-bezier(0.68, -0.55, 0.27, 1.55);
  } */
`;

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(searchTerm);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Хайх зүйлээ энд бичээрэй"
      />
    </Form>
  );
}

export default SearchBar;
