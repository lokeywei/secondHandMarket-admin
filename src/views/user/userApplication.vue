<template>
    <div>
        <i-table border :columns="columns1" :data="data">
        </i-table>
        <Page class="page" :total="dataCount" :page-size="pageSize" show-total  @on-change="drawPage"></Page>
    </div>
</template>

<script>
    var self = null;
    export default {
        name: "user-application",
        data () {
            return {
                dataCount:0,
                pageSize:10,
                pageindex:1,
                columns1: [
                    {
                        title: '账号',
                        key: 'account'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '密码',
                        key: 'password'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            self.confirm(params.index)
                                        }
                                    }
                                }, '同意'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            self.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data: []
            }
        },
        methods:{
            confirm (index) {
                var userId = self.data[index].pkId;
                self.$http.post(self.GLOBAL.changeUser,
                    {
                        pkId: userId,
                        state:1
                    },
                    {
                        emulateJSON: false
                    }
                ).then(function (res) {
                    if(res.data.code == 0){
                        self.$Message.info('操作成功！')
                        self.drawPage();
                    }else {
                        self.$Message.error(res.data.msg)
                    }
                }).catch((e) => {
                    self.$Message.error('网络有误！')
                })
            },
            remove (index) {
                var userId = self.data[index].pkId;
                self.$http.post(self.GLOBAL.deleteUser,
                    {
                        pkId: userId
                    },
                    {
                        emulateJSON: true
                    }
                ).then(function (res) {
                    if(res.data.code == 0){
                        self.$Message.info('删除成功！')
                        self.drawPage();
                    }else {
                        self.$Message.error(res.data.msg)
                    }
                }).catch((e) => {
                    self.$Message.error('网络有误！')
                })
            },
            drawPage(index){
                if(null == index){
                    index = self.pageindex;
                }
                var _start = ( index - 1 ) * self.pageSize;
                var _end = index * self.pageSize;
                self.request(_start,_end);
            },
            request (start,end){
                self.$http.post(self.GLOBAL.getUserApplicationList,
                    {
                        start: start,
                        end:end
                    },
                    {
                        emulateJSON: false
                    }
                ).then(function (res) {
                    console.log(res.data)
                    self.dataCount= res.data.data.count;
                    self.data = res.data.data.userList;
                }).catch((e) => {
                    self.$Message.error('网络有误！')
                })
            }
        },
        created(){
            self = this; //避免指针出现错乱
            self.drawPage();
        }
    }
</script>

<style scoped>
    .page{
        float: right;
        margin: 5px;
    }
</style>