/**
 * [Config description]
 * @type {Object}
 *
 * header 管理后台头部配置
 *
 * sider  管理后台侧栏配置
 * 
 */

import CardsTranslate from '../component/CardsTranslate';

const Config = {
    header: {
        title: "测试配置管理后台",
        icon: "appstore",
        style: {
            padding: "15px 15px 15px 25px",
            borderBottom: "1px solid #E9E9E9",
            backgroundColor: "#F5F5F5"
        }
    },

    sider: {
        menu: [
            {
                title: "导航1",
                key: "subTitle1",
                icon: "setting",
                items: [
                    {title: "选项1", key: "Feature1"},
                    {title: "选项2", key: "Feature2"},
                    {title: "选项3", key: "Feature3"},
                    {   
                        title: "导航3",
                        key: "subTitle3",
                        icon: "",
                        items: [
                            {title: "选项6", key: "Feature6"},
                            {title: "选项7", key: "Feature7"},
                            {title: "选项8", key: "Feature8"}
                        ]
                    }
                ]
            },{
                title: "导航2",
                key: "subTitle2",
                icon: "delete",
                items: [
                    {title: "选项4", key: "Feature4"}
                ]
            },
            {
                title: "选项5",
                key: "Feature5"
            }
        ],
        openKeys:["subTitle1", "subTitle2"],
        selectedKey: "Feature4",
        style: {}
    },

    main: {
        components: {
            "Feature1" : require('../component/CardsTranslate'),
            "Feature4" : require('../component/CardsTranslate')
        },
        style: {} 
    }
}

export default Config;