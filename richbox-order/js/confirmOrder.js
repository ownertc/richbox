new Vue({
    el:"#app",
    addressInfo:null,
    data:{
        btnStatus:true,
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
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

            if(this.addressInfo){
                this.$indicator.open({
                    text: '加载中...',
                    spinnerType: 'fading-circle'
                  });
                  this.btnStatus=false
                pushOrder(this.orderInfo).then(res=>{
                    this.btnStatus=true
                    this.$indicator.close()
                    if(res.Code===200){
                        if(isiOS){
                            initJsBridge(function () {
                                window.WebViewJavascriptBridge.callHandler('callNativePay', res.Data, function (response) {  
                                 });
                               })
                        }else if(isAndroid){
                            initJsBridge(function () {
                                window.WebViewJavascriptBridge.callHandler('callNativePay',JSON.stringify(res.Data), function (response) {  
                                 });
                               })
                        }
                       
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
        addressInfo.ProjectAddress=addressInfo.ProjectAddress?addressInfo.ProjectAddress:""
        addressInfo.ProjectName=addressInfo.ProjectName?addressInfo.ProjectName:""
        addressInfo.RoomNumber=addressInfo.RoomNumber?addressInfo.RoomNumber:""
        this.orderInfo.ReceiveAddress=addressInfo.ProjectAddress +  addressInfo.ProjectName + addressInfo.RoomNumber
        this.orderInfo.ReceiverProjectId=addressInfo.ProjectId
        this.orderInfo.Remarks=window.sessionStorage.getItem('Remarks')
      }
      this.orderInfo.GoodsList.forEach(item => {
          item.FoodGoodId=item.Id
          item.FoodCount=item.num
      });
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        if(isAndroid){
            document.getElementsByClassName('footerBar')[0].style.bottom="0px"
        }
   }
})