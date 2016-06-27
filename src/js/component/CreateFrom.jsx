import React from 'react';
import { Form, Select, Input, Button, Icon , DatePicker, TimePicker, Radio, Switch} from 'antd';
import { Upload, Modal, message } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

let CForm = React.createClass({
    getInitialState: function() {
        return { visible: false };
    },

    render: function() {
        const self = this;
        const CType = this.props.CType;

        return  CType ?
                <div className="f-create">
                    <Button type="primary" icon="plus-circle-o" onClick={this.showModal}>添加</Button>
                    <Modal title="添加新对象" visible={this.state.visible} onOk={this.handleCreate} onCancel={this.hideModal}>
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
                            {...getFieldProps(item.name, {rules:item.rules})} />    
                        </FormItem>
                break;

            case 'date':
                return <FormItem
                            label={item.label}
                            key={item.name}
                            {...formItemLayout}>
                            <DatePicker showTime format="yyyy-MM-dd HH:mm:ss" {...getFieldProps(item.name)} />  
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

            case 'image':
                let props = {
                    action: '/upload.do',
                    listType: 'picture-card'
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

    handleCreate: function(){

        console.log('收到表单值：', this.props.form.getFieldsValue());

        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }else{
                console.log('Submit!!!');
                this.props.submit(values);
                this.hideModal();
            }
        });
        //this.props.submit(this.props.form.getFieldsValue());
        
    },

    handleReset: function() {
        this.props.form.resetFields();
    },

    showModal: function() {
        this.setState({ visible: true });
    },

    hideModal: function() {
        this.setState({ visible: false });
        this.handleReset();
    }
});
CForm = Form.create()(CForm);

export default CForm;
