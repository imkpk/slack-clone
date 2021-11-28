import React from 'react';
import { Loader } from 'semantic-ui-react';

function Spinner() {
  return (
    <Loader size="huge" content={ 'preparing Chat....' }/>
  );
};
export default Spinner;