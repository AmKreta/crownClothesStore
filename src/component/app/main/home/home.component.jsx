import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Grid, makeStyles, Typography, Paper } from '@material-ui/core';
import clsx from 'clsx';
import { useHistory } from 'react-router';

const useStyles = makeStyles(theme => ({
    container: {
        height: '90%',
        padding: theme.spacing(1)
    },
    item: {
        height: '50%',
        padding: theme.spacing(1),
        backgroundClip: 'content-box',
    },
    paper: {
        height: '100%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    touchable: {
        borderRadius: '5px',
        minHeight: '45%',
        width: '45%',
        backgroundColor: 'rgba(255,255,255,.9)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textTransform: 'capitalize',
        boxShadow: '0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 5px 8px 0px rgb(0 0 0 / 14%), 0px 1px 14px 0px rgb(0 0 0 / 12%)',
        transition: '.3s ease-in-out',
        '&:hover': {
            cursor: 'pointer',
            backgroundColor: 'rgba(255,255,255,1)'
        }
    }
}));

const Items = ({ title, id, size, imageUrl, linkUrl }) => {

    const classes = useStyles();
    const history = useHistory();

    const onClick = useCallback(() => {
        history.push(linkUrl);
    }, [history, linkUrl]);

    return (
        <Grid container item className={clsx(classes.item)} xs={12} sm={6} md={size === 'large' ? 6 : 4}  >
            <Paper style={{ backgroundImage: `url(${imageUrl})` }} className={clsx(classes.paper)} elevation={5}>
                <Grid item className={clsx(classes.touchable)} onClick={onClick}>
                    <Typography variant='h4'>{title}</Typography>
                    <Typography variant='h5'>Shop Now</Typography>
                </Grid>
            </Paper>
        </Grid >
    );
}

const Home = () => {
    const classes = useStyles();
    const shopCategory = useSelector(state => state.shopCategory);

    return (
        <Grid container direction='row' className={clsx(classes.container)} >
            {
                shopCategory.map((item, index) => (
                    <Items {...item} key={index} />
                ))
            }
        </Grid>
    )
}

export default Home;