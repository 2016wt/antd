// 含有可操作 table 栏的数据展示
import React from 'react';

import FeatureSetConfig from './FeatureSetConfig';

const conf = {
    url: 'http://uil.cbs.baidu.com/rssfeed/fetch?fn=?',
    data: {
        type: 'entry_list',
        num: 20,
        ua: 'bd_1_1_1_5-5-0-0_1',
        cuid: '00000000000000000000000000000000%7C0000000000000000',
        channel: 'AA_0',
        dir: 'up'
    },
    type: 'jsonp',

    preFormatData : function(data){
        let lists = data.data.stream_data;
        
        lists.forEach(function(ele) {
            ele.key = ele.docid;
        });
        return lists;
    },

    columns: [
        {
            title: 'DOCID',     // table header 文案
            dataIndex: 'docid', // 数据对象内的属性，也做react vdom 的key
            type: 'string'      // table 内显示的类型
        }, {
            title: '标题',
            dataIndex: 'title',
            type: 'string'
        }, {
            title: '链接',
            dataIndex: 'link',
            type: 'link'
        }, {
            title: '操作',
            type: 'operate',    // 操作的类型必须为 operate
            btns: ['功能文案1','功能文案2'], // 可选

            // 对应btns 的回调函数 
            // item为操作的单一数据对象  
            // callback 为组件的回调函数，将处理之后的数据回传 删除则传undefined
            callbacks: [function(item, callback){
                console.log('功能文案1');
                console.log(item);
                item.docid = 0;
                callback(item);
            },function(item, callback){
                console.log('功能文案2');
                console.log(item);
                callback(item);
            }]
        }
    ]

};

const Feature2 = FeatureSetConfig(conf);

export default Feature2;
