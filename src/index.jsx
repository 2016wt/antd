// 样式
import './css/style';

// js
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router';

import Header from './js/view/Header';
import Sider from './js/view/Sider';
import Main from './js/view/Main';

import config from './js/common/config';

const components = config.main.components;
const App = React.createClass({
	getDefaultProps: function(){
    },
    getInitialState: function(){
        return {
            featureId: this.props.params.FeatureId || config.sider.selectedKey,
            params:  this.props.params.params,
        }
    },
    componentWillMount: function(){},

    render: function(){
		return  <div>
                    <Header />

                    <div className="main-wrapper">
                        <aside className="aside-container">
                            <Sider selectedKey={this.state.featureId} />
                        </aside>
                        <section className="main-container">
                            <Main featureId={this.state.featureId} params={this.state.params} />
                        </section>
                    </div>
                </div>
	},

    componentDidMount: function(){
    },
    componentWillReceiveProps: function(newProps){
        this.setState({
            featureId: newProps.params.FeatureId,
            params:  newProps.params.params,
        });
    },
    shouldComponentUpdate: function(){
        return true;
    },
    componentWillUpdate: function(){},
    componentDidUpdate: function(){},
    componentWillUnmount: function(){}
});

// 除功能页面id 再添加可传递性数据参数（单一值）
ReactDom.render((
    <Router history={hashHistory}>
        <Route path="/" component={App} />
        <Route path="/:FeatureId(/:params)" component={App} />
    </Router>
), document.getElementById('react-content'));
