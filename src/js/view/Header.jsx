import React from 'react';
import { Affix, Icon } from 'antd';

import config from '../common/config';

const Header = React.createClass({
    getDefaultProps: function(){
        return {
            title: config.header.title,
            icon: config.header.icon,
            style: config.header.style,

            name: config.userInfo.name,
            aver: config.userInfo.aver
        }
    },
    render: function() {
        return  <div style={this.props.style} className="cms_header">
                    <h2>
                        <Icon className="header-icon" type={this.props.icon} />
                        {this.props.title}
                    </h2>
                    <div className="cms_aver">
                        <img src={this.props.aver} alt=""/>
                        <span>{this.props.name}</span>
                    </div>
                </div>;
    }
});

export default Header;
