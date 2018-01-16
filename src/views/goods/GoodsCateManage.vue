<template>
    <div>
        <Button class="add" type="error" size="large"  @click ="show()">新增分类</Button>
        <i-table class="dataTable" border :columns="columns1" :data="data">
        </i-table>
        <Page class="page" :total="dataCount" :page-size="pageSize" show-total  @on-change="drawPage"></Page>
        <!--信息管理-->
        <Modal v-model="modal1" title="分类信息"  @on-ok="ok">
            <Form ref="formItem2" :model="formItem2" :rules="ruleItem2" :label-width="80">
                <FormItem label="分类名称" prop="name">
                    <Input v-model="formItem2.name" placeholder=""></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    var self = null;
    export default {
        name: "goods-cate-manage",
        data () {
            return {
                dataCount:0,
                pageSize:10,
                pageindex:1,
                modal1:false,
                formItem2: {
                    pkId : 0,
                    name: ''
                },
                ruleItem2: {
                    name: [{
                        required: true,
                        message: '请填写名称！',
                        trigger: 'blur'
                    }]
                },
                columns1: [
                    {
                        title: '分类名称',
                        key: 'name'
                    },
                    {
                        title: '状态',
                        key: 'state',
                        render: (h, params) => {
                            var name = "下架";
                            var color = "red";
                            if(params.row.state == 1){
                                name = "正常";
                                color = "green";
                            }
                            return    h('Tag', {
                                props: {
                                    color: color,
                                }
                            }, name);;
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            var name = "上架";
                            var type = "primary";
                            if(params.row.state == 1){
                                 name = "下架";
                                 type = "error";
                            }
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
                                        type: type,
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            self.change(params.index)
                                        }
                                    }
                                }, name)
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
                    self.formItem2.pkId = self.data[index].pkId;
                    self.formItem2.name = self.data[index].name;
                }else {
                    self.$refs["formItem2"].resetFields();
                    self.formItem2.pkId = 0;
                }
                self.modal1 = true;
            },
            change(index){
                self.$http.post(self.GLOBAL.changeGoodsCate,
                    {
                        pkId: self.data[index].pkId,
                        state: (self.data[index].state + 1)%2
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
            ok(){
                self.$refs["formItem2"].validate((valid) => {
                    if (valid) {
                        self.$http.post(self.GLOBAL.changeGoodsCate,
                            {
                                pkId: self.formItem2.pkId,
                                name: self.formItem2.name
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
                self.$http.post(self.GLOBAL.getGoodsCateList,
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
                    self.data = res.data.data.goodsCateList;
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