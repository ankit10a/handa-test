import React from 'react';
import { Router, Switch, Route ,Redirect} from 'react-router-dom';
import history from "./config/history";
import Navbar from './component/navbar';
import Login from './component/login';
import Signup from './component/signup';
import Home from './component/Home';
import Profile from './component/profile';

function App() {
  const PrivateRoute = ({ component: Component, handleChildFunc, ...rest }) => {
    const user = localStorage.getItem('token');
    return <Route {...rest} render={(props) => (
        user !== null
            ? <Component {...props} user={user} handleChildFunc={handleChildFunc}/>
            : <Redirect to='/login' />
        )} 
    />
}
  return (
    <React.Fragment>
      <Router history={history}>
        <Navbar/>
       <Switch>
          <Route exact path="/" render={()=><Home/>}/>
          <Route exact path="/login" render={()=><Login/>}/>
          <Route exact path="/signup" render={()=><Signup/>}/>
          <PrivateRoute exact={true} path="/profile" component={()=><Profile/>}/>
       </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
