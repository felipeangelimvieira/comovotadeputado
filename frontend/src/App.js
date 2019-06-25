import React, {Component} from 'react';

import Toolbar from './components/NavBar/Toolbar/Toolbar';
import SideDrawer from './components/NavBar/SideDrawer/SideDrawer';
import Backdrop from './components/NavBar/Backdrop/Backdrop';
import NavBar from './components/NavBar/NavBar';

class App extends Component {
  render() {
  return (
    <div style={{height: '100%'}}>
      <NavBar />
      <main style={{marginTop: '64px'}}>
      <p>This is the page content</p>
      </main>
    </div>
  );
}
}

export default App;
