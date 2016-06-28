// 样式
import './css/style';

// js
import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, hashHistory, Link, IndexRoute } from 'react-router';

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
		return  <div>
                    <Header />

                    <div className="main-wrapper">
                        <aside className="aside-container">
                            <Sider change={this.siderChangeKey}/>
                        </aside>
                        <section className="main-container">
                            {this.props.children}
                        </section>
                    </div>
                </div>
	},

    componentDidMount: function(){
        //this.setState({selectedKey: this.props.params.FeatureId});
        //console.log(this.props.params.FeatureId)
    },
    componentWillReceiveProps: function(newProps){},
    shouldComponentUpdate: function(){
        return true;
    },
    componentWillUpdate: function(){},
    componentDidUpdate: function(){},
    componentWillUnmount: function(){}
});
const Main = React.createClass({
    render: function(){
        const id = this.props.params.FeatureId;
        const Data = config.main.components[id] || config.main.components[config.sider.selectedKey];
        const Feature = Data.component;
        const title = Data.title;

        return  <Feature key={id} title={title}/>
    }
});

ReactDom.render((
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Main} />
            <Route path="/:FeatureId" component={Main} />
        </Route>
    </Router>
), document.getElementById('react-content'));
