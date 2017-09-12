const  menuData = [
    {
        title: "首页",
        routes: [
            {
                title: "首页",
                route: '/home/index'
            }
        ]
    },
    {
        title: '管理',
        routes: [
            {
                title: '普通商户',
                route: '/merchant/usually'
            },
            {
                title: '大商户',
                route: '/merchant/big'
            }
        ]
    },
    {
        title: '银行',
        routes: [
            {
                title: '中国银行',
                route: '/bank/bc'
            },
            {
                title: '工商银行',
                route: '/bank/icbc'
            },
            {
                title: '建设银行',
                route: '/bank/cbc'
            }
        ],
    }
];

export default menuData;