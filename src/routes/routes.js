const routes = {
    path: '/',
    onEnter: () => window.location.hash = '/home/index',
    childRoutes: [
        {
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../views/home/Home').default);
                }, 'home');
            },
            childRoutes: [
                {
                    path: '/home',
                    childRoutes: [
                        {
                            path: '/home/index',
                            getComponent(nextState, callback) {
                                require.ensure([], require => {
                                    callback(null, require('../views/home/Index').default);
                                }, 'index');
                            },
                        }
                    ]
                },
                {
                    path: '/bank',
                    childRoutes: [
                        {
                            path: '/bank/bc',
                            getComponent(nextState, callback) {
                                require.ensure([], require => {
                                    callback(null, require('../views/bank/BC').default);
                                }, 'index');
                            },
                        },
                        {
                            path: '/bank/cbc',
                            getComponent(nextState, callback) {
                                require.ensure([], require => {
                                    callback(null, require('../views/bank/CBC').default);
                                }, 'index');
                            },
                        },
                        {
                            path: '/bank/icbc',
                            getComponent(nextState, callback) {
                                require.ensure([], require => {
                                    callback(null, require('../views/bank/ICBC').default);
                                }, 'index');
                            },
                        }
                    ]
                },
                {
                    path: '/merchant',
                    childRoutes: [
                        {
                            path: '/merchant/usually',
                            getComponent(nextState, callback) {
                                require.ensure([], require => {
                                    callback(null, require('../views/merchant/MerchantAddUsually').default);
                                }, 'index');
                            },
                        },
                        {
                            path: '/merchant/big',
                            getComponent(nextState, callback) {
                                require.ensure([], require => {
                                    callback(null, require('../views/merchant/MerchantAddBig').default);
                                }, 'index');
                            },
                        }
                    ]
                }
            ]
        },
        {
            path: '/login',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../views/login/Login.jsx').default);
                }, 'login');
            },
        },
        {
            path: '/404',
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../views/error/Error404').default);
                }, 'error');
            },
        },
        {
            path: '*',
            onEnter: () => window.location.hash = '/404'
        }
    ]
};

export default routes;
export { routes };