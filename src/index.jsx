// 样式
import './css/style';

// js
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory, Link } from 'react-router';

import Header from './js/component/Header';
import Sider from './js/component/Sider';

import config from './js/common/config';

const components = config.main.components;
const App = React.createClass({
	getDefaultProps: function(){
    },
    getInitialState: function(){
        return {
            selectedKey: config.sider.selectedKey
        }
    },
    componentWillMount: function(){},

    siderChangeKey: function(value){
        this.setState({selectedKey: value});
    },
    render: function(){
        const Main = config.main.components[this.state.selectedKey];

		return  <div>
                    <Header />

                    <div className="main-wrapper">
                        <aside className="aside-container">
                            <Sider change={this.siderChangeKey}/>
                        </aside>
                        <section className="main-container">
                            <Main />
                        </section>
                    </div>
                </div>
	},

    componentDidMount: function(){},
    componentWillReceiveProps: function(newProps){},
    shouldComponentUpdate: function(){
        return true;
    },
    componentWillUpdate: function(){},
    componentDidUpdate: function(){},
    componentWillUnmount: function(){}
});

ReactDom.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
    </Router>
), document.getElementById('react-content'));
