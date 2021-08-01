import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Route, Switch } from 'react-router-dom';
import App from './app/app.component';
import Auth from './auth/auth.component';
import { auth, createUserProfileDocument } from '../firebaseUtil/firebase.util';

//importing actions
import { updateCurrentUser } from '../actions/actions';

const Component = () => {

  const dispatch = useDispatch();
  const email = useSelector(state => state?.currentUser?.email);
  const history = useHistory();

  useEffect(() => {
    if (!email) {
      history.push('/auth');
    }
  }, [email, history]);

  useEffect(() => {
    const unsubscribeFromAuth = auth.onAuthStateChanged(async (user) => {
      dispatch(updateCurrentUser(user));
      const userRef = await createUserProfileDocument(user);
      if (userRef) {
        userRef.onSnapshot(snapshot => {
          dispatch(updateCurrentUser({ uid: snapshot.id, ...snapshot.data() }));
        });
      }
    });
    return () => unsubscribeFromAuth();
  }, [dispatch]);

  return (
    <Switch>
      <Route path='/auth' component={Auth} />
      <Route path='/' component={App} />
    </Switch>
  );
}

export default Component;