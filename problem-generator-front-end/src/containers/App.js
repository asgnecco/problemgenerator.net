import React, { Component } from 'react';
import classes from './App.scss';
import Heading from '../components/heading/heading.js';
import '../global/fonts.scss';
import NavMenu from '../components/nav/navMenu.js';
import animation from './margin-animation.scss';
import ProblemArea from '../components/problemArea/problemArea.js';
import {connect} from 'react-redux';
import * as actionTypes from '../store/actions.js';

class App extends Component {
  render() {
      var fadeInStyling = animation;

      if(this.props.menu === 'slide-in'){
          fadeInStyling = animation.fadeIn;
      }else{
          fadeInStyling = animation.fadeOut;
      }

    return (
      <div className={classes}>
        <NavMenu show={this.props.menu} topicsList={this.props.topicsList} click={this.props.onChangeSelected}/>
        <main className={fadeInStyling}>
            <Heading title="ProblemGenerator.net" pageTitle={this.props.selectedTopic} click={this.props.onChangeMenu}/>
            <ProblemArea/>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => {
    return {
        menu: state.menu,
        selectedTopic: state.selectedTopic,
        topicsList: state.topicsList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeMenu: () => dispatch({type: actionTypes.CHANGE_MENU}),
        onChangeSelected: (selection) => dispatch({type: actionTypes.SELECT_TOPIC, newSelection: selection})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);