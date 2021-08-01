import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Grid, Typography, makeStyles } from '@material-ui/core';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

//importing firebase util
import { auth } from '../../../../firebaseUtil/firebase.util';

//importing actions
import { removeCurrentUser } from '../../../../actions/actions';

const useStyles = makeStyles(theme => ({
    profile: {
        position: 'absolute',
        top: '100%',
        left: '0%',
        transform: 'translateX(-80%)',
        width: '150px',
        color: 'black',
        backgroundColor: 'white',
        border: '2px solid rgba(0,0,0,.87)',
        overflowX: 'hidden',
        zIndex: 2,
        padding: 0
    },
    options: {
        transition: '.2s ease-in-out',
        width: '100%',
        padding: theme.spacing(1),
        '&:hover': {
            cursor: 'pointer',
            color: 'white',
            backgroundColor: '#111'
        }
    },
    typography: {
        textAlign: 'left',
        width: '65%'
    },
    icon: {
        width: '30%',
        textAlign: 'left'
    }
}));

const Profile = ({ showProfile }) => {
    const classes = useStyles();

    const history = useHistory();
    const dispatch = useDispatch();

    const logout = useCallback(() => {
        auth.signOut();
        dispatch(removeCurrentUser());
        history.push('/auth');
    }, [history, dispatch]);

    return (
        <AnimatePresence>
            {
                showProfile && (
                    <Grid container className={clsx(classes.profile)} component={motion.div}>
                        <Grid container item xs={12} className={clsx(classes.options)} alignItems='center' justifyContent='space-between'>
                            <AccountCircleIcon className={clsx(classes.icon)} />
                            <Typography variant='h6' className={clsx(classes.typography)}>
                                Profile
                            </Typography>
                        </Grid>
                        <Grid container item xs={12} className={clsx(classes.options)} alignItems='center' justifyContent='space-between' onClick={logout}>
                            <ExitToAppIcon className={clsx(classes.icon)} />
                            <Typography variant='h6' className={clsx(classes.typography)}>
                                Logout
                            </Typography>
                        </Grid>
                    </Grid>
                )
            }
        </AnimatePresence>
    );
}

export default Profile;