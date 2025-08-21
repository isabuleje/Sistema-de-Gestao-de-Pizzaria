import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, TextField, Button, Typography, Paper, Grid, useTheme } from '@mui/material';
import { toast } from 'react-toastify';
import { useThemeUpdate } from '../context/ThemeContext';

/* 

    Mano, acho que eu ferrei com a parte do cardapio com essas cores bizarras
    enfim, cores bizarras
*/

const colorNameMap = {
    primary: 'Cor Primária',
    secondary: 'Cor Secundária',
    error: 'Cor de Erro',
    warning: 'Cor de Aviso',
    info: 'Cor de Informação',
    success: 'Cor de Sucesso',
};

const handleDrop = (e, imageKey) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
            handleImageChange(imageKey, reader.result);
            toast.success(`Imagem '${imageKey}' atualizada!`);
        };
        reader.readAsDataURL(file);
    } else {
        toast.error("Por favor, solte um arquivo de imagem válido.");
    }
};

const getDisplayImageUrl = (imageUrl) => {
    if (!imageUrl) return '';
    // Verifica se a string já é Base64
    if (imageUrl.startsWith('data:')) {
        return imageUrl;
    }
    //se ela pertence ao servidor
    if (imageUrl.startsWith('/images/') || imageUrl.startsWith('/img/')) {
        return `http://localhost:3001${imageUrl}`;
    }
    // senao, pode ser url externa ent aceita
    return imageUrl;
};

const handleSaveChanges = async () => {
    try {
        await axios.put(API_URL, themeData);
        toast.success("Tema atualizado com sucesso! A página será recarregada para aplicar as mudanças.");
        await refetchTheme();
        onCancel();
    } catch (error) {
        toast.error("Erro ao salvar o tema.");
        console.error(error);
    }
};

const API_URL = "http://localhost:3001/theme";

function ThemeEditor({ onCancel }) {
    // dados do tema + careregamento
    const [themeData, setThemeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const refetchTheme = useThemeUpdate();
    const theme = useTheme();

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
        <Paper elevation={3} sx={{
            padding: 3, mt: 2, minWidth: 220
        }}>
            <Typography variant="h6" gutterBottom>Editor de Tema</Typography>

            {/* Seção de Paleta de Cores */}
            <Box sx={{ mb: 3, minWidth: 220 }}>

                <Typography variant="subtitle1">Paleta de Cores</Typography>
                <Grid container spacing={2} sx={{ mt: 1, minWidth: 110 }}>
                    {Object.keys(themeData.palette).map(colorName => (
                        <Grid item xs={12} sm={6} md={4} key={colorName}>
                            <Typography variant="body1" color="initial">{colorNameMap[colorName] || colorName}</Typography>
                            <TextField
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
                <Typography variant="subtitle1" gutterBottom>Imagens</Typography>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {Object.keys(themeData['images-url']).map(imageKey => (
                        <Grid item xs={12} sm={6} md={4} key={imageKey}>
                            <Typography variant="body2" sx={{ mb: 1, fontWeight: 'bold' }}>{imageKey}</Typography>
                            <Box
                                onDrop={(e) => handleDrop(e, imageKey)}
                                onDragOver={(e) => e.preventDefault()}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: `2px dashed ${theme.palette.divider}`,
                                    borderRadius: 1,
                                    padding: 2,
                                    textAlign: "center",
                                    height: 150, // Altura fixa para consistência
                                    cursor: 'pointer',
                                    backgroundColor: theme.palette.action.hover,
                                    '&:hover': {
                                        borderColor: theme.palette.primary.main,
                                        backgroundColor: theme.palette.action.selected,
                                    }
                                }}
                            >
                                {themeData['images-url'][imageKey] ? (
                                    <img
                                        src={getDisplayImageUrl(themeData['images-url'][imageKey])}
                                        alt={`${imageKey} preview`}
                                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: 'contain' }}
                                    />
                                ) : (
                                    <Typography variant="body2" color="textSecondary">
                                        Arraste uma imagem aqui
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Botões */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
                <Button variant="outlined" color="secondary" onClick={onCancel}>Cancelar</Button>
                <Button variant="contained" color="primary" onClick={handleSaveChanges}>Salvar Alterações</Button>
            </Box>
        </Paper>
    );
}

export default ThemeEditor


