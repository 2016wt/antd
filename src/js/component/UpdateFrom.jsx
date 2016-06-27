import React from 'react';
import { Form, Select, Input, Button, Icon , DatePicker, TimePicker, Radio, Switch} from 'antd';
import { Upload, Modal, message } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

let UForm = React.createClass({
    getInitialState: function() {
        return {

        };
    },

    render: function() {
        const self = this;
        const UType = this.props.UType;
        const updateItem = this.props.updateItem;

        return  UType ?
                <div className="f-update">
                    <Modal title="更新对象" visible={this.props.isShow} onOk={this.handleUpdate} onCancel={this.hideModal}>
                        <Form horizontal form={this.props.form}>
                            { 
                                UType.map(function(item){
                                    const defaultValue = updateItem[item.name]||'';
                                    return self.dealConfigUType(item, defaultValue);
                                })
                            }
                        </Form>
                    </Modal>
                </div>:
                <div></div>
    },

    dealConfigUType: function(item, defaultValue){
        const { getFieldProps } = this.props.form;
        defaultValue = defaultValue || '';

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
                            {...getFieldProps(item.name, {rules:item.rules, initialValue:defaultValue})} />    
                        </FormItem>
                break;

            case 'date':
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>
                            <DatePicker showTime format="yyyy-MM-dd HH:mm:ss" {...getFieldProps(item.name, { initialValue:defaultValue})} />  
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
                let props = {
                    action: '/upload.do',
                    listType: 'picture-card',
                    // defaultFileList:[{
                    //     url: defaultValue,
                    //     status: 'done'
                    // }]
                }
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>
                            <Upload {...props} {...getFieldProps(item.name)}>
                                <Icon type="plus" />
                                <div className="ant-upload-text">上传图片</div>
                            </Upload>
                        </FormItem>

                break;

            default:
                return '';
                break;
        }
    },

    handleUpdate: function(){
        this.props.submit(this.props.form.getFieldsValue());
    },

    handleReset: function() {
        this.props.form.resetFields();
    },

    hideModal: function() {
        this.props.hideForm();
        this.handleReset();
    }
});
UForm = Form.create()(UForm);

export default UForm;
