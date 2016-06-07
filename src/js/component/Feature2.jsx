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
            text: '链接文案', // 可选
            dataIndex: 'link',
            type: 'link'
        }, {
            title: '操作',
            type: 'operate',
            btns: ['链接文案1','链接文案2'], // 可选
            callbacks: [function(item, callback){
                
            },function(item, callback){

            }]
        }
    ]

};

const Feature2 = FeatureSetConfig(conf);

export default Feature2;
