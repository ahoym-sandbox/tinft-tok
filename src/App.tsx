import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.css';
import { HomePage } from './components/Homepage';
import NavBar from './components/NavBar';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
  },
});

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
      <NavBar />
      <HomePage />
      </ThemeProvider>
    </div>
  );
}

export default App;
