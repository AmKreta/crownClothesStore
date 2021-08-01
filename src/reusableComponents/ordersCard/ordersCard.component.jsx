import React from 'react';
import { Card, Grid, CardMedia, Typography, CardActionArea, CardContent, makeStyles } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import clsx from 'clsx';

const useStyles = makeStyles(theme => ({
    centerText: {
        textAlign: 'center'
    },
    cardActions: {
        marginTop: theme.spacing(1),
        borderTop: '2px solid #ccc',
        height: '32px',
        '&>div:not(:last-child)': {
            borderRight: '2px solid #ccc'
        },
        '&>div:hover': {
            cursor: 'pointer'
        },
        '& button': {
            height: '100% !important',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }
    },
    flexContainer: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'flex-start',
        fontWeight: 500,
        '&>*': {
            '&:first-child': {
                width: '45px'
            }
        }
    },
    noPadding: {
        padding: '0 !important'
    },
    paddingX: {
        paddingRight: theme.spacing(1),
        paddingLeft: theme.spacing(1)
    },
    icon: {
        color: '#888'
    }
}));

const OrdersCard = ({ product, price, qty, imageUrl, checkoutPage, increment, decrement, remove }) => {
    const classes = useStyles();

    return (
        <Card className={clsx(classes.card)} elevation={7} component={Grid} container item xs={12} alignItems='stretch'>
            <CardMedia
                image={imageUrl}
                title={product}
                component={Grid}
                item
                xs={4}
            />
            <CardContent component={Grid} container item xs={8} alignContent='space-between' className={checkoutPage && clsx(classes.noPadding)}>
                <Grid item xs={12} className={clsx(classes.paddingX)}>
                    <Typography variant='h6' style={{ whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        {product}
                    </Typography>
                </Grid>
                <Grid item xs={12} className={clsx(classes.flexContainer, classes.paddingX)}>
                    <Typography variant='title' color="textSecondary">Mrp</Typography>
                    <Typography variant='title' >${price}</Typography>
                </Grid>
                <Grid item xs={12} className={clsx(classes.flexContainer, classes.paddingX)}>
                    <Typography variant='title' color="textSecondary">Qty</Typography>
                    <Typography variant='title'>{qty}</Typography>
                </Grid>
                <Grid item xs={12} className={clsx(classes.flexContainer, classes.paddingX)}>
                    <Typography variant='title' color="textSecondary">Total</Typography>
                    <Typography variant='title'>${qty * price}</Typography>
                </Grid>
                {
                    checkoutPage && (
                        <Grid container item xs={12} className={clsx(classes.cardActions)} alignItems='stretch'>
                            <Grid item xs={4}>
                                <CardActionArea onClick={increment} data-product={product}>
                                    <AddIcon className={clsx(classes.icon)} />
                                </CardActionArea>
                            </Grid>
                            <Grid item xs={4} >
                                <CardActionArea onClick={decrement} data-product={product}>
                                    <RemoveIcon className={clsx(classes.icon)} />
                                </CardActionArea>
                            </Grid>
                            <Grid item xs={4} >
                                <CardActionArea onClick={remove} data-product={product}>
                                    <DeleteOutlineIcon className={clsx(classes.icon)} />
                                </CardActionArea>
                            </Grid>
                        </Grid>
                    )
                }
            </CardContent>
        </Card>
    );
}

export default OrdersCard;