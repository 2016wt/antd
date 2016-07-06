// 纯数据展现情况列表
import React from 'react';

import FeatureSetConfig from '../component/FeatureSetConfig';

import Immutable from 'immutable';
import Reqwest from 'reqwest';

import testData from '../common/test-data';

// 增加(Create)、重新取得数据(Retrieve)、更新(Update)和删除(Delete)
const graph_conf = {
    
    type: 'graphList', // tableList graphList simpleObject complexObject 

    // 初始化展现的数据，使用callback 回传列表数据
    // 需要手动添加唯一id key
    // callback 组件数据的回调函数(接受列表数据参数)
    initData: function(callback){
       
       // 模拟数据
       setTimeout(function(){
            let list = testData.graphList;
            callback(list);
       }, 1000)
    },
        
    // 参考echarts 参数
    option : {
        title: {
            text: '堆叠区域图'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['邮件营销','联盟广告','视频广告']
        },
        toolbox: {
            feature: {
                saveAsImage: {}
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : []
    }

};

const Feature1 = FeatureSetConfig(graph_conf);

export default Feature1;
