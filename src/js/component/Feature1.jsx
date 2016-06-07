// 纯数据展现情况列表
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
            type: 'link'
        }
    ]

};

const Feature1 = FeatureSetConfig(conf);

export default Feature1;
