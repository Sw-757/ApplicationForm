import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import ApplicationTable from './Table/ApplicationTable';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ApplicationTable />
    </ChakraProvider>
  );
}

export default App;
