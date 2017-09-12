const routes = {
    path: '/',
    indexRoute: {
        getComponent(nextState, callback) {
            require.ensure([], require => {
                callback(null, require('../views/login/Login.jsx').default);
            }, 'login');
        },
    },
    childRoutes: [
        {
            getComponent(nextState, callback) {
                require.ensure([], require => {
                    callback(null, require('../views/home/Home.jsx').default);
                }, 'home');
            },
            childRoutes: [
                {
                    path: '/bank',
                    getComponent(nextState, callback) {
                        require.ensure([], require => {
                            callback(null, require('../views/bank/BC.js').default);
                        }, 'home');
                    },
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
        }
    ]
};

export default routes;
export { routes };