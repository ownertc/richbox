
new Vue({
    el: "#app",
    data: {
        loading: false,
        detailShow: false,
        bounceIn: false,
        sepShow:false,
        projectShow:false,
        carFoodsShow:false,
        project:{
            Name:"全部",
            MapCoordinate:''
        },
        projectList:[],
        num: 0,
        res:0,
        maxpage: 1,
        totalPrice:0,
        totalCount:0,
        projectListQuery:{
            mapCoordinate:""
        },
        detailInfo:{
            Name:'',
            Price:'',
            Remarks:'',
            ThumUrl:''
        },
        queryParam: {
            pageNo: 1,
            pageSize: 10,
            mapCoordinate:''
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
        formatCarFoods(){
             this.cartFoods.forEach(item=>{
                 item.FoodGoodId=item.Id
                 item.FoodCount=item.num
                 var SpecDetailIds= []
                 var SpecDetailName= []
             
                 if(item.Specs){
            
                    item.Specs.forEach(item1=>{
                        SpecDetailIds.push(item1.Details[item1.specIndex].Id)
                        SpecDetailName.push(item1.Details[item1.specIndex].Name)
                       
                    })
                 }
                 item.SpecDetailIds=SpecDetailIds
                 item.SpecDetailName=SpecDetailName
                 item.SpecDetailDesc=item.SpecDetailName.join('/')
             })
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
        addCart(index,type) {
            if(index>=0&&!type){
                if(this.list[index].num==0){
                    this.cartFoods.push(this.list[index])
                }
                this.list[index].num =  this.list[index].num + 1;
            }else if(index>=0&&type){
                this.cartFoods[index].num =  this.cartFoods[index].num + 1;
            }else{
                this.detailInfo.num=0
                this.detailInfo.num+=1
                this.cartFoods.push(this.detailInfo)
                this.sepShow=false
              
            }
            this.bounceIn = true
            setTimeout(() => {
                this.bounceIn = false
            }, 1000)
            this.getTotalCount()
            this.getTotalPrice()
            window.localStorage.setItem('cartFoods',  JSON.stringify(this.cartFoods))
            this.formatCarFoods()
        },
        decreas(index,type) {
            if(index>=0&&!type){
                var index1 = this.cartFoods.indexOf(this.list[index])
                if ( this.list[index].num >= 1) {
                  this.list[index].num = this.list[index].num - 1;
                  if(this.list[index].num==0){
                      this.cartFoods.splice(index1,1)
                  }
                }
            }else if(index>=0&&type){
                if(this.cartFoods[index].num>1){
                    this.cartFoods[index].num-=1
                }else{
                    this.cartFoods[index].num-=1
                    this.cartFoods.splice(index,1)
                }
            }
            window.localStorage.setItem('cartFoods', JSON.stringify(this.cartFoods))
            this.getTotalCount()
            this.getTotalPrice()
            this.formatCarFoods()
          
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
        selectSpec(detailInfo){
              this.sepShow=true
              this.detailInfo =detailInfo 
              detailInfo.Specs.forEach((item,index)=>{
                this.$set(this.detailInfo.Specs[index],"specIndex", 0)
              })
            
        },
        selectSpecItem(index1,index2){
            this.detailInfo.Specs[index1].specIndex=index2  
        },
        loadMore() {
            if (this.queryParam.pageNo <= this.maxpage) {
                this.list=this.queryParam.pageNo===1?[]: this.list
                this.loading = true;
                getFoodsList(this.queryParam).then(res => {
                    this.res =res.Data.Count
                    this.$indicator.close()
                    this.loading = false;
                    this.queryParam.pageNo++;
                    this.maxpage = Math.ceil(res.Data.Count / this.queryParam.pageSize)
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
        },
        getProjectList(){
            ByMapCoordinate(this.projectListQuery).then(res=>{
                this.projectList = res.Data
                this.projectList.push({
                    Name:"全部",
                    MapCoordinate:''
                })
            })
        },
        projectSelect(item){
           this.project=item
           this.projectShow=false
           this.queryParam.mapCoordinate=this.project.MapCoordinate
           this.queryParam.pageNo=1,
           this.list=[]
           this.maxpage=1
           this.loadMore()
        }
    },
    created() {
    
     // 首先调用JSBridge初始化代码
    initJsBridge( ()=>{
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        if(isiOS){
         var userInfo=JSON.parse(window.localStorage.getItem('userInfo'))
         this.projectListQuery.mapCoordinate=userInfo.MapCoordinate
         this.queryParam.mapCoordinate=userInfo.MapCoordinate
        }
        if(isAndroid){
            var userInfo=JSON.parse(window.localStorage.getItem('userInfo'))
            this.projectListQuery.mapCoordinate=userInfo.mapCoordinate
            this.queryParam.mapCoordinate=userInfo.mapCoordinate
        }
        this.$indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
        this.loadMore() 
    })
       this.getProjectList()

    }

})