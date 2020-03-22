import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { StickyContainer } from 'react-sticky';

const Login = React.lazy(() => import('./components/login/Login'));
const DefaultLayout = React.lazy(() => import('./components/DefaultLayout'));

function App() {
  const loading = () => <div className="animated fadeIn pt-1 text-center">Loading...</div>
  const token = localStorage.getItem('Token');
  return (
    <HashRouter>
      <React.Suspense fallback={loading()}>
        <StickyContainer style={{height:'100%'}}>
          <Switch>
            <Route exact path="/login" name="login Page" render={props => {
              if (token === undefined || token === '' || token == null || token === 'undefined') {
                return <Login {...props} />;
              } else {
                return <Redirect to='/account' />;
              }
            }} />
            {/* <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
            <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} /> */}
            <Route path="/" name="Home" render={props => <DefaultLayout {...props} />} />
          </Switch>
        </StickyContainer>
      </React.Suspense>
    </HashRouter>
  );
}

export default App;
