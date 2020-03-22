import React from 'react';
const Profile = React.lazy(() => import('./components/profile/Profile'));
const Welcome = React.lazy(() => import('./components/welcome/Welcome'));
const Request = React.lazy(() => import('./components/request/Request'));
const UserLoans = React.lazy(() => import('./components/loans/UserLoans'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/account', exact: true, name: 'Account', component: Profile },
  { path: '/welcome', name: 'Welcome', component: Welcome },
  { path: '/Request', name: 'Reqeust', component: Request },
  { path: '/loans', name: 'Loans', component: UserLoans },
];

export default routes;
