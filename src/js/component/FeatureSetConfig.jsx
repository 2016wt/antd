// 纯数据展现情况列表
import React from 'react';

import { Table } from 'antd';

//https://github.com/ded/reqwest
import reqwest from 'reqwest';

// 预处理配置显示中的 colums 数据 用于anted的table配置
const createColumns = (lists) => {
    let columns = [];
    
    const renderFunc = {
        link: (text) => (
                <span>
                    <a href={text}>{text}</a>
                </span>),

        image: (url) => (
                <span>
                    <img src={url} />
                </span>)
    }

    lists.forEach((item) => {
        let column = {
            title: item.title,
            dataIndex: item.dataIndex,
            key: item.dataIndex
        }

        if(renderFunc[item.type]){
            column.render = renderFunc[item.type];
        }
        
        columns.push(column);
        
    });

    return columns;
};

// 依赖 config 主题生成react 组件函数
const FeatureSet = (config) => {

    let columns = createColumns(config.columns);
    
    const Feature = React.createClass({
        getInitialState: function(){
            return {
                resultList: []
            }
        },

        render: function() {
            return  <div>
                        <Table dataSource={this.state.resultList} columns={columns} />
                    </div>
        },

        componentDidMount: function(){
            const self = this;
            reqwest({
                url: config.url,
                data: config.data,
                type: 'jsonp',
                jsonpCallback: 'fn',
                success: function (res) {
                    var data = config.preFormatData(res);

                    self.setState({
                        resultList: data
                    })
                }
            })
        },
    });

    return Feature;
}

    

export default FeatureSet;
