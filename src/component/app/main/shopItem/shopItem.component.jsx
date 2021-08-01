import React, { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';

//importing reusable Component
import CollectionOverview from '../../../../reusableComponents/collectionOverview/collectionOverview.component';

//importing actions
import { addToCart } from '../../../../actions/actions';

const useStyles = makeStyles(theme => ({
    container: {
        minHeight: '90%',
        padding: theme.spacing(1)
    },
    header: {
        textAlign: 'center',
        marginBottom: theme.spacing(1)
    }
}));

const ShopItem = ({ match }) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    const shopData = useSelector(state => state.shopData);

    const shopItem = useMemo(() => {
        const item = match?.params?.item;
        return shopData.find(data => data?.title?.toLowerCase() === item?.toLowerCase());
    }, [match]);

    const addItemToCart = useCallback((e) => {
        const { name, imageUrl, price } = shopItem.items[parseInt(e.currentTarget.id)];
        dispatch(addToCart({ name, imageUrl, price }));
    }, [dispatch, shopItem])


    return (
        <Grid container className={clsx(classes.container)}>
            <Grid item xs={12} className={clsx(classes.header)}>
                <Typography variant='h2' xs={12}>{shopItem?.title}</Typography>
            </Grid>
            <Grid container item xs={12}>
                <CollectionOverview collection={shopItem?.items} addItemToCart={addItemToCart} />
            </Grid>
        </Grid>
    );
}

export default ShopItem;