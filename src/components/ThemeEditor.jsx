import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper, Grid } from '@mui/material';
import { toast } from 'react-toastify';
import { useThemeUpdate } from '../context/ThemeContext';

/* 

    Mano, acho que eu ferrei com a parte do cardapio com essas cores bizarras

*/

const API_URL = "http://localhost:3001/theme";

function ThemeEditor({ onCancel }) {
    // dados do tema + careregamento
    const [themeData, setThemeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const refetchTheme = useThemeUpdate(); 

    // Busca os dados do tema quando o componente é montado
    useEffect(() => {
        const fetchCurrentTheme = async () => {
            try {
                const response = await axios.get(API_URL);
                setThemeData(response.data);
            } catch (error) {
                toast.error("Falha ao carregar o tema atual.");
                console.error(error); // debug
            } finally {
                setLoading(false);
            }
        };
        fetchCurrentTheme();
    }, []);

    // Funções para lidar com mudanças nos inputs do formulário
    const handlePaletteChange = (colorName, value) => {
        setThemeData(prev => ({
            ...prev,
            palette: { ...prev.palette, [colorName]: value },
        }));
    };

    const handleTypographyChange = (fontFamily) => {
        setThemeData(prev => ({
            ...prev,
            typography: { ...prev.typography, fontFamily: [fontFamily] },
        }));
    };

    const handleImageChange = (imageKey, value) => {
        setThemeData(prev => ({
            ...prev,
            'images-url': { ...prev['images-url'], [imageKey]: value },
        }));
    };

    // Função para salvar os dados na API
    const handleSaveChanges = async () => {
        try {
            await axios.put(API_URL, themeData);
            toast.success("Tema atualizado com sucesso! A página será recarregada para aplicar as mudanças.");
            await refetchTheme(); 
            onCancel();  // Fecha o editor após salvar

        } catch (error) {
            toast.error("Erro ao salvar o tema.");
            console.error(error);
        }
    };

    if (loading) {
        return <Typography>Carregando editor de tema...</Typography>;
    }
    if (!themeData) {
        return <Typography>Não foi possível carregar os dados do tema.</Typography>;
    }

    return (
        <Paper elevation={3} sx={{ padding: 3, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Editor de Tema</Typography>

            {/* Seção de Paleta de Cores */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1">Paleta de Cores</Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {Object.keys(themeData.palette).map(colorName => (
                        <Grid item xs={12} sm={6} md={4} key={colorName}>
                            <TextField
                                label={colorName.charAt(0).toUpperCase() + colorName.slice(1)}
                                type="color"
                                value={themeData.palette[colorName]}
                                onChange={(e) => handlePaletteChange(colorName, e.target.value)}
                                fullWidth
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Seção de Tipografia */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1">Tipografia</Typography>
                <TextField
                    label="Família da Fonte"
                    value={themeData.typography.fontFamily[0]}
                    onChange={(e) => handleTypographyChange(e.target.value)}
                    fullWidth
                    helperText="Ex: Roboto, sans-serif"
                    margin="normal"
                />
            </Box>

            {/* Seção de Imagens */}
            <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1">Imagens</Typography>
                {Object.keys(themeData['images-url']).map(imageKey => (
                    <TextField
                        key={imageKey}
                        label={`Imagem: ${imageKey}`}
                        value={themeData['images-url'][imageKey]}
                        onChange={(e) => handleImageChange(imageKey, e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                ))}
            </Box>

            {/* Botões de Ação */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                <Button variant="outlined" color="secondary" onClick={onCancel}>Cancelar</Button>
                <Button variant="contained" color="primary" onClick={handleSaveChanges}>Salvar Alterações</Button>
            </Box>
        </Paper>
    );
}

export default ThemeEditor