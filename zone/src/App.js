import React, { Component } from 'react';
import './App.css';
import { ZONE } from './constant';
import TableList from './TableList';
import styled from 'styled-components';

class App extends Component {

  render() {
    return(
        Object.keys(ZONE).map(item => {
          return (
            <Section>
              <Header>{item}</Header>
              <TableList area={ZONE[item]}/>
            </Section>
          )
        })
    )
  }
}

export default App;

const Section = styled.div`
  display: flex;
  place-items: center;
  flex-direction: column;
`;

const Header = styled.div`
  height: 30px;
  display: flex;
  color: #ffffff;
  font-weight: 400;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #0e1921;
`;