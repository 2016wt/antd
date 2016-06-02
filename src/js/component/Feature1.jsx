// 纯数据展现情况列表
import React from 'react';

import { Table } from 'antd';

//https://github.com/ded/reqwest
import reqwest from 'reqwest';

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
    preData : function(data){
        return data.data.stream_data;
    },

    columns: [
        {
            title: 'DOCID',
            dataIndex: 'docid',
            key: 'docid'
        }, {
            title: '标题',
            dataIndex: 'title',
            key: 'title'
        }, {
            title: '链接',
            dataIndex: 'link',
            key: 'link',
            render: (text) => (
                <span>
                    <a href={text}>{text}</a>
                </span>)
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span>
                    <a href="#">操作</a>
                </span>
            )
        }
    ]

};

const Feature1 = React.createClass({
    getInitialState: function(){
        return {
            resultList: []
        }
    },

    render: function() {
        return  <div>
                    <Table dataSource={this.state.resultList} columns={conf.columns} />
                </div>
    },

    componentDidMount: function(){
        const self = this;
        reqwest({
            url: conf.url,
            data: conf.data,
            type: 'jsonp',
            jsonpCallback: 'fn',
            success: function (res) {
                var data = conf.preData(res);

                data.forEach(function(ele) {
                    ele.key = ele.docid;
                })

                self.setState({
                    resultList: data
                })
            }
        })
    },
});

export default Feature1;
