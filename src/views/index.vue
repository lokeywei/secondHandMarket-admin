<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 580px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    .layout-ceiling-main a{
        color: #9ba7b5;
    }
    .layout-hide-text .layout-text{
        display: none;
    }
    .ivu-col{
        transition: width .2s ease-in-out;
    }
</style>
<template>
    <div class="layout" :class="{'layout-hide-text': spanLeft < 5}">
        <Row type="flex">
            <i-col :span="spanLeft" class="layout-menu-left">
                <Menu active-key="1" theme="dark" width="auto">
                    <div class="layout-logo-left"></div>
                    <Submenu :name="menu.title"  v-for="menu in menus">
                        <template slot="title">
                            <Icon :type= "menu.type" :size="iconSize"></Icon>
                            <span class="layout-text">{{ menu.title }}</span>
                        </template>
                         <Menu-item  :name="item.title"  v-for="item in menu.items" @click.native="menuchange(item.url)">{{item.title}}</Menu-item>
                    </Submenu>
                </Menu>
            </i-col>
            <i-col :span="spanRight">
                <div class="layout-header">
                    <i-button type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </i-button>
                    <div class="userLogin">您好,admin  <a class="logOut" @click="logout">Logout</a></div>

                </div>
                <div class="layout-breadcrumb">
                    <h2>后台管理系统</h2>
                    <!--<Breadcrumb>-->
                        <!--<Breadcrumb-item href="#">后台管理系统</Breadcrumb-item>-->
                        <!--&lt;!&ndash;<Breadcrumb-item href="#">应用中心</Breadcrumb-item>&ndash;&gt;-->
                        <!--&lt;!&ndash;<Breadcrumb-item>某应用</Breadcrumb-item>&ndash;&gt;-->
                    <!--</Breadcrumb>-->
                </div>
                <div class="layout-content">
                    <div class="layout-content-main">
                        <router-view></router-view>
                    </div>
                </div>
                <div class="layout-copy">
                    2018 &copy; 南京邮电大学 B14041536
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                spanLeft: 5,
                spanRight: 19,
                menus:[{title:"用户管理",type:"ios-analytics",items:[{title:"用户申请",url:"/userApplication"},{title:"用户列表",url:"/userManage"}]},
                        {title:"商品管理",type:"ios-navigate",items:[{title:"商品审批",url:"/goodsApplication"},{title:"分类列表",url:"/goodsCateManage"},{title:"商品列表",url:"/goodsManage"}]}]
            }
        },
        computed: {
            iconSize () {
                return this.spanLeft === 5 ? 14 : 24;
            }
        },
        methods: {
            toggleClick () {
                if (this.spanLeft === 5) {
                    this.spanLeft = 2;
                    this.spanRight = 22;
                } else {
                    this.spanLeft = 5;
                    this.spanRight = 19;
                }
            },
            menuchange(url){
                this.$router.push(url)
            },
            logout(){
                this.$router.push("/")
            }
        }
    }
</script>
<style scoped>
    .userLogin{
        float: right;
        font-size: 16px;
        margin: 15px;
        margin-right: 50px;
    }
    .logOut{
        float: right;
        margin-left: 30px;
        color: gainsboro;
    }
</style>