import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import clsx from 'clsx';

//importing sdhop data
import ShopData from '../../../../assetsPath/shop.data';

//importing reusable components
import ItemCard from '../../../../reusableComponents/itemcard/itemCard.component';
import CollectionOverview from '../../../../reusableComponents/collectionOverview/collectionOverview.component';

//importing redux actions
import { addToCart } from '../../../../actions/actions';

const useStyles = makeStyles(theme => ({
    container: {
        minHeight: '90%',
        width: '100%'
    },
    category: {
        flexWrap: 'wrap',
        marginTop: theme.spacing(2),
        '&:not(:first-child)': {
            marginTop: theme.spacing(2)
        }
    },
    categoryHeader: {
        marginLeft: theme.spacing(1),
        marginTop: theme.spacing(1),
        color: '#333',
        '&:hover': {
            cursor: 'pointer'
        }
    }
}));

const Shop = () => {

    const classes = useStyles();

    const history = useHistory();

    const dispatch = useDispatch();

    const goTo = useCallback(e => {
        history.push(`/shop/${e.currentTarget.innerText}`);
    }, [history]);

    const addItemToCart = useCallback((e) => {
        const itemCategoryIndex = e.currentTarget.parentNode.parentNode.parentNode.getAttribute('index');
        const itemIndex = e.currentTarget.id;
        const { name, price, imageUrl } = ShopData[itemCategoryIndex].items[itemIndex];
        dispatch(addToCart({ name, price, imageUrl }));
    }, [dispatch]);

    return (
        <Grid container className={clsx(classes.container)}>
            {
                ShopData.map((item, index) => (
                    <Grid container item xs={12} key={index} className={clsx(classes.category)}>
                        <Grid item xs={12} className={clsx(classes.categoryHeader)}>
                            <Typography variant='h3' onClick={goTo}>
                                {item.title}
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} index={index}>
                            <CollectionOverview collection={item?.items} addItemToCart={addItemToCart} />
                        </Grid>
                    </Grid>
                ))
            }
        </Grid>
    );
}

export default Shop;