import React from 'react';
import { AuthenticationContext } from '../contexts';
import { Redirect } from "react-router-dom";

function Dashboard () {
  return (
    <AuthenticationContext.Consumer>
      {({ authenticated }) => {
        if (authenticated) {
          return <div>this is dashboard</div>
        }
        return (
          <Redirect
            to='/'
          />
        )
      }}
    </AuthenticationContext.Consumer>
  );
}


export default Dashboard;
