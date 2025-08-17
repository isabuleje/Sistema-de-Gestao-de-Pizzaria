import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Header = () => {
  const navigate = useNavigate();

  const handleCarrinhoClick = () => {
    navigate('/Carrinho');
  };

  const handleAcessoRestritoClick = () => {
    navigate('/login');
  };

  return (
    <AppBar  position="static" sx={{
      minHeight: {
          xs: 120,
          sm: 140,
          md: 170,
        },
      display: 'flex',
      backgroundImage: 'url("/logo/fundo.jpeg")',
      backgroundPosition: 'center',
      height: '100%',
      justifyContent: 'center'
    }}>

    <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
      {/* Logo */}
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center' }}>
        <img
          src="/logo/freddy_pizza.png"
          alt="Logo Freddy's Pizzaria"
          style={{
              height: 'auto',
              maxHeight: '140px',
              width: '100%',
              maxWidth: '160px',
            
          }}
        />
      </Box>

    {/* Título*/}
    <Box sx={{ flex: 2, display: 'flex', justifyContent: 'center' }}>
      <Typography
        variant="h2"
        component="h1"
        sx={{
          fontWeight: 'bold',
          userSelect: 'none',
          textAlign: 'center',
          fontSize: {
            xs: '24px', // telas pequenas
            sm: '48px', // tablets
            md: '60px', // desktops médios
            lg: '68px', // telas grandes
          },
        }}
      >
        Freddy's Pizzaria
      </Typography>
    </Box>

      {/* Botões de Navegação */}
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
        <IconButton
            onClick={handleCarrinhoClick}
            color="inherit"
            aria-label="Carrinho"
            size="large"
            sx={{
              '&:hover': {
                backgroundColor: 'primary.main', 
                transition: 'background-color 0.3s',
              },
            }}
          >
            <ShoppingCartIcon sx = {{fontSize: { xs: '30px', md: '50px' }}} />
          </IconButton>

          <IconButton
            onClick={handleAcessoRestritoClick}
            color="inherit"
            aria-label="Acesso Restrito"
            size="large"
            sx={{
              '&:hover': {
                backgroundColor: 'primary.main', 
                transition: 'background-color 0.3s',
              },
            }}
          >
            <LockIcon sx = {{ xs: '40px', md: '60px' }}  />
          </IconButton>
      </Box>
    </Toolbar>

    </AppBar>
  );
};

export default Header;
