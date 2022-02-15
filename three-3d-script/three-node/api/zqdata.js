const axios = require('axios');
const basicUrlConfig = require('./config/basicUrl')
const Utils = require('../utils/index')
const qs = require('qs')
/**
 * 获取众趣后台scene数据
 * @param {*} plan_id 
 * @returns 
 */
const getZQData = function (plan_id) {
  const itemData = { "plan_data": "", "point_data": "" };
  const data = {
    Database: "render",
    Sql: `select name,plan_data,point_data,style,create_time from zq_scheme_list where id='${plan_id}'`
  }
  return axios({
    method: "post",
    url: basicUrlConfig.basicUrl + "/Service1.asmx/ExecuteQuery",
    dataType: "json",
    data: qs.stringify(data),
    headers: {
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8"
    }
  }).then(function ({ data }) {

    console.log(data)
    if ("1" == data.code) {
      let JData = JSON.parse(data.data);
      console.log(data)
      if (true == JData.ok) {
        let itemArr = JData.Table;
        var base64PlanData = itemArr[0].plan_data;
        var urlPlanData = Utils.base64_decode(base64PlanData);
        itemData.plan_data = decodeURIComponent(urlPlanData);
        itemData.plan_data = itemData.plan_data.replace(/\+/g, ' '); //防止空格变+号，导致解析失败
        itemData.plan_data = JSON.parse(itemData.plan_data.replace(/\r\n/g, ''));
        var base64PointData = itemArr[0].point_data;
        var urlPointData = Utils.base64_decode(base64PointData);
        itemData.point_data = decodeURIComponent(urlPointData);
        itemData.point_data = itemData.point_data.replace(/\+/g, ' ');
        itemData.point_data = JSON.parse(itemData.point_data.replace(/\r\n/g, ''));
        // mWebAPI.m_SchemeName = itemArr[0].name;
        // mWebAPI.m_SchemeStyle = itemArr[0].style;
        // mWebAPI.m_CreateTime = itemArr[0].create_time;
        return itemData
      }
    } else {
      return Promise.reject(data.msg)
    }
  })
}

module.exports = {
  getZQData
}