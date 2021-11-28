import React from 'react';
import '../Components/App.css';
import { Grid } from 'semantic-ui-react';
import { ColorPanel, Messages, MetaPanel, SidePanel } from './index';

function App() {
  return (
    <Grid columns="equal" className="app" style={ { background: '#eee' } }>
      <ColorPanel/>
      <SidePanel/>
      <Grid.Column style={ { marginLeft: 320 } }>
        <Messages/>
      </Grid.Column>
      <Grid.Column width={ 4 }>
        <MetaPanel/>
      </Grid.Column>

    </Grid>
  );
}

export default App;
