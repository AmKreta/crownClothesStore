import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Grid, Typography, makeStyles, Button } from '@material-ui/core';
import clsx from 'clsx';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

//importing reusable components
import OrdersCard from '../../../../reusableComponents/ordersCard/ordersCard.component';

//importing actions
import { addToCart, removeFromCart } from '../../../../actions/actions';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1
    },
    container: {
        height: '90%',
        width: '100%',
        padding: theme.spacing(1)
    },
    centerText: {
        textAlign: 'center'
    },
    header: {
        marginBottom: theme.spacing(2),
        height: '8%'
    },
    buyNowButton: {
        position: 'sticky',
        bottom: '8px',
        backgroundColor: '#111 !important',
        color: 'white !important',
        marginBottom: theme.spacing(1),
        marginTop: theme.spacing(2)
    },
    cardContainer: {
        minHeight: 'calc(92% - 50px )'
    }
}));

const Checkout = () => {
    const classes = useStyles();
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();

    const increment = useCallback((e) => {
        const item = e.currentTarget.getAttribute('data-product');
        dispatch(addToCart({ name: item, price: cart[item].price, imageUrl: cart[item].imageUrl }));
    }, [dispatch, cart]);

    const decrement = useCallback((e) => {
        const item = e.currentTarget.getAttribute('data-product');
        dispatch(removeFromCart({ name: item }));
    }, [dispatch]);

    const remove = useCallback((e) => {
        const item = e.currentTarget.getAttribute('data-product');
        dispatch(removeFromCart({ name: item, numItems: cart[item].qty }));
    }, [dispatch, cart]);

    return (
        <Grid container className={clsx(classes.root, classes.container)} alignContent='flex-start' justifyContent='center'>
            <Grid item xs={12} className={clsx(classes.centerText, classes.header)}>
                <Typography variant='h3'>
                    Checkout
                </Typography>
            </Grid>
            {
                Object.keys(cart).length
                    ? (
                        <>
                            <Grid container item xs={12} spacing={2} className={clsx(classes.cardContainer)} alignItems='flex-start' alignContent='flex-start'>
                                {
                                    Object.keys(cart).map((item, index) => (
                                        <Grid key={index} container item xs={12} sm={6} md={3}>
                                            <OrdersCard
                                                product={item}
                                                price={cart[item].price}
                                                qty={cart[item].qty}
                                                imageUrl={cart[item].imageUrl}
                                                checkoutPage
                                                increment={increment}
                                                decrement={decrement}
                                                remove={remove}
                                            />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                            <Button size='large' className={clsx(classes.buyNowButton)} startIcon={<ShoppingCartIcon />}>Buy now</Button>
                        </>
                    )
                    : (
                        <Grid item xs={12} className={clsx(classes.centerText)}>
                            <Typography variant='h5' color='textSecondary'>
                                No items in cart
                            </Typography>
                        </Grid>
                    )
            }
        </Grid >
    );
}

export default Checkout;