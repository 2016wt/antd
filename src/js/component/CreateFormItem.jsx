import React from 'react';
import { Form, Select, Input, Button, Icon , DatePicker, TimePicker, Radio, Switch} from 'antd';
import { Upload, Modal, message } from 'antd';

import BDUploader from './BDUploader';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

let CFormItem = React.createClass({
    getInitialState: function() {
        return {
            img_url:''
        };
    },

    render: function() {
        const getFieldProps = this.props.getFieldProps;
        const formItemLayout = this.props.formItemLayout || {};
        const item = this.props.item || {};
        
        let defaultValue = item.defaultValue || '';

        switch (item.type){
            case 'string':
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>
                            <Input placeholder={item.placeholder||''}
                            {...getFieldProps(item.name, {rules:item.rules, initialValue:defaultValue})} />    
                        </FormItem>
                break;

            case 'date':
                defaultValue = defaultValue ?
                    (/(\d){4}(\-(\d){2}){2}\s((\d){2}(\:)){2}(\d){2}/.test(defaultValue)?defaultValue:new Date(defaultValue)):
                    new Date();
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>
                            <DatePicker showTime format="yyyy-MM-dd HH:mm:ss" {...getFieldProps(item.name, { initialValue: defaultValue})} />  
                        </FormItem>
                break;

            case 'select':
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>
                            <Select  {...getFieldProps(item.name, { initialValue: defaultValue })} >
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
                            <RadioGroup {...getFieldProps(item.name, { initialValue: defaultValue })}>
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
                            <Switch {...getFieldProps(item.name, { initialValue: defaultValue})} />
                        </FormItem>
                break;

            case 'imageUpload':
                defaultValue = this.state.img_url || defaultValue || '';
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>
                            <Input
                            {...getFieldProps(item.name, { initialValue:defaultValue})} /> 
                            <img className="uploadImg" src={defaultValue} />
                            <BDUploader success={this.uploadSuccess} />
                        </FormItem>

                break;

            default:
                return '';
                break;
        }
    },
    uploadSuccess: function(url){
        console.log(url)
        this.setState({
            img_url: url
        })
    }
});

export default CFormItem;
