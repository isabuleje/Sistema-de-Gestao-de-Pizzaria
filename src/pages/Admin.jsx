import React, {useState} from 'react'
import '../components/PizzaCard.css'
import { useProdutos } from "../context/ProdutosContext";
import { useNavigate } from 'react-router-dom';
import { Container, Card, Box, CardContent, Button, Typography, Paper, Collapse } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp} from '@mui/icons-material';
import { set } from 'react-hook-form';
import { PedidosProvider, useHistorico } from '../context/PedidosContext';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import AddProduto from '../components/AddProduto';
import AttProduto from '../components/AttProduto';
import Historico from '../components/Historico';

// eu vou transformar em um menu dropdown pra aparecer na propria pagina de Admin
const gerenciarDropdown = () => {

};

const historicoDropdown = () => {

};


// aqui fica as mudanças que eu estou fazendo no menu de Admin
const NovoMenu = () => {

  const navigate = useNavigate();

  const [gerenciarIconUp, setGerenciarIconUp] = useState(true);
  const [historicoIconUp, setHistoricoIconUp] = useState(true);

  const [showGerenciarMenu, setShowGerenciarMenu] = useState(false);
  const [showAddProduto, setShowAddProduto] = useState(false);
  const [showAttProduto, setShowAttProduto] = useState(false);

  const [showHistorico, setShowHistorico] = useState(false);

  const {totalPedidos, setTotalPedidos, adicionarAoHistorico, removerDoHistorico, limparHistorico} = useHistorico();

  const handleGerenciarProduto = () => {
    setGerenciarIconUp(!gerenciarIconUp);
    setShowGerenciarMenu(!showGerenciarMenu);

    if (showGerenciarMenu) {
      setShowAddProduto(false);
      setShowAttProduto(false);
    }
  };

  const toggleHistorico = () => setShowHistorico(prev => !prev);

  const handleHistoricoPedidos = () => {
    setHistoricoIconUp(!historicoIconUp);
    setShowHistorico(!showHistorico);
  }
  return (
    <Container component="section" maxWidth="100%" sx={{
          backgroundImage: 'url(/images/madeira.jpg)',   
    }}>

      <Container component="main" sx={{
        minHeight: '100vh',
        maxHeight: 'xxs',
        width: '40%',
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center',
      }}>

      {/* Paper: um container "elevado" */}

        <Paper elevation={3} sx={{ padding: 3, width: '100%'}}>
          <Button sx={{mb: 4}}
            variant="outlined"
            startIcon={<ArrowBackRoundedIcon />}
            onClick={() => navigate('/')}
          >
          Retornar 
          </Button>

          <Typography component="h1" variant="h5" align="center" color="primary">Bem-vindo ao painel de Adminstração</Typography>
          <Typography variant="h6" color="primary" padding="10px">O que deseja fazer?</Typography> 

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, marginTop: 3 }}>
            <Button variant="outlined" color="primary" 
              startIcon={gerenciarIconUp ? <KeyboardArrowUp /> : <KeyboardArrowDown />} 
              onClick={handleGerenciarProduto}
            >
              Gerenciar Produtos
            </Button>

          <Collapse in={showGerenciarMenu} sx={{ width: '100%', mt: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                
                <Button variant="contained" color="success" onClick={() => {setShowAddProduto(!showAddProduto); setShowAttProduto(false); }}>
                  Adicionar Produto
                </Button>

                {showAddProduto && (
                  <AddProduto onCancel={() => setShowAddProduto(false)} />
                )}

                <Button variant="contained" color="warning"
                  onClick={() => {
                    setShowAttProduto(!showAttProduto);
                    setShowAddProduto(false); 
                  }}
                >
                  Modificar Produto
                </Button>
                {showAttProduto && (
                  <AttProduto onCancel={() => setShowAttProduto(false)} />
                )}

              </Box>
            </Collapse>

            <Button variant="outlined" color="primary" startIcon={historicoIconUp ? <KeyboardArrowUp /> : <KeyboardArrowDown />} onClick={handleHistoricoPedidos}>
              Histórico de Pedidos
            </Button>
            <Collapse in={showHistorico} sx={{ width: '100%', mt: 2 }}>

              {showHistorico && <Historico />}
              
            </Collapse>
          </Box>
        </Paper>
      </Container>
    </Container>
    
  )
}


const Admin = () => {
  // return NovoMenu(); // Use NovoMenu() para o novo design ou oldMenu() para o antigo
  return NovoMenu(); // Use oldMenu() para o antigo design
}

export default Admin;
