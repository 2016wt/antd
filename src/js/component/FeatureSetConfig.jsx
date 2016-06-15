// 纯数据展现情况列表
import React from 'react';

import { Table, Form, Select, Input, Row, Col, Button } from 'antd';
import { DatePicker, TimePicker, Radio, Switch} from 'antd';
import { Modal } from 'antd';

import Immutable from 'immutable';
//https://github.com/ded/reqwest
import Reqwest from 'reqwest';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

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
    //
    
    let RForm = React.createClass({
        render: function() {
            const self = this;
            const RType = this.props.RType;
            return RType ?
                    (<div className="f-search">
                        <Form inline onSubmit={self.handleRetrieve}>
                            { 
                                RType.map(function(item){
                                    return self.dealConfigRType(item);
                                })
                            }
                            <FormItem key="search-btn">
                                <Button type="primary" htmlType="submit">查询</Button>
                            </FormItem>
                        </Form>
                    </div>):
                    <div></div>;
        },

        dealConfigRType: function(item){
            const { getFieldProps } = this.props.form;

            switch (item.type){
                case 'string':
                    return <FormItem
                                label={item.label}
                                key={item.name}>
                                <Input placeholder={item.placeholder||''}
                                {...getFieldProps(item.name)} />    
                            </FormItem>
                    break;

                case 'date':
                    return <FormItem
                                label={item.label}
                                key={item.name}>
                                <DatePicker {...getFieldProps(item.name)} />  
                            </FormItem>
                    break;

                case 'time':
                    return <FormItem
                                label={item.label}
                                key={item.name}>
                                <TimePicker {...getFieldProps(item.name)} />  
                            </FormItem>
                    break;

                case 'select':
                    return <FormItem
                                label={item.label}
                                key={item.name}>
                                <Select  {...getFieldProps(item.name, { initialValue: item.defaultValue||item.options[0].value })} >
                                    {
                                        item.options.map(function(item){
                                            return <Option key={item.value} value={item.value}>{item.text}</Option>
                                        })
                                    }
                                </Select>
                            </FormItem>
                    break;

                case 'radio':
                    return <FormItem
                                label={item.label}
                                key={item.name}>
                                <RadioGroup {...getFieldProps(item.name, { initialValue: item.defaultValue||item.options[0].value })}>
                                    {
                                        item.options.map(function(item){
                                            return <Radio key={item.value} value={item.value}>{item.text}</Radio>
                                        })
                                    }
                                </RadioGroup>
                            </FormItem>
                    break;

                case 'switch':
                    return <FormItem
                                label={item.label}
                                key={item.name}>
                                <Switch {...getFieldProps(item.name, { initialValue: item.defaultValue|| false })} />
                            </FormItem>
                    break;

                default:
                    return '';
                    break;
            }
        },

        handleRetrieve: function(e){
            e.preventDefault();

            console.log('收到表单值：', this.props.form.getFieldsValue());

            this.props.submit(this.props.form.getFieldsValue());

        }
    });
    RForm = Form.create()(RForm);

    let CForm = React.createClass({
        getInitialState: function() {
            return { visible: false };
        },

        render: function() {
            const self = this;
            const CType = this.props.CType;

            return  CType ?
                    <div className="f-create">
                        <Button type="primary" onClick={this.showModal}>添加</Button>
                        <Modal title="添加新对象" visible={this.state.visible} onOk={this.handleSubmit} onCancel={this.hideModal}>
                            <Form horizontal form={this.props.form}>
                                { 
                                    CType.map(function(item){
                                        return self.dealConfigCType(item);
                                    })
                                }
                            </Form>
                        </Modal>
                    </div>:
                    <div></div>
        },

        dealConfigCType: function(item){
            const { getFieldProps } = this.props.form;

            const formItemLayout = {
                labelCol: { span: 6 },
                wrapperCol: { span: 18 },
            };

            switch (item.type){
                case 'string':
                    return <FormItem
                                label={item.label}
                                key={item.name}
                                {...formItemLayout}>
                                <Input placeholder={item.placeholder||''}
                                {...getFieldProps(item.name)} />    
                            </FormItem>
                    break;

                case 'date':
                    return <FormItem
                                label={item.label}
                                key={item.name}
                                {...formItemLayout}>
                                <DatePicker {...getFieldProps(item.name)} />  
                            </FormItem>
                    break;

                case 'time':
                    return <FormItem
                                label={item.label}
                                key={item.name}
                                {...formItemLayout}>
                                <TimePicker {...getFieldProps(item.name)} />  
                            </FormItem>
                    break;

                case 'select':
                    return <FormItem
                                label={item.label}
                                key={item.name}
                                {...formItemLayout}>
                                <Select  {...getFieldProps(item.name, { initialValue: item.defaultValue||item.options[0].value })} >
                                    {
                                        item.options.map(function(item){
                                            return <Option key={item.value} value={item.value}>{item.text}</Option>
                                        })
                                    }
                                </Select>
                            </FormItem>
                    break;

                case 'radio':
                    return <FormItem
                                label={item.label}
                                key={item.name}
                                {...formItemLayout}>
                                <RadioGroup {...getFieldProps(item.name, { initialValue: item.defaultValue||item.options[0].value })}>
                                    {
                                        item.options.map(function(item){
                                            return <Radio key={item.value} value={item.value}>{item.text}</Radio>
                                        })
                                    }
                                </RadioGroup>
                            </FormItem>
                    break;

                case 'switch':
                    return <FormItem
                                label={item.label}
                                key={item.name}
                                {...formItemLayout}>
                                <Switch {...getFieldProps(item.name, { initialValue: item.defaultValue|| false })} />
                            </FormItem>
                    break;

                default:
                    return '';
                    break;
            }
        },

        showModal: function() {
            this.setState({ visible: true });
        },

        hideModal: function() {
            this.setState({ visible: false });
        }
    });

    CForm = Form.create()(CForm);

    let UForm = React.createClass({
        render: function() {
            return <div></div>
        }
    });
    
    let Feature = React.createClass({
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
            const self = this;
            
            return  <div>
                        <h3 className="f-title">{this.props.title}</h3>
                        <RForm RType={config.RType} submit={self.handleRetrieve}/>
                        <CForm CType={config.CType} />
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
                    key: item.dataIndex,
                    width: item.width
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
        
        // 搜索更新处理
        handleRetrieve: function(info){
            const self = this;
            
            config.Retrieve(info, function(list){
                self.setState({
                    loading: false,
                    resultList: list
                });
            });
        },
        
        // table 操作列回调处理
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
