import './App.css'

import { ProdutosProvider } from './context/ProdutosContext';
import { CarrinhoProvider } from './context/CarrinhoContext';
import { AuthProvider } from './context/AuthContext';


import ThemeProvider from './context/ThemeContext'; 
import CssBaseline from '@mui/material/CssBaseline'; // Reseta o CSS padrão do navegador
import theme from './theme/theme.jsx'; // Importa o seu tema
import { ToastContainer } from 'react-toastify';


import AppRoutes from './routes/AppRoutes'



function App() {

  return (
    <ThemeProvider>
      <CssBaseline />
        <AuthProvider>
          <ProdutosProvider>
            <CarrinhoProvider>
                {/* O ToastContainer pros alertas */}
                <ToastContainer
                  autoClose={1500}
                  hideProgressBar={false}
                  closeOnClick
                  pauseOnHover
                  theme="light"
                />

                <AppRoutes/>
                
            </CarrinhoProvider>
          </ProdutosProvider>
        </AuthProvider>
    </ThemeProvider>
  )
}

// B O L A S ???????
//⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣇⠀⠀⠀⠀⠀⢳⠃⠀⠀⢀⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠿⠟⠀⠀⠀⠀⠀⡀⠀⠀⠀⠼⢿⣿⣿⣿⣿⣿⣿⣿⠟⠋⠉⠀⠀⠈⠉⠛⠻⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣿⣿⠿⠟⠛⠋⠛⠻⠿⢿⣿⣿⣿⣿⠋⠁⠀⠀⠀⠀⠀⠀⠀⠈⠉⠁⠀⠀⠀⠙⠻⢿⣿⣿⡿⠡⠐⠁⠀⠀⠀⠀⠀⠀⠀⡈⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⡿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠹⠿⠿⠛⠀⠀⠀⠀⠀⢰⢶⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠿⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⡇⣸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⡀⠀⠀⠀⠀⣾⣴⠀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⡇⢻⡀⠀⠀⠀⠀⠀⠀⠀⠀⠠⠄⠀⡀⠀⠀⣀⡀⢀⣘⣻⣻⡿⣿⣷⣄⣀⣞⣿⡖⠀⠿⣦⠀⠀⠀⠀⠀⠀⠀⠀⣀⠠⠀⣰⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣷⡈⠲⡀⠀⠀⠀⣠⠎⠠⠀⠀⠀⠀⠐⢀⢂⢱⠟⠎⢙⣋⣉⡓⠘⠫⠜⣣⡿⠛⣅⡘⠓⣻⡧⠀⡄⣤⣀⡀⠐⠊⣁⣤⣾⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣿⣿⣶⣦⣤⣤⣾⡏⢠⠶⠿⢿⣿⣷⣦⠀⠀⠀⠠⠾⠛⠻⣿⣿⣷⣆⠀⠉⠁⢀⠸⠇⠈⢧⠀⠀⠀⠘⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠃⡇⠀⠀⢸⣿⣿⣿⠇⠀⠀⠰⡀⠀⠐⣼⣿⣿⠟⠀⠀⠀⣼⣦⣤⠐⢬⠆⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠙⠲⠾⠿⠛⠋⠁⠀⠀⠀⠀⠙⠛⠛⠛⠋⠁⠀⠀⠀⢀⣿⣿⠇⠘⠞⠣⠄⠀⠀⠸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠩⠈⠀⠱⢀⡀⢀⠀⠀⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣿⣿⣿⣿⣿⠁⠄⠰⣞⠶⣦⣄⣠⣶⣦⠀⢀⣶⣦⣾⣿⣗⡀⢁⠀⢀⣀⠀⠀⠂⠀⠀⠀⣧⠘⣷⣄⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣿⣿⣿⣿⠁⠀⣄⣺⣥⢛⣶⣿⣿⣿⣿⢠⣿⣿⣿⢿⡛⡿⣿⣿⣷⣾⣟⣉⣻⡷⢀⠀⠀⢸⠀⠽⠙⠀⠀⠀⠀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣿⣿⣿⣿⡀⢸⣿⣻⢃⣾⡿⣿⣿⣿⣿⠰⣿⣿⣿⣯⣿⣶⣿⣿⣿⣿⣿⢋⣻⢢⣀⠁⠀⠈⠐⠀⠀⠀⠀⠀⢀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣿⣿⣿⣿⣧⠀⠉⠀⠻⢛⣿⣿⣿⣧⣾⡀⣘⡿⣿⣿⢻⣆⠻⣟⣿⣿⠷⠋⡉⠀⠁⠀⠀⠀⢠⡄⠀⠀⠀⣀⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⣦⣤⣤⡄⠀⠁⠈⠀⠀⠀⠈⠀⠀⠀⠁⠈⠀⠀⠀⢀⡀⠀⠀⣄⢀⠀⠀⠀⢈⡇⢸⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠤⠀⠠⠐⠤⠐⠖⠂⠀⣐⠩⠉⠀⠈⠁⠀⠀⠀⠀⢨⠇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⣴⠆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢿⠀⠀⠀⠀⢐⠇⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⠇⠀⠀⠀⠛⣋⣀⡀⢀⣀⡀⠀⠀⠀⠀⠀⠀⣀⣀⠀⢦⠇⠀⢀⣀⠞⠛⠀⠈⠙⠛⠛⠛⠛⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣿⣿⣿⣿⡿⠛⢉⠀⠀⣄⣀⠀⠀⠈⠙⠃⠘⠛⠛⠀⠀⠺⠿⠇⠘⠛⠛⠀⠀⢀⣤⣤⡽⠟⠁⠀⠀⠀⠠⣄⠀⠀⡀⠀⠀⠈⠙⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣿⣿⣿⠋⣠⣔⠛⠂⠀⠻⢻⣗⣴⢤⢀⣀⢤⡀⢠⡀⠀⠀⠀⠀⣀⡀⠀⠐⢲⠚⠛⠀⠁⠀⠀⠀⠀⠀⠀⢺⣷⣼⣿⡿⠆⠀⠀⠀⠀⠀⠈⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⣿⡿⠁⢼⠑⠉⠀⠀⠀⠀⠀⠈⠁⠈⠁⠸⠟⠻⢟⠫⣤⠀⠐⠠⠐⠙⠀⠀⠀⠀⠀⠀⠀⡀⢿⠆⠄⠀⠀⣙⠿⠛⠁⠤⠀⠀⠀⡀⣄⠀⠸⣤⣄⡀⠉⠻⣿⣿⣿⣿⣿
//⣿⣿⣿⣿⡿⠁⢷⣿⠇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠠⢰⠀⣄⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⡐⣿⣿⣷⣷⣿⣿⣧⣠⡀⠈⠻⣿⣿⣿
//⣿⣿⣿⣿⠏⢐⢸⡿⢧⠀⠢⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠃⠀⢠⠋⡏⠀⠀⠀⠀⠀⠀⠀⠀⠀⠁⠾⣾⣿⢿⣿⣿⣿⣾⢿⣦⡀⠘⢿⣿
//⣿⣿⠟⠋⠀⠀⠈⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⠀⠀⠀⠀⣤⣦⡌⣳⣿⣄⡀⠀⠀⠀⠂⠠⠠⠚⠁⠿⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢹⢟⣻⣽⣿⣿⣿⣿⢽⣿⣤⡈⢿
//⠏⣡⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢄⢰⣟⡣⠶⠗⠃⣰⢚⠋⠿⢿⣿⣿⠷⠦⠤⡠⢤⠀⠴⢶⣤⣴⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠐⠉⠵⠝⡳⠶⠌⢻⡻⠶⠧⠈

//Coisas pra ajeitar pra eu n esquecer:

//5.1 Consertar a tela de carrinho vazio
//5.2 Consertar o background do Carrinho que sumiu do nada affr

//6. Colocar a quantidade de produtos que não são pizza pra funcionar (Tipo se comprarem todas as agua nao da pra comprar mais)
//7. Botar as observacoes do pedido (se houver) na pagina da cozinha

export default App
