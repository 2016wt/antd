// 纯数据展现情况列表
import React from 'react';

import { Table, Form, Select, Input, Row, Col, Button, DatePicker } from 'antd';

import Immutable from 'immutable';
//https://github.com/ded/reqwest
import Reqwest from 'reqwest';

const FormItem = Form.Item;

// columns 类型对应的通用痛render
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

// 依赖 config 主题生成react 组件函数
const FeatureSet = (config) => {
    
    //let columnsData = dealConfigColumns(config.columns);
    
    const Feature = React.createClass({
        getInitialState: function(){
            return {
                columns: [],
                resultList: [],
                loading: false
            }
        },
        
        componentWillMount: function(){

            this.setState({
                loading: true,
                columns: this.dealConfigColumns(config.columns)
            });
        },

        render: function() {
            const searchForm =  <div className="f-search">
                                    <Form inline>
                                        <FormItem
                                            label="账户户账户">
                                            <Input placeholder="请输入账户名" />    
                                        </FormItem>
                                        <FormItem
                                            label="账户">
                                            <Input placeholder="请输入账户名" />    
                                        </FormItem>                              
                                        <FormItem
                                            label="账户">
                                            <Input placeholder="请输入账户名" />    
                                        </FormItem>                       
                                        <FormItem
                                            label="账户">
                                            <Input placeholder="请输入账户名" />    
                                        </FormItem>
                                        <FormItem
                                            label="账户">
                                            <Input placeholder="请输入账户名" />    
                                        </FormItem>
                                        
                                    </Form>
                                </div>
            return  <div>
                        <h3 className="f-title">{this.props.title}</h3>
                        {searchForm}
                        <Table dataSource={this.state.resultList} columns={this.state.columns} loading={this.state.loading} bordered/>
                    </div>
        },
        
        // 预处理配置显示中的 colums 数据 用于anted的table配置
        dealConfigColumns: function(lists){
            const self = this;

            let columns = [];

            lists.forEach((item) => {
                let column = {
                    title: item.title,
                    dataIndex: item.dataIndex,
                    key: item.dataIndex
                }
                
                if( item.type === 'operate' ){
                    // 兼容单一形式与数组形式
                    let btns = Array.isArray(item.btns)?item.btns:[item.btns];
                    
                    // 处理表单 操作 栏目以及回调函数
                    column.render = item.render || function(txt, record){
                        return <span>
                                {
                                    btns.map(function(btn,i) {
                                        return  (
                                            <span key={i}>
                                                <a href="javascript:void 0;" onClick={self.operateCallbacks.bind(self, record, btn)}>{btn.text}</a>
                                                {i!==btns.length-1?<span className="ant-divider"></span>:''}
                                            </span>
                                        );
                                            
                                    })
                                }
                                </span>
                    };
                }else{
                    column.render = item.render || renderFunc[item.type] || ((text) => (<span>{text}</span>));
                }

                if(item.sort){
                    column.sorter = item.sorter || ((a, b) => a[item.dataIndex] - b[item.dataIndex]);
                }
                columns.push(column);
                
            });
            
            return columns;
            
        },

        operateCallbacks: function(item, btn){
            const self = this;

            if(btn.type){

                this.setState({
                    loading: true
                });

                let resultList;
                let type = btn.type;
                let itemI = Immutable.fromJS(item);
                let result = Immutable.fromJS(self.state.resultList);
                
                if(type === 'create'){
                    // resultList = result.map(function(v, i){
                    //     if(v.get('key') === itemI.get('key')){
                    //         return itemI;
                    //     }else{
                    //         return v;
                    //     }
                    // });
                }else if(type === 'retrieve'){
                    config.Retrieve({}, function(list){
                        self.setState({
                            resultList: list
                        });
                    });
                }else if(type === 'update'){
                    
                }else if(type === 'delete'){
                    config.Delete(itemI.toJS(), function(list){
                        resultList = result.filter(function(v, i){
                            if(v.get('key') !== itemI.get('key')){
                                return true;
                            }
                        });
                        self.setState({
                            loading: false,
                            resultList: resultList.toJS()
                        });
                    });
                }

                // if(type === 'update'){
                //     resultList = result.map(function(v, i){
                //         if(v.get('key') === itemI.get('key')){
                //             return itemI;
                //         }else{
                //             return v;
                //         }
                //     });
                // }else if(type === 'delete'){
                //     resultList = result.filter(function(v, i){
                //         if(v.get('key') !== itemI.get('key')){
                //             return true;
                //         }
                //     });
                // }
            }else if(btn.callback){
                btn.callback(item);
            }
        },

        componentDidMount: function(){
            const self = this;
            
            config.initData(function(list){
                self.setState({
                    loading: false,
                    resultList: list
                });
            });

            
        },
    });

    return Feature;
}

    

export default FeatureSet;
