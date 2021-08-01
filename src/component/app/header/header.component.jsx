import React, { useCallback, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles, AppBar, Toolbar, Button, Badge, Grid, Avatar, SvgIcon } from '@material-ui/core';
import clsx from 'clsx';
import StoreIcon from '@material-ui/icons/Store';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
//import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';

//importing custom components
import Cart from './cartItems/cartItems.component';
import Profile from './profile/profile.component';

//importing icon
import { ReactComponent as CrownIcon } from '../../../assets/crown.svg';

const useStyles = makeStyles((theme) => ({
    appBar: {
        background: 'transparent',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'nowrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        minHeight: '10%',
        backgroundColor: 'white',
        zIndex: 2,
        width: '100%',
    },
    button: {
        position: 'relative',
        top: theme.spacing(1)
    },
    logo: {
        height: '60px',
        width: '60px',
        marginLeft: theme.spacing(2),
        '&:hover': {
            cursor: 'pointer'
        },
    },
    badge: {
        transform: 'scale(.85)'
    },
    relativeContainer: {
        position: 'relative',
    },
    marginX: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1)
    },
    avatar: {
        '&:hover': {
            cursor: 'pointer'
        }
    }

}));

const Header = () => {
    const classes = useStyles();
    const history = useHistory();
    const [showCart, setShowCart] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [numItems, setNumItems] = useState();
    const avatar = useSelector(state => state?.currentUser?.photoURL);
    const cart = useSelector(state => state.cart);

    const goToHome = useCallback(() => {
        history.push('/');
    }, [history]);

    const goToShop = useCallback(() => {
        history.push('/shop');
    }, [history]);

    const toggleCart = useCallback(() => {
        setShowCart(prevState => !prevState);
    }, [setShowCart]);

    const toggleProfile = useCallback(() => {
        setShowProfile(prevState => !prevState);
    }, [setShowProfile]);

    useEffect(() => {
        let qty = 0;
        Object.keys(cart).forEach(item => {
            qty += cart[item].qty
        });
        setNumItems(qty);
    }, [cart]);

    return (
        <AppBar className={clsx(classes.appBar)} elevation={0} position='sticky'>
            <SvgIcon onClick={goToHome} className={clsx(classes.logo)} viewBox='0 0 50 30 '>
                <CrownIcon />
            </SvgIcon>
            <Toolbar>
                <Button startIcon={<StoreIcon />} className={clsx(classes.button)} size='medium' onClick={goToShop}>
                    SHOP
                </Button>
                <Grid item className={clsx(classes.relativeContainer, classes.marginX)}>
                    <Button
                        startIcon={
                            <Badge badgeContent={numItems} color='primary' className={clsx(classes.badge)}>
                                <ShoppingCartIcon />
                            </Badge>
                        }
                        className={clsx(classes.button)}
                        size='medium'
                        onClick={toggleCart}
                    >
                        CART
                    </Button>
                    <Cart showCart={showCart} />
                </Grid>
                <Grid item className={clsx(classes.relativeContainer, classes.button)}>
                    <Avatar src={avatar} alt='user' className={clsx(classes.avatar)} onClick={toggleProfile} />
                    <Profile showProfile={showProfile} />
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default Header;