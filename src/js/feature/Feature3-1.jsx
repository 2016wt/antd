// 纯数据展现情况列表
import React from 'react';
import TinyMCE from 'react-tinymce';
import Reqwest from 'reqwest';

import BDUploader from '../component/BDUploader';

import { Form, Input, Button } from 'antd';
const FormItem = Form.Item;
let tinymceInstance;
const Feature = React.createClass({
    getInitialState: function(){
        return {
            value: '',
            ovalue: '',

            imgUrl:''
        }
    },
    render: function() {
        let config = {
            content: this.state.ovalue,
            config: {
                height: '250',
                plugins: [
                    "advlist autolink lists charmap print preview hr anchor pagebreak spellchecker",
                    "searchreplace wordcount visualblocks visualchars fullscreen insertdatetime  nonbreaking",
                    "save table contextmenu directionality emoticons paste textcolor"
                ],
                toolbar: "insertfile undo redo | styleselect fontselect fontsizeselect| bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | l      | print preview fullpage | forecolor backcolor", 
            },
            onChange: this.handleEditorChange
        }
        return  <div className="featureItem">
            <Form inline>
                <FormItem
                    label="目标转码链接"
                    key="target-url">
                    <Input style={{width:'400px'}} placeholder="请输入需要转码的链接"/>    
                </FormItem>
                
                <FormItem>
                    <Button type="primary" icon="swap" onClick={this.changeNews}>转码</Button>
                </FormItem>
                <FormItem>
                    <Button type="button" icon="save" onClick={this.saveContent}>保存内容</Button>
                </FormItem>
            </Form>
            <div style={{marginTop:'20px'}}>
                <BDUploader success={this.uploadImgSuccess} />
                <p>{this.state.imgUrl}</p>
            </div>
            <TinyMCE className="editor" {...config} />
        </div>
    },

    componentDidMount: function(e){
        tinymceInstance = tinymce.get(0);
    },
    
    uploadImgSuccess: function(url){
        this.setState({
            imgUrl:url
        });
    },
    setTinymceContent: function(value){
        tinymceInstance.setContent(value);
    },
    getTinymceContent: function(){
        return tinymceInstance.getContent(value);
    }
});

export default Feature;