/**
 * [Config description]
 * @type {Object}
 *
 * header 管理后台头部配置
 *     title    String  标题
 *     icon     String   标题图标
 *     style    Object  自定义样式
 *
 * sider  管理后台侧栏配置
 *     menu     Array   sider列表
 *     openKeys Array   默认展开的sider区
 *     selectedKey  String  默认打开的功能区
 *     style    Object  自定义样式
 *
 * main  功能区域配置
 *     components   Object  配置sider对应功能区域组件
 *         Feature1     Object  对应sider menu 中的功能key对 应功能组件
 *             
 */

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
        selectedKey: "Feature1",
        style: {}
    },

    main: {
        components: {
            "Feature1": {
                title: '这是功能区域标题1',
                component: require('../component/Feature1')
            },   // 纯数据展示
            "Feature2": {
                title: '这是功能区域标题2',
                component: require('../component/Feature2')
            },   // 添加操作
            "Feature3": {
                title: '这是功能区域标题3',
                component: require('../component/Feature3')
            },
            "Feature4": {
                title: '这是功能区域标题4',
                component: require('../component/Feature2')
            },
            "Feature5": {
                title: '这是功能区域标题5',
                component: require('../component/Feature2')
            },
            "Feature6": {
                title: '这是功能区域标题6',
                component: require('../component/Feature2')
            },
            "Feature7": {
                title: '这是功能区域标题7',
                component: require('../component/Feature2')
            },
            "Feature8": {
                title: '这是功能区域标题8',
                component: require('../component/Feature2')
            }
        },
        style: {} 
    }
}

export default Config;