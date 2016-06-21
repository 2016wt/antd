# antd example

学习和使用 antd
用其快速搭建后台系统

开发 npm run dev
打开浏览器 http://localhost:8989/

构建 npm run build
所使用的字体有跨域问题 在部署上线的时候需要注意下载字体

## 自动快读配置化搭建 配置文件详解

    {
        // 初始化展现的数据，使用callback 回传列表数据
        // 需要手动添加唯一id key
        // callback 组件数据的回调函数(接受列表数据参数)
        initData: function(callback){
            // 请求数据
            Reqwest({
                url: 'XXXX',
                type: 'jsonp',
                jsonpCallback: 'fn',
                success: function (data) {
                    // 获取数组数据
                    let lists = data.array;
                
                    // 必须要向数据中 添加唯一的 key
                    lists.forEach(function(ele) {
                        ele.key = ele.id;
                    });

                    // 回传数据
                    callback(lists);
                }
            });
               
        },
        
        // 功能模块需要时 添加 CRUD 4方法
        Create: function(data, callback){
            let dataI = Immutable.fromJS({
                type: 'entry_list'
            }).merge({id: data.key});
            
            // ... 操作删除请求
            console.log(dataI.toJS());
            
            // 模拟请求删除成功的回调
            setTimeout(function(){
                callback();
            }, 1000)
        },
        Delete: function(data, callback){        
            let dataI = Immutable.fromJS({
                type: 'entry_list'
            }).merge({id: data.key});
            
            // ... 操作删除请求
            console.log(dataI.toJS());
            
            // 模拟请求删除成功的回调
            setTimeout(function(){
                callback();
            }, 1000)
               
        },
        Update:function(data, callback){
            console.log(data);
        },
        Retrieve: function(data, callback){
            Reqwest({
                url: XXXXX,
                type: 'jsonp',
                success: function (data) {
                    // 获取数组数据
                    let lists = data.array;
                
                    // 必须要向数据中 添加唯一的 key
                    lists.forEach(function(ele) {
                        ele.key = ele.id;
                    });

                    // 回传数据
                    callback(lists);
                }
            });
        },

        // 更新项目所需的字段
        UType:[
            {
                name: 'docid',
                label: '唯一标识',
                type: 'string',
                placeholder: '请输入标示名称'
            },{
                name: 'title',
                label: '标题',
                type: 'string',
                placeholder: '请输入标示名称'
            },{
                name: 'link',
                label: '链接',
                type: 'string'
            },{
                name: 'date',
                label: '日期',
                type: 'date'
            },{
                name: 'img',
                label: '图片',
                type: 'imageUpload'
            }

        ],


        // table 列表展现配置
        // {
        //      title       table显示表题
        //      dataIndex   显示数据中的key
        //      type        展现形式 （string image link）
        //      render      自定义展现形式 参数 （当前数据，当前对象数据）
        //      sort        是否需要排序功能
        //      width       自定义该列宽度 否则等分
        // }
        // 
        columns: [
            {
                title: 'DOCID',     // table header 文案
                dataIndex: 'docid', // 数据对象内的属性，也做react vdom 的key
                type: 'string',     // table 内显示的类型
                sort: true,         // 是否需要排序
                width:200
            }, {
                title: '标题',
                dataIndex: 'title',
                type: 'string'
            }, {
                title: '链接',
                dataIndex: 'link',
                type: 'link',
                render: (text) => ( <span>
                                        <a href={text}>链接</a>
                                    </span>),
                width: 50
            },{
                title: '日期',
                dataIndex: 'date',
                type: 'string',
                width: 150
            },{
                title: '图片',
                dataIndex: 'img',
                type: 'image'
            },{
                title: '操作',
                type: 'operate',    // 操作的类型必须为 operate
                width: 120,
                btns: [{
                    text: '更新',
                    type: 'update'
                },{
                    text: '删除',
                    type: 'delete'
                }, {
                    text: '展示',
                    callback: function(item){
                        console.log(item)
                    }
                }] // 可选
            }
        ],

        uploadfile: '/umis/pushc/uploadfile'

    };


## 文档

http://ant.design/docs/react/introduce