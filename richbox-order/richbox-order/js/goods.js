new Vue({
    el: "#app",
    data: {
        loading: false,
        detailShow: false,
        bounceIn: false,
        num: 0,
        maxpage: 1,
        totalPrice:0,
        totalCount:0,
        detailInfo:{
            Name:'',
            Price:'',
            Remarks:'',
            ThumUrl:''
        },
        queryParam: {
            pageNo: 1,
            pageSize: 10
        },
        cartFoods:[],
        list: []
    },
    computed:{
      
    },
    methods: {
        confirmOrder(){
            if(this.totalCount>0){
                let orderInfo={}
                orderInfo.GoodsList=this.cartFoods
                orderInfo.Amount=this.totalPrice
                orderInfo.Remarks=''
                orderInfo =JSON.stringify(orderInfo)
                window.sessionStorage.setItem('orderInfo',orderInfo)
                window.location.href='./confirmOrder.html'
            }else{
                this.$toast('还没有可结算的商品！')
            }

        },
        getTotalPrice(){
            let price=0;
            this.cartFoods.forEach(item=>{
              price+=item.num*item.Price
            })
            
        this.totalPrice = price.toFixed(2)
          },
          getTotalCount(){
            let num=0;
            this.cartFoods.forEach(item=>{
              num+=item.num
            })
                this.totalCount = num
          },
        addCart(index) {
            this.bounceIn = true
            if(this.list[index].num==0){
                this.cartFoods.push(this.list[index])
                window.localStorage.setItem('cartFoods',  JSON.stringify(this.cartFoods))
            }
            this.list[index].num =  this.list[index].num + 1;
            setTimeout(() => {
                this.bounceIn = false
            }, 1000)
            this.getTotalCount()
            this.getTotalPrice()

        },
        decreas(index) {
            var index1 = this.cartFoods.indexOf(this.list[index])
            if ( this.list[index].num >= 1) {
              this.list[index].num = this.list[index].num - 1;
              if(this.list[index].num==0){
                  this.cartFoods.splice(index1,1)
              }
              window.localStorage.setItem('cartFoods', JSON.stringify(this.cartFoods))
              this.getTotalCount()
              this.getTotalPrice()
            }
        },
        getDetail(id){
            this.$indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
              });
            
            getFoodsDetail(id).then(res=>{
              this.detailShow=true
              this.detailInfo =res.Data
              this.$indicator.close()
            })
        },
        loadMore() {
            if (this.queryParam.pageNo <= this.maxpage) {
                this.loading = true;
                getFoodsList(this.queryParam).then(res => {
                    this.$indicator.close()
                    this.loading = false;
                    this.queryParam.pageNo++;
                    this.maxpage = Math.floor(res.Data.Count / this.queryParam.pageSize)
                    this.list = this.list.concat(res.Data.List)
                    this.list.forEach((item,index) => {
                        if (!item.num) {
                            let food = item
                            food.num = 0
                            Vue.set(this.list, index, food)
                        }

                    })
                })
            }
        }
    },
    mounted() {
        /* if(window.localStorage.getItem('cartFoods')){
         this.cartFoods=JSON.parse(window.localStorage.getItem('cartFoods'))
           this.getTotalCount()
           this.getTotalPrice()
        } */
     // 首先调用JSBridge初始化代码
    initJsBridge(function () {})
        this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
        this.loadMore()
        

    }
  

})