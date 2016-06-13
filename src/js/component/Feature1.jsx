// 纯数据展现情况列表
import React from 'react';

import FeatureSetConfig from './FeatureSetConfig';

import Immutable from 'immutable';
//https://github.com/ded/reqwest
import Reqwest from 'reqwest';

// 增加(Create)、重新取得数据(Retrieve)、更新(Update)和删除(Delete)
const conf = {
    
    // CRUD 接口配置 
    // data 传入接口的参数  
    // callback 组件数据的回调函数(接受列表数据参数)
    initData: function(callback){

        let data = {
            type: 'entry_list',
            num: 20,
            ua: 'bd_1_1_1_5-5-0-0_1',
            cuid: '00000000000000000000000000000000%7C0000000000000000',
            channel: 'AA_0',
            dir: 'up'
        }

        Reqwest({
            url: 'http://uil.cbs.baidu.com/rssfeed/fetch?fn=?',
            data: data,
            type: 'jsonp',
            jsonpCallback: 'fn',
            success: function (data) {
                let lists = data.data.stream_data;
                
                // 必须要向数据中 添加唯一的 key
                lists.forEach(function(ele) {
                    ele.key = ele.docid;
                });

                callback(lists);
            }
        });
           
    },
        

    columns: [
        {
            title: 'DOCID',
            dataIndex: 'docid',
            type: 'string'
        }, {
            title: '标题',
            dataIndex: 'title',
            type: 'string'
        }, {
            title: '链接',
            dataIndex: 'link',
            type: 'link',
            render: (text, item) => (<span><a href={text}>{item.title}</a></span>)   // 可自定义
        }
    ]

};

const Feature1 = FeatureSetConfig(conf);

export default Feature1;
