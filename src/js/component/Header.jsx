import React from 'react';
import { Affix, Icon } from 'antd';

import config from '../common/config';

const Header = React.createClass({
    getDefaultProps: function(){
        return {
            title: config.header.title,
            icon: config.header.icon,
            style: config.header.style,
        }
    },
    render: function() {
        return  <div style={this.props.style}>
                    <h2>
                        <Icon className="header-icon" type={this.props.icon} />
                        {this.props.title}
                    </h2>
                </div>;
    }
});

export default Header;
