const routers = [
    {
        path: '/',
        meta: {
            title: ''
        },
        component: (resolve) => require(['./views/login.vue'], resolve)
    },
    {
        path: '/index',
        meta: {
            title: '首页'
        },
        component: (resolve) => require(['./views/index.vue'], resolve),
        children:[
            {
                path: '/userApplication',
                meta: {
                    title: ''
                },
                component: (resolve) => require(['./views/user/userApplication.vue'], resolve)
            },
            {
                path: '/userManage',
                meta: {
                    title: ''
                },
                component: (resolve) => require(['./views/user/userManage.vue'], resolve)
            },
            {
                path: '/goodsApplication',
                meta: {
                    title: ''
                },
                component: (resolve) => require(['./views/goods/goodsApplication.vue'], resolve)
            },
            {
                path: '/goodsCateManage',
                meta: {
                    title: ''
                },
                component: (resolve) => require(['./views/goods/goodsCateManage.vue'], resolve)
            },
            {
                path: '/goodsManage',
                meta: {
                    title: ''
                },
                component: (resolve) => require(['./views/goods/goodsManage.vue'], resolve)
            }
        ]
    }

];
export default routers;