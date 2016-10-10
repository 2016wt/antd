import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router'

import config from '../common/config';

const Sider = React.createClass({
    getDefaultProps: function(){
        return {
            menuList: config.sider.menu,
            menuStyle: config.sider.style,
            openKeys: config.sider.openKeys
        }
    },
    getInitialState: function(){
        return {};
    },
    render: function() {

        return  <Menu onClick={this.handleClick}
                    style={this.props.menuStyle}
                    defaultOpenKeys={this.props.openKeys}
                    selectedKeys={[this.props.selectedKey]}
                    mode="inline">

                    {this.dealMenuList(this.props.menuList)}

                </Menu>;
    },

    dealMenuList: function(list){
        const self = this;
        return list.map(function(item){
            if(item.items && item.items.length){
                let icon = item.icon ? (<Icon type={item.icon} />): '';
                return <Menu.SubMenu key={item.key} title={<span>{icon}<span>{item.title}</span></span>}>
                    {
                        self.dealMenuList(item.items)
                    }
                </Menu.SubMenu>
            }else{
                return <Menu.Item key={item.key}>
                            <Link to={'/'+item.key}>{item.title}</Link>
                        </Menu.Item>
            }
        });
    }
});

export default Sider;
