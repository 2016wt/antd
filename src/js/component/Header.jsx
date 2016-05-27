import React from 'react';
import { Affix, Icon } from 'antd';

const style = {
    padding: "15px 15px 15px 35px",
    borderBottom: "1px solid #D2D2D2",
    backgroundColor: "#F5F5F5"
}


const Header = React.createClass({

    render: function() {
        return  <Affix style={style}>
                    <h2><Icon className="header-icon" type="laptop" />{this.props.title}</h2>
                </Affix>;
    }
});

export default Header;
