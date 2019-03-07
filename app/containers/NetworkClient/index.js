/**
 *
 * NetworkClient
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import IronmanJS from 'ironmanjs-core';
import IronmanEOS from 'ironmanjs-plugin-eosjs';
import { setSigner, loadNetworks, loadAccount } from './actions';
import saga from './sagas/watchers';



// we inject out reducer at the root level for lazy loading order reasons

export class NetworkClient extends React.Component {
  // eslint-disable-line react/prefer-stateless-function

  componentDidMount() {
    // start loading the reader asap
    this.props.loadNetworks();

    IronmanJS.plugins( new IronmanEOS() );
    IronmanJS.ironman.connect('EOSToolkit').then(connected => {
      if(connected){
          this.props.setSigner(IronmanJS.ironman);
          window.IronmanJS = null;
      }
    });

    //this.interval = setInterval(() => this.props.loadAccount(), 10000);
  }

  // componentWillUnmount() {
  //   clearInterval(this.interval);
  // }

  render() {
    return '';
  }
}

const mapStateToProps = createStructuredSelector({});

function mapDispatchToProps(dispatch) {
  return {
    loadNetworks: () => dispatch(loadNetworks()),
    loadAccount: () => dispatch(loadAccount()),
    setSigner: signer => dispatch(setSigner(signer)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withSaga = injectSaga({ key: 'NetworkClient', saga });

export default compose(
  withSaga,
  withConnect
)(NetworkClient);
