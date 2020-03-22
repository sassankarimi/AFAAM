import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch, HashRouter } from "react-router-dom";
import routes from "../Routes";
import { getProfileInfo } from '../redux/profile/actions/profile.action';
import { connect } from 'react-redux';

class DefaultLayout extends Component {
  constructor(props) {
    super(props);
    // props.getProfile();
    this.state = {
      accept_tos: props.accept_tos
    }
  }

  shouldComponentUpdate(nextProps,nextState){
    if(nextProps.accept_tos !== this.props.accept_tos){
      return true;
    }else{
      return false;
    }
  }

  componentDidUpdate() {
    this.setState({ accept_tos: this.props.accept_tos });
  }

  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  signOut(e) {
    e.preventDefault();
    this.props.history.push("/login");
  }

  render() {
    const token = localStorage.getItem('Token');
    return (
      <HashRouter>
        <Suspense fallback={this.loading()}>
          <Switch>
            {routes.map((route, idx) => {
              return route.component ? (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={props => {
                    if (token === undefined ||
                      token === '' ||
                      token === null ||
                      token === 'undefined'
                    ) {
                      return <Redirect to='/login' />;
                    } else {
                      return <route.component {...props} />
                    }
                  }
                  }
                />
              ) : null;
            })}
            <Redirect from="/" to="/login" />
          </Switch>
        </Suspense>
      </HashRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  accept_tos: state.profile.profileData.accept_tos
});

const mapDispatchToProps = (dispatch) => ({
  getProfile: () => {
    dispatch(getProfileInfo());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
