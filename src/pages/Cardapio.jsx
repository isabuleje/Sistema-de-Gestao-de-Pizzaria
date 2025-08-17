import React from 'react'
import PizzaCard from '../components/PizzaCard'
import Header from '../components/Header'
import { useState } from 'react'
import { useProdutos } from "../context/ProdutosContext";
import Footer from '../components/Footer'
import { useThemeData } from '../context/ThemeDataContext.jsx';

import { Container, Box, Button, Typography, Paper, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const Cardapio = () => {
  const tamanhos = [
    { nome: 'Pequena', preco: 'R$ 77,99' },
    { nome: 'Média', preco: 'R$ 99,99' },
    { nome: 'Grande', preco: 'R$ 110,99' },
    { nome: 'Família', preco: 'R$ 130,99' },
  ];

  const { images } = useThemeData(); //pra usar ibagens
  const { produtos, ingredientes, categorias } = useProdutos();

  const [mostrarFiltrosIng, setMostrarFiltrosIng] = useState(false);
  const [mostrarFiltrosTipos, setMostrarFiltrosTipos] = useState(false);
  const [ingredienteSelecionado, setIngredienteSelecionado] = useState("");
  const [tipoSelecionado, setTipoSelecionado] = useState("");

  //Pizzas filtradas por ingredientes (que estão no produtosContext)
  const pizzasFiltradas = ingredienteSelecionado
    ? produtos.filter(pizza =>
      pizza.ingredients[0]
        .toLowerCase()
        .includes(ingredienteSelecionado.toLowerCase())
    )
    : produtos;

  //Produtos filtradas por tipos
  const tiposFiltrados = tipoSelecionado
    ? produtos.filter(produto => produto.subcategory == tipoSelecionado)
    : produtos;

  const pizzasSalgadas = produtos.filter(p => p.category === "pizza" && p.subcategory === "salgada");
  const pizzasDoces = produtos.filter(p => p.category === "pizza" && p.subcategory === "doce");
  const bebidasRefri = produtos.filter(p => p.category === "bebida" && p.subcategory === "refrigerante");
  const bebidasVinho = produtos.filter(p => p.category === "bebida" && p.subcategory === "vinho");
  const bebidasAgua = produtos.filter(p => p.category === "bebida" && p.subcategory === "água");

  return (
    <Box sx={{ backgroundImage: `url(${images['fundo']})`, minHeight: '100vh' }}>
      <Header />
      {/* Principal aqui */}
      <Container maxWidth="90%" sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, pt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            size='large'
            onClick={() => {
              setMostrarFiltrosIng(!mostrarFiltrosIng)
              if (mostrarFiltrosIng) {
                setIngredienteSelecionado('');
              }
            }}
          >
            {mostrarFiltrosIng ? 'Ocultar Filtros' : 'Filtrar por ingrediente'}
          </Button>

          <Button
            variant="contained"
            color="primary"
            size='large'
            onClick={() => {
              setMostrarFiltrosTipos(!mostrarFiltrosTipos);
              // Lógica de reset: se o filtro estiver sendo ocultado, reseta o valor
              if (mostrarFiltrosTipos) {
                setTipoSelecionado('');
              }
            }}
          >
            {mostrarFiltrosTipos ? 'Ocultar Filtros' : 'Filtrar por tipo'}
          </Button>
        </Box>

        {mostrarFiltrosIng && (
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" color="text.primary">Selecione um ingrediente:</Typography>
            <FormControl sx={{ minWidth: 300, mt: 1 }}>
              <InputLabel id="ingrediente-label" >Ingrediente</InputLabel>
              <Select
                labelId="ingrediente-label"
                value={ingredienteSelecionado}
                label="Ingrediente"
                variant='filled'
                sx={{ backgroundColor: 'primary.light' }}
                onChange={(e) => setIngredienteSelecionado(e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                {ingredientes.map((ing, index) => (
                  <MenuItem key={index} value={ing}>
                    {ing}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {mostrarFiltrosTipos && (
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" color="text.primary">Selecione um tipo de produto:</Typography>
            <FormControl sx={{ minWidth: 300, mt: 1 }}>
              <InputLabel id="tipo-label">Tipo</InputLabel>
              <Select
                labelId="tipo-label"
                value={tipoSelecionado}
                label="Tipo"
                sx={{ backgroundColor: 'primary.light' }}
                onChange={(e) => setTipoSelecionado(e.target.value)}
              >
                <MenuItem value="">Todos</MenuItem>
                {categorias.map((tipo, index) => (
                  <MenuItem key={index} value={tipo}>
                    {tipo}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}

        {ingredienteSelecionado && (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                border: (theme) => `2px solid ${theme.palette.primary.dark}`,
                color: 'primary.contrastText',
                padding: '10px',
                textAlign: 'center',
                backgroundColor: 'primary.main',
                textShadow: '2px 2px #421a0e', // Pode ser mantido ou customizado
                borderRadius: '5px'
              }}
            >
              Pizzas filtradas
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2 }}>
              {pizzasFiltradas.map(pizza => (
                <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                  <PizzaCard pizza={pizza} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {tipoSelecionado && (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                border: (theme) => `2px solid ${theme.palette.primary.dark}`,
                color: 'primary.contrastText',
                padding: '10px',
                textAlign: 'center',
                backgroundColor: 'primary.main',
                textShadow: '2px 2px #421a0e', // Pode ser mantido ou customizado
                borderRadius: '5px'
              }}
            >
              Tipos filtrados
            </Typography>
            <Grid container spacing={3} sx={{ mt: 2, alignItems: 'center', justifyContent: 'center' }}>
              {tiposFiltrados.map(tipo => (
                <Grid item xs={12} sm={6} md={4} key={tipo.id}>
                  <PizzaCard pizza={tipo} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Pizza aqui */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h3" component="h1" sx={{
            border: (theme) => `2px solid ${theme.palette.primary.dark}`,
            color: 'primary.contrastText',
            padding: '10px',
            textAlign: 'center',
            backgroundColor: 'primary.main',
            textShadow: '2px 2px #421a0e', // Pode ser mantido ou customizado
            borderRadius: '5px'
          }}>
            Pizzas
          </Typography>

          {/* Responsividadeeee */}
          <Box sx={{ my: 4, px: 2 }}>
            <Grid container spacing={3} justifyContent="center">
              {tamanhos.map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Paper
                    sx={{
                      p: 2,
                      textAlign: 'center',
                      backgroundColor: 'primary.main',
                      border: (theme) => `1px solid ${theme.palette.primary.dark}`,
                      transition: 'transform 0.3s',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                    elevation={4}>
                    <Typography variant="h5" sx={{ color: 'primary.contrastText' }}>
                      {item.nome}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mt: 1,
                        textDecoration: 'underline',
                        color: 'primary.contrastText',
                      }}
                    >
                      {item.preco}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>

        {/* Pizza salgadas */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h2" sx={{
            textAlign: 'center',
            color: 'secondary.contrastText',
            backgroundColor: 'secondary.main',
            padding: '10px',
            borderRadius: '30px',
            textShadow: '1px 1px #421a0e',
            border: (theme) => `1px solid ${theme.palette.secondary.dark}`
          }}>
            Pizzas salgadas
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2, mb: 3, alignItems: 'center', justifyContent: 'center' }}>
            {pizzasSalgadas.map(pizza => (
              <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                <PizzaCard pizza={pizza} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h2" sx={{
            textAlign: 'center',
            color: 'secondary.contrastText',
            backgroundColor: 'secondary.main',
            padding: '10px',
            borderRadius: '30px',
            textShadow: '1px 1px #421a0e',
            border: (theme) => `1px solid ${theme.palette.secondary.dark}`
          }}>
            Pizzas doces
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2, mb: 3, alignItems: 'center', justifyContent: 'center' }}>
            {pizzasDoces.map(pizza => (
              <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                <PizzaCard pizza={pizza} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h3" component="h1" sx={{
            border: (theme) => `2px solid ${theme.palette.primary.dark}`,
            color: 'primary.contrastText',
            padding: '10px',
            textAlign: 'center',
            backgroundColor: 'primary.main',
            textShadow: '2px 2px #421a0e', // Pode ser mantido ou customizado
            borderRadius: '5px'
          }}>
            Bebidas
          </Typography>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h2" sx={{
            textAlign: 'center',
            color: 'secondary.contrastText',
            backgroundColor: 'secondary.main',
            padding: '10px',
            borderRadius: '30px',
            textShadow: '1px 1px #421a0e',
            border: (theme) => `1px solid ${theme.palette.secondary.dark}`
          }}>
            Água
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2, mb: 3, alignItems: 'center', justifyContent: 'center' }}>
            {bebidasAgua.map(pizza => (
              <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                <PizzaCard pizza={pizza} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h2" sx={{
            textAlign: 'center',
            color: 'secondary.contrastText',
            backgroundColor: 'secondary.main',
            padding: '10px',
            borderRadius: '30px',
            textShadow: '1px 1px #421a0e',
            border: (theme) => `1px solid ${theme.palette.secondary.dark}`
          }}>
            Refrigerante
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2, mb: 3, alignItems: 'center', justifyContent: 'center' }}>
            {bebidasRefri.map(pizza => (
              <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                <PizzaCard pizza={pizza} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h4" component="h2" sx={{
            textAlign: 'center',
            color: 'secondary.contrastText',
            backgroundColor: 'secondary.main',
            padding: '10px',
            borderRadius: '30px',
            textShadow: '1px 1px #421a0e',
            border: (theme) => `1px solid ${theme.palette.secondary.dark}`
          }}>
            Vinho
          </Typography>
          <Grid container spacing={3} sx={{ mt: 2, mb: 3, alignItems: 'center', justifyContent: 'center' }}>
            {bebidasVinho.map(pizza => (
              <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                <PizzaCard pizza={pizza} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}

export default Cardapio
