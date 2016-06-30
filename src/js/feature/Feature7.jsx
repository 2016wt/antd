// 纯数据展现情况列表
import React from 'react';
import { Upload, Icon } from 'antd';
import baidubce from 'bce-sdk-js';

const uploadConfig = {
  endpoint: 'http://bj.bcebos.com',         //传入Bucket所在区域域名
  credentials: {
      ak: 'e4a6dcc47a3b46f3a5ebf0f81d0e4928',          //您的AccessKey
      sk: '8d26035b87e14989a4343f0e43c0ce71'           //您的SecretAccessKey
  }
};

let client = new baidubce.BosClient(uploadConfig);

// const upload = function (){
//     console.log(baidubce)

//     let client = new baidubce.BosClient(uploadConfig);
//     console.log(client)
//     let bucket = 'mbrowser';
//     let key = 'hello.js';
    
//     client.putObjectFromString(bucket, key, 'hello world')
//       .then(response => console.log(response))    
//       .catch(error => console.error(error)); 
// }

const Feature7 = React.createClass({
    render: function() {
        const self = this;
        return  <div>
                    <h3 className="f-title">{this.props.title}</h3>
                    <input type="file" onChange={this.uploadImg}/>
                </div>;
    },

    uploadImg: function(e){
        var file = e.target.files[0]; // 获取要上传的文件
        var key = file.name; // 保存到bos时的key，您可更改，默认以文件名作为key
        var blob = file;

        var ext = key.split(/\./g).pop();
        var mimeType = baidubce.MimeType.guess(ext);
        if (/^text\//.test(mimeType)) {
            mimeType += '; charset=UTF-8';
        }
        var options = {
            'Content-Type': mimeType
        };

        // client.putObjectFromBlob("mbrowser", key, blob, options)
        //     .then(function (res) {
        //         // 上传完成，添加您的代码
        //         console.log('上传成功');
        //     })
        //     .catch(function (err) {
        //         // 上传失败，添加您的代码
        //         console.error(err);
        //     });

        client.putObjectFromBlob("mbrowser", key,  blob, options)
            .then(function (res) {
                // 上传完成，添加您的代码
                console.log('上传成功');
            })
            .catch(function (err) {
                // 上传失败，添加您的代码
                console.error(err);
            });
    }
});

export default Feature7;
