<template>
    <div>
        <Button class="add" type="error" size="large"  @click ="show()">新增用户</Button>
        <i-table class="dataTable" border :columns="columns1" :data="data">
        </i-table>
        <Page class="page" :total="dataCount" :page-size="pageSize" show-total  @on-change="drawPage"></Page>
        <!--信息管理-->
        <Modal v-model="modal1" title="用户信息"  @on-ok="ok">
            <Form ref="formItem2" :model="formItem2" :rules="ruleItem2" :label-width="80">
                <FormItem label="账号" prop="account">
                    <Input v-model="formItem2.account" placeholder=""></Input>
                </FormItem>
                <FormItem label="昵称" prop="name">
                    <Input v-model="formItem2.name" placeholder=""></Input>
                </FormItem>
                <FormItem label="权限" prop="right">
                    <Checkbox v-model="formItem2.publish">发布商品</Checkbox>
                    <Checkbox v-model="formItem2.buy">购买商品</Checkbox>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    var self = null;
    export default {
        name: "user-manage",
        data () {
            return {
                dataCount:0,
                pageSize:10,
                pageindex:1,
                modal1:false,
                formItem2: {
                    userId : 0,
                    account: '',
                    name: '',
                    publish:true,
                    buy:true
                },
                ruleItem2: {
                    account: [{
                        required: true,
                        message: '请填写账号！',
                        trigger: 'blur'
                    }],
                    name: [{
                        required: true,
                        message: '请填写昵称！',
                        trigger: 'blur'
                    }]
                },
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
                        title: '权限',
                        key: 'password',
                        render: (h, params) => {
                            var publishStr = "";
                            var buyStr = "";
                            if(params.row.publish == 1){
                                publishStr = h('Tag', {
                                    props: {
                                        color: 'green',
                                    }
                                }, "发布");
                            }
                            if(params.row.buy == 1){
                                buyStr = h('Tag', {
                                    props: {
                                        color: 'green',
                                    }
                                }, "购买");
                            }
                            return   h('div', [publishStr,buyStr]);
                        }
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
                                            self.show(params.index)
                                        }
                                    }
                                }, '修改'),
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
            show (index) {
                if(null != index){
                    self.formItem2.userId = self.data[index].pkId;
                    self.formItem2.account = self.data[index].account;
                    self.formItem2.name = self.data[index].name;
                    self.formItem2.buy = self.data[index].buy == 1?true:false;
                    self.formItem2.publish = self.data[index].publish == 1?true:false;
                }else {
                    self.$refs["formItem2"].resetFields();
                    self.formItem2.userId = 0;
                    self.formItem2.buy = false;
                    self.formItem2.publish = false;
                }
                self.modal1 = true;
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
            ok(){
                self.$refs["formItem2"].validate((valid) => {
                    if (valid) {
                        self.$http.post(self.GLOBAL.changeUser,
                            {
                                pkId: self.formItem2.userId,
                                account: self.formItem2.account,
                                name: self.formItem2.name,
                                publish: self.formItem2.publish?1:0,
                                buy: self.formItem2.buy?1:0
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
                    }
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
                self.$http.post(self.GLOBAL.getUserList,
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
    .add{
        margin: 5px;
    }
    .page{
        float: right;
        margin: 5px;
    }
    .dataTable{
        margin: 5px;
    }
</style>