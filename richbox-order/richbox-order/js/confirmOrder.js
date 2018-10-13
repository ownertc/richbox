new Vue({
    el:"#app",
    addressInfo:null,
    data:{
        desc:"",
        addressInfo:null,
        orderInfo:{}
    },
    methods:{
        goAddress(){
            window.sessionStorage.setItem('Remarks',this.orderInfo.Remarks)
            window.location.href='./address.html'
        },
        addOrder(){
            if(this.addressInfo){
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                  });
                pushOrder(this.orderInfo).then(res=>{
                    this.$indicator.close()
                    if(res.Code===200){
                        initJsBridge(function () {
                         window.WebViewJavascriptBridge.callHandler('callNativePay', res.Data, function (response) {
                              
                          });
                        })
                    }else{
                      this.$toast(res.ShowData)
                    }
                })
            }else{
                this.$toast('请选择收货地址！')
            }

            }
           
    },
 mounted(){
      this.orderInfo=JSON.parse(window.sessionStorage.getItem('orderInfo'))
      if(window.sessionStorage.getItem('addressInfo')){
        var addressInfo=JSON.parse(window.sessionStorage.getItem('addressInfo'))
        this.addressInfo=addressInfo
        this.orderInfo.CreateId=addressInfo.userid
        this.orderInfo.Receiver=addressInfo.UserName
        this.orderInfo.ReceiverPhone=addressInfo.UserPhone
        this.orderInfo.ReceiveAddress=addressInfo.ProjectAddress +  addressInfo.ProjectName + addressInfo.RoomName
        this.orderInfo.ReceiverProjectId=addressInfo.ProjectId
        this.orderInfo.Remarks=window.sessionStorage.getItem('Remarks')
      }
      this.orderInfo.GoodsList.forEach(item => {
          item.FoodGoodId=item.Id
          item.FoodCount=item.num
      });
   }
})