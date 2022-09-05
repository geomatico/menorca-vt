import {ThemeProvider as Emotion10ThemeProvider } from 'emotion-theming';
//...

const withThemeProvider = (Story, context) => (
  <Emotion10ThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <Story {...context} />
    </ThemeProvider>
  </Emotion10ThemeProvider>
);