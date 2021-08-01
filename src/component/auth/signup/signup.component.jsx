import React, { useMemo, useCallback } from 'react';
import { Grid, Typography, Button, makeStyles, TextField, Checkbox, SvgIcon, CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { ReactComponent as CrownIcon } from '../../../assets/crown.svg';

//importing utils
import { auth, createUserProfileDocument } from '../../../firebaseUtil/firebase.util';

const useStyles = makeStyles(theme => ({
    container: {
        height: '100%',
        width: '100%',
        padding: theme.spacing(2),
        backgroundImage: `url(${'/images/authBG.jpg'})`,
        backgroundSize: 'cover',
        backgroundColor: '#333',
        backgroundBlendMode: 'soft-light'
    },
    form: {
        padding: theme.spacing(2),
        boxShadow: '0 0 2px #ccc',
        border: '1px solid #ccc',
        borderLeftWidth: '2px',
        borderRightWidth: '2px',
        borderBottomWidth: '3px',
        borderRadius: '10px',
        backgroundColor: 'white'
    },
    formHeader: {
        textAlign: 'center',
        marginBottom: theme.spacing(2)
    },
    textField: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    actions: {
        marginTop: theme.spacing(2)
    },
    blackButton: {
        backgroundColor: '#111 !important',
        color: 'white !important'
    }
}));

const Signup = ({ setForm }) => {
    const classes = useStyles();

    const validationSchema = useMemo(() => yup.object({
        name: yup.string().required('required !'),
        email: yup.string().email('invalid email').required('required !'),
        password: yup.string().required('required !'),
        rememberMe: yup.bool().default('false')
    }), []);

    const initialValues = useMemo(() => ({
        name: '',
        email: '',
        password: '',
        rememberMe: false
    }), []);

    const handleSubmit = useCallback(async (values, formikProps) => {
        const { name, email, password } = values;
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            createUserProfileDocument(user, { displayName: name, email });
            formikProps.setSubmitting(false);
        }
        catch (err) {
            console.log(err.message);
        }
    }, []);

    const goToLoginForm = useCallback(() => {
        setForm('login')
    }, [setForm]);

    return (
        <Grid container className={clsx(classes.container)} alignItems='center' justifyContent='center' alignContent='center'>
            <Grid container item xs={12} justifyContent='center'>
                <Formik
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validateOnMount={false}
                    validateOnBlur={true}
                    validateOnChange={false}
                >
                    {
                        formik => (
                            <Grid className={clsx(classes.form)} container item xs={12} sm={6} md={4} component={Form} autoComplete='off' alignContent='center'>
                                <Grid container item xs={12} alignItems='baseline' justifyContent='center' className={clsx(classes.formHeader)}>
                                    <SvgIcon viewBox='0 0 50 30' style={{ fontSize: '60px', marginRight: '10px' }}>
                                        <CrownIcon />
                                    </SvgIcon>
                                    <Typography variant='h3'>
                                        Signup
                                    </Typography>
                                </Grid>
                                <Field name='name'>
                                    {
                                        ({ field, form, meta }) => {
                                            return (
                                                <TextField
                                                    label='name'
                                                    name='name'
                                                    id='name'
                                                    type='text'
                                                    error={meta.error && meta.touched}
                                                    helperText={meta.error && meta.touched ? meta.error : ''}
                                                    {...field}
                                                    className={clsx(classes.textField)}
                                                    fullWidth
                                                    variant='outlined'
                                                />
                                            )
                                        }
                                    }
                                </Field>
                                <Field name='email'>
                                    {
                                        ({ field, form, meta }) => {
                                            return (
                                                <TextField
                                                    label='email'
                                                    name='email'
                                                    id='email'
                                                    type='email'
                                                    error={meta.error && meta.touched}
                                                    helperText={meta.error && meta.touched ? meta.error : ''}
                                                    {...field}
                                                    className={clsx(classes.textField)}
                                                    fullWidth
                                                    variant='outlined'
                                                />
                                            )
                                        }
                                    }
                                </Field>
                                <Field name='password'>
                                    {
                                        ({ field, form, meta }) => (
                                            <TextField
                                                label='password'
                                                name='password'
                                                id='password'
                                                type='password'
                                                error={meta.error && meta.touched}
                                                helperText={meta.error && meta.touched ? meta.error : ''}
                                                {...field}
                                                className={clsx(classes.textField)}
                                                fullWidth
                                                variant='outlined'
                                            />
                                        )
                                    }
                                </Field>
                                <Field name='rememberMe'>
                                    {
                                        ({ field, form, meta }) => {
                                            return (
                                                <Grid container item xs={12} alignItems='center' justifyContent='flex-start'>
                                                    <Checkbox
                                                        name='rememberMe'
                                                        id='rememberMe'
                                                        color='primary'
                                                        checked={field.value}
                                                        {...field}
                                                        className={clsx(classes.textField)}
                                                    />
                                                    <Typography variant='h6'> Remember Me</Typography>
                                                </Grid>
                                            )
                                        }
                                    }
                                </Field>
                                <Grid container item xs={12} className={clsx(classes.actions)} justifyContent='space-evenly'>
                                    <Button
                                        variant='contained'
                                        className={clsx(classes.blackButton)}
                                        fullWidth
                                        type='submit'
                                        startIcon={formik.isSubmitting && <CircularProgress />}
                                        disabled={!formik.isValid || formik.isSubmitting}
                                    >
                                        Signup
                                    </Button>
                                </Grid>
                            </Grid>
                        )
                    }
                </Formik>
            </Grid>
            <Grid item xs={12} style={{ height: '40px' }} />
            <Grid container item xs={12} justifyContent='center'>
                <Grid container item xs={12} sm={6} md={4} alignItems='center' justifyContent='center'>
                    <Button color='primary' variant='contained' onClick={goToLoginForm} fullWidth>Already have an account ? Login</Button>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Signup;