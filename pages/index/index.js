Page({

  /**
   * 页面的初始数据
   */
  data: {
    region:['安徽省','芜湖市','镜湖区'],
    key: '79ab60ad0xxxxxxxxxx7a937',
    city: '',
    weather_now: {},
    future: {},
    twenty_four: {},
    indices: {},
    flag: false,
    latitude_value: 1,
    longitude_value: 12,
    weather_now:{
        temp:0,
        text:'NAN',
        icon:999,
        humidity:0,
        pressure:0,
        vis:0,
        windDir:'NAN',
        windScale:0,
        windSpeed:0

    }
  },
  regionChange:function(e){
      this.setData({
          region:e.detail.value
      });
      this.getWeather();
  },

  getWeather:function(){
    var that=this;
    wx.request({
        url: 'https://geoapi.qweather.com/v2/city/lookup', 
        method: 'GET',
        data: {
          key: "de5f78a7692f44b0b82557436bfce090",
          location: that.data.region[1]  //这个就是前端输入的城市名
        },
        success: (res) => {
          console.log(res);
          // return res.data.location[0].id
          this.setData({
            location: res.data.location[0].id  //提取返回结果中的id
          })
       
          // 获取locationid后，查询当前天气，在success中发起请求
          var location_id = this.data.location;
          // console.log(location_id);
          wx.request({
            url: 'https://devapi.qweather.com/v7/weather/now', 
            method: 'GET',
            data: {
              key: "de5f78a7692f44b0b82557436bfce090",
              location: location_id
            },
            success: (res) => {
              console.log(res);
              this.setData({
                weather_now: res.data.now,
                flag: true
              })
            },
          });
            // 获取locationid后，查询天气指数
            wx.request({
              url: 'https://devapi.qweather.com/v7/indices/1d', 
              method: 'GET',
              data: {
                key: "de5f78a7692f44b0b82557436bfce090",
                location: location_id,
                type: 3
              },
              success: (res) => {
                console.log(res);
                this.setData({
                  indices: res.data.daily,
                  flag: true
                })
              },
            });
        },
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getWeather();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getWeather(()=>{
        wx.stopPullDownRefresh()
    });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})