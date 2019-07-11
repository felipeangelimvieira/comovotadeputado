import React, { Component } from 'react';
import Landing from '../components/Landing';
import ComoVota from '../components/ComoVota';

class Home extends Component {

    
    render() { 
      
     return (
     <div> 
      <main>
          <Landing />
          <ComoVota />
      </main>
      </div>)
}
}

export default Home;



/*
<div style={{width : '100%',
                    padding: 0,
                    left: 0,
                    right: 0,
                    marginTop: '',
                    display: 'inline',
                    textAlign: 'center',
                    border: 'none'}}>
</div>
*/