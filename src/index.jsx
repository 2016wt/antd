// 样式
import './css/style';

// js
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory, Link } from 'react-router';

import Header from './js/component/Header';
import Sider from './js/component/Sider';

import config from './js/common/config';

const App = React.createClass({
	getDefaultProps: function(){
        return {
            title: config.title
        }
    },
    getInitialState: function(){
        return {};
    },
    componentWillMount: function(){},
    render: function(){

		return  <div>
                    <Header title={this.props.title} />

                    <div className="main-wrapper">
                        <aside className="aside-container">
                            <Sider/>
                        </aside>
                        <section className="main-container">
                            {this.props.children}
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

const About = React.createClass({
    render: function(){
        return <p>111</p>
    }
});
const Users = React.createClass({
    render: function(){
        return <p>222</p>
    }
});
const User = React.createClass({
    render: function(){
        return <p>333</p>
    }
});
const NoMatch = React.createClass({
    render: function(){
        return <p>333</p>
    }
});

ReactDom.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <Route path="About" components={About} />
            <Route path="Users" components={Users} />
        </Route>
    </Router>
), document.getElementById('react-content'));
