import React, { Component } from 'react';
import classes from './App.scss';
import Heading from '../components/heading/heading.js';
import '../global/fonts.scss';
import NavMenu from '../components/nav/navMenu.js';

class App extends Component {


    state = {
        menu: false
    };

    changeState = () => {
        this.setState({
            menu: !this.state.menu
        });
        console.log(this.state.menu);
    };

  render() {
      var menuStyle = {
          'margin-left': '0%'
      };

      if(this.state.menu){
          menuStyle["margin-left"] = '20%';
      }

    return (
      <div className={classes}>
        <NavMenu show={this.state.menu}/>
        <main style={menuStyle}>
            <Heading title="ProblemGenerator.net" pageTitle="Antiderivatives" click={this.changeState}/>
        </main>
      </div>
    );
  }
}

export default App;