
import { useState } from 'react';
import '../components/PizzaCard.css'
import { toast,  ToastContainer } from 'react-toastify';
import { TextField, Select, MenuItem, Button, Card , Container} from '@mui/material';
import { useProdutos } from '../context/ProdutosContext';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";

const AttProduto = () => {

  const [openDialog, setOpenDialog] = useState(false);

  const {produtos, removerProduto, atualizarProduto} = useProdutos();
  const [pizzaSelecionada, setPizzaSelecionada] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    ingredients: "",
    category: "",
    subcategory: "",
    price: "",
    image: "" 
  });


  const handleSelecionarPizza = (id) => {

  setPizzaSelecionada(id);
  const produto = produtos.find(p => p.id === id);
    if (produto) {
      setFormData({
        title: produto.title,
        ingredients: produto.ingredients,
        category: produto.category,
        subcategory: produto.subcategory,
        price: produto.price,
        image: produto.image
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSalvar = () => {
    atualizarProduto(pizzaSelecionada, formData);
    toast.success("Item modificado com sucesso!");
    setTimeout(() => {
      if (onCancel) onCancel();
    }, 1500); 
  };

  //pra ele desaparecer na hora
  const handleRemover = () => {
    removerProduto(pizzaSelecionada);
    setPizzaSelecionada("");
    setFormData({
      title: "",
      ingredients: "",
      category: "",
      subcategory: "",
      price: "",
      image: ""
    });

    setOpenDialog(false);
  };

  return (
    <Container>
      <h3>Selecione uma pizza: </h3>
      <Select
        value={pizzaSelecionada}
        onChange={(e) => handleSelecionarPizza(e.target.value)}
        displayEmpty
        fullWidth
      >
        <MenuItem value="">Selecione...</MenuItem>
        {produtos.map((produto) => (
          <MenuItem key={produto.id} value={produto.id}>
            {produto.title}
          </MenuItem>
        ))}
      </Select>

      {pizzaSelecionada && (
        <>
          <Card sx={{ mt: 2, p: 2 }}>
            <img src={formData.image} alt={formData.title} style={{ width: "150px" }} />
            <h2>{formData.title}</h2>
            <p>{formData.ingredients}</p>
            <p>{formData.category} - {formData.subcategory}</p>
            <p>R$ {formData.price}</p>
            <Button color="primary" variant='contained' onClick={() => setOpenDialog(true)}>
              Excluir Produto
            </Button>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
              <DialogTitle>Confirmar exclusão de {formData.title}</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Tem certeza que deseja excluir este produto? Esta ação não poderá ser desfeita.
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
                <Button color="primary" variant='contained' onClick={handleRemover}>Excluir</Button>
              </DialogActions>
            </Dialog>



          </Card>

          <Card sx={{ mt: 2, p: 2 }}>
            <h3>Alterar Informações</h3>
            <TextField name="title" label="Título" value={formData.title} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
            <TextField name="ingredients" label="Ingredientes" value={formData.ingredients} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
            <TextField name="category" label="Categoria" value={formData.category} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
            <TextField name="subcategory" label="Subcategoria" value={formData.subcategory} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
            <TextField name="image" label="URL da Imagem" value={formData.image} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
            

            {/*pro preco nao aparecer se for pizza*/}
            {formData.category.toLowerCase() !== "pizza" && (
              <TextField
                name="price"
                label="Preço"
                type="number"
                value={formData.price}
                onChange={handleChange}
                fullWidth
                sx={{ mb: 2 }}
              />
            )}

            <Button variant="contained" color="primary" onClick={handleSalvar}>
              Salvar Alterações
            </Button>
          </Card>
        </>
      )}
      <ToastContainer position="top-right" hideProgressBar={false} />
    </Container>
  )
}

export default AttProduto