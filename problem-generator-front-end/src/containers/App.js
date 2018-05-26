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

    constructor(props) {
        super(props);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        this.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions(){
        this.props.onUpdateWindowSize({width: window.innerWidth, height: window.innerHeight});
    }

    mobileUpdater = (menuId) => {
        this.props.onChangeSelected(menuId);
        if(this.props.windowSize.width <= 600){
            this.props.onChangeMenu();
        }
    };



  render() {
      var fadeInStyling = animation;

      if(this.props.windowSize.width >= 600){
          if(this.props.menu === 'slide-in'){
              fadeInStyling = animation.fadeIn;
          }else if(this.props.menu === 'slide-out'){
              fadeInStyling = animation.fadeOut;
          }
      }
    return (
      <div className={classes}>
        <NavMenu show={this.props.menu} topicsList={this.props.topicsList} click={this.mobileUpdater}/>
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
        topicsList: state.topicsList,
        windowSize: state.windowSize
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onChangeMenu: () => dispatch({type: actionTypes.CHANGE_MENU}),
        onChangeSelected: (selection) => dispatch({type: actionTypes.SELECT_TOPIC, newSelection: selection}),
        onUpdateWindowSize: (newWindowSize) => dispatch({type: actionTypes.UPDATE_WINDOW_SIZE, windowSize: newWindowSize})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);