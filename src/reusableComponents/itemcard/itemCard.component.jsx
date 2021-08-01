import React from 'react';
import { Grid, Paper, Typography, makeStyles, Button } from '@material-ui/core';
import clsx from 'clsx';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles((theme) => ({
    paperContainer: {
        padding: theme.spacing(1)
    },
    paper: {
        height: '100%',
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        transition: '.3s ease-in-out',
        position: 'relative',
        '&:hover>button': {
            opacity: 1
        }
    },
    img: {
        height: '90%',
        width: '100%',
        objectFit: 'cover'
    },
    typography: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1)
    },
    button: {
        opacity: 0,
        position: 'absolute',
        top: '80%',
        left: '50%',
        transform: 'translate(-50%,-50%) scale(1.2)',
        transition: '.2s ease-in-out',
        minWidth: '60%',
        whiteSpace: 'nowrap'
    }
}));

function ItemCard({ name, price, imageUrl, addItemToCart, index }) {
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={6} md={3} className={clsx(classes.paperContainer)}>
            <Paper className={clsx(classes.paper)} elevation={5}>
                <img src={imageUrl} alt={name} className={clsx(classes.img)} />
                <Typography variant='h6' className={clsx(classes.typography)}>
                    {name}
                </Typography>
                <Typography variant='h6' className={clsx(classes.typography)}>
                    ${price}
                </Typography>
                <Button id={index} className={clsx(classes.button)} size='large' variant='contained' startIcon={<ShoppingCartIcon />} onClick={addItemToCart}>
                    Add To Cart
                </Button>
            </Paper>
        </Grid>
    )
}

export default ItemCard;