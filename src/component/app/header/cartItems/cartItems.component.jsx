import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Grid, makeStyles, Typography, Button } from '@material-ui/core';
import clsx from 'clsx';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const useStyles = makeStyles(theme => ({
    cart: {
        position: 'absolute',
        top: '100%',
        left: '0%',
        transform: 'translateX(-50%)',
        maxHeight: '50vh',
        overflowY: 'scroll',
        width: '250px',
        color: 'black',
        backgroundColor: 'white',
        border: '2px solid rgba(0,0,0,.87)',
        overflowX: 'hidden',
        zIndex: 2
    },
    cartItems: {
        margin: theme.spacing(1),
        whiteSpace: 'nowrap'
    },
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
    price: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    sticky: {
        position: 'sticky',
        bottom: 0,
        textAlign: 'center',
        padding: theme.spacing(.5)
    },
    checkoutButton: {
        backgroundColor: '#000 !important',
        color: 'white',
        padding: '5px 15px !important'
    }
}));

const Cart = ({ showCart }) => {
    const classes = useStyles();
    const cart = useSelector(state => state.cart);
    const history = useHistory();

    const goToCheckout = useCallback(() => {
        history.push('/checkout');
    }, [history]);

    return (
        <AnimatePresence>
            {
                Object.keys(cart).length && showCart && (
                    <Grid container className={clsx(classes.cart)} component={motion.div}>
                        {
                            Object.keys(cart).map((item, index) => {
                                let { imageUrl, price, qty } = cart[item];
                                return (
                                    <Grid container item xs={12} key={index} className={clsx(classes.cartItems)}>
                                        <Grid item xs={4}>
                                            <img src={imageUrl} alt={item} className={clsx(classes.img)} />
                                        </Grid>
                                        <Grid container item xs={8}>
                                            <Grid container item xs={12} alignItems='flex-end'>
                                                <Typography variant='h6' className={clsx(classes.price)}>
                                                    {item}
                                                </Typography>
                                            </Grid>
                                            <Grid container item xs={12} >
                                                <Typography variant='h6' className={clsx(classes.price)}>
                                                    ${price} * {qty}
                                                </Typography>

                                            </Grid>
                                        </Grid>
                                    </Grid>
                                );
                            })
                        }
                        <Grid item xs={12} className={clsx(classes.sticky)}>
                            <Button
                                startIcon={<ShoppingCartIcon />}
                                className={clsx(classes.checkoutButton)}
                                onClick={goToCheckout}
                            >
                                Checkout Items
                            </Button>
                        </Grid>
                    </Grid>
                )
            }
        </AnimatePresence>
    );
}
export default Cart;