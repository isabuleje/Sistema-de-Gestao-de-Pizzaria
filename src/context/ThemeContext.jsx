import { useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CircularProgress, Box } from '@mui/material';
import axios from 'axios';
import { ThemeDataProvider } from '../contexts/ThemeDataContext'; // O import fofo de ibagem

 /*

 Explicação
  ThemeContext: Lida com tudo que o MUI pode alterar, como cores e tipografia
  ThemeData: Lida com as imagens de fundo e tals

  Vou selecionar as imagens que não são fotos de pizza e colocar numa pasta chamada Inteface e só guardar la

  nao ta aplicado ainda

 */

const API_URL = "http://localhost:3001/theme"

const ThemeProvider = ({children}) => {
  const [muiTheme, setMuiTheme] = useState(null); // para as cores
  const [customThemeData, setCustomThemeData] = useState(null); // Para as imagens
  const [loading, setLoading] = useState(true);

  useEffect(
    () => {
      async function fetchTheme() {
        try {
          const response = await axios.get(API_URL);
          const fullThemeData = response.data; // catar todos os dados do theme

          console.log(fullThemeData);

          // pegar os dados do tema que pertencem ao Material UI
          const theme = createTheme(
            {
              palette: {
                primary: { main: fullThemeData.palette.primary },
                secondary: { main: fullThemeData.palette.secondary },
                error: { main: fullThemeData.palette.error },
                warning: { main: fullThemeData.palette.warning },
                info: { main: fullThemeData.palette.info },
                success: { main: fullThemeData.palette.success },
              },
                typography: fullThemeData.typography, // Passa o objeto de tipografia diretamente
            }
          );

          setMuiTheme(theme); // e seta eles

          // agora as ibagens
          setCustomThemeData({
            images: fullThemeData['images-url']
          });
          
        } catch (error) {
          console.error("Falha ao carregar o tema da API.", error);
          // tema padrao em caso de erro
          setMuiTheme(createTheme({ typography: { fontFamily: 'Roboto, sans-serif' }}));
          setCustomThemeData({ images: {} }); // Objeto de imagens vazio
        } finally {
          setLoading(false);

        }
      }
      fetchTheme();
    }, []);

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
        {children}
      </ThemeDataProvider>
    </MuiThemeProvider>
  )

}

export default ThemeProvider