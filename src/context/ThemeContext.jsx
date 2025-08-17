import { useState, useEffect, useCallback, createContext, useContext } from 'react'; // Adicione useCallback, createContext, useContext
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import { ThemeDataProvider } from './ThemeDataContext'; // Ajuste o caminho se necessário

const API_URL = "http://localhost:3001/theme";

// Crie um novo contexto para a função de recarregamento
const ThemeUpdateContext = createContext();

export const useThemeUpdate = () => {
    return useContext(ThemeUpdateContext);
}

const ThemeProvider = ({children}) => {
  const [muiTheme, setMuiTheme] = useState(null);
  const [customThemeData, setCustomThemeData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Envolvemos a lógica de busca em uma função com useCallback
  const fetchTheme = useCallback(async () => {
    setLoading(true); 
    try {
      const response = await axios.get(API_URL);
      const fullThemeData = response.data;

      const theme = createTheme({
        palette: {
          primary: { main: fullThemeData.palette.primary },
          secondary: { main: fullThemeData.palette.secondary },
          error: { main: fullThemeData.palette.error },
          warning: { main: fullThemeData.palette.warning },
          info: { main: fullThemeData.palette.info },
          success: { main: fullThemeData.palette.success },
        },
        typography: fullThemeData.typography,
      });

      setMuiTheme(theme);
      setCustomThemeData({
        images: fullThemeData['images-url']
      });
      
    } catch (error) {
      console.error("Falha ao carregar o tema da API.", error);
      setMuiTheme(createTheme({ typography: { fontFamily: 'Roboto, sans-serif' }}));
      setCustomThemeData({ images: {} });
    } finally {
      setLoading(false);
    }
  }, []); // useCallback com array de dependências vazio

  useEffect(() => {
    fetchTheme();
  }, [fetchTheme]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <MuiThemeProvider theme={muiTheme}>
      <ThemeDataProvider value={customThemeData}>
        {/* Fornecemos a função fetchTheme para os componentes filhos */}
        <ThemeUpdateContext.Provider value={fetchTheme}>
          {children}
        </ThemeUpdateContext.Provider>
      </ThemeDataProvider>
    </MuiThemeProvider>
  )
}

export default ThemeProvider;