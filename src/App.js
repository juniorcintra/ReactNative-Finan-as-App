import React from 'react';
import { StatusBar } from 'react-native';
import { ThemeProvider } from 'styled-components';

import Home from './screens/Home';

import theme from './styles/theme';

export default App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent/>
      <Home/>
    </ThemeProvider>
  )
}