import React from 'react';
import { Menu, Icon } from 'antd';

const menuStyle={
}

const menuObj = [
    {
        title: "新闻转码工具",
        key: "sub1",
        icon: "setting",
        items: [
            {title: "新闻卡片转码工具", key: "1"},
            {title: "热词转码工具", key: "2"},
            {title: "Tiny平台转码", key: "3"}
        ]
    },
    {
        title: "新闻下线工具",
        key: "sub2",
        icon: "delete",
        items: [
            {title: "新闻&时阿下线工具", key: "4"},
            {title: "段子下线工具", key: "5"}
        ]
    }
];

const Sider = React.createClass({
    getInitialState() {
        return {
            currentMenu: ['sub1','sub2'],
            currentItem: '1'
        };
    },
    handleClick(e) {
        this.setState({
            currentItem: e.key
        });
        this.props.change(e.key);
    },
    render() {

        const menuComp = menuObj.map(function(item){
            return <Menu.SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.title}</span></span>}>
                        {
                            item.items.map(function(item){
                                return <Menu.Item key={item.key}>{item.title}</Menu.Item>
                            })
                        }
                    </Menu.SubMenu>
        });

        return  <Menu onClick={this.handleClick}
                    style={menuStyle}
                    defaultOpenKeys={this.state.currentMenu}
                    selectedKeys={[this.state.currentItem]}
                    mode="inline">
                    {menuComp}
                </Menu>;
    }
});

export default Sider;
