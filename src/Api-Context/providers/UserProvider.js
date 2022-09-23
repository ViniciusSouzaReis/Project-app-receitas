import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../contexts/UserContext';

function UserProvider({ children }) {
  const [email, setEmail] = useState({
    email: 'aaa',
  });

  const contextValues = useMemo(() => ({
    email,
    setEmail,
  }), [email]);

  return (
    <UserContext.Provider value={ contextValues }>
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
