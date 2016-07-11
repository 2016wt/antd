// 含有可操作 table 栏的数据展示
import React from 'react';

import TinyMCE from 'react-tinymce';

import Immutable from 'immutable';
//https://github.com/ded/reqwest
import Reqwest from 'reqwest';

const Feature = React.createClass({
    getDefaultProps: function(){
        return {
        }
    },
    render: function() {
        return  <TinyMCE
                    content="<p>This is the initial content of the editor</p>"
                    config={{
                      plugins: 'link image code',
                      toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code'
                    }}
                    onChange={this.handleEditorChange}/>
    },

    handleEditorChange(e) {
        console.log('Content was updated:', e.target.getContent());
    },
});

export default Feature;
