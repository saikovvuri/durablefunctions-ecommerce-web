var postData = (url, data) => {
    return fetch(url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8"
            },
            body: JSON.stringify(data)
        });
};

Vue.filter('formatDate',
    function (value) {
        var d = new Date(value);
        return d.toLocaleDateString();
    });

Vue.filter('formatOrderItems',
    function (value) {
        var splitValue = value.split(",");
        var x = "";
        for (var i = 0; i < splitValue.length; i++) {
            x += splitValue[i] + ", ";
        }
        return x.substring(0,x.length-2);
    });

Vue.filter('formatRuntimeStatus',
    function (value) {
        return ["Running",
            "Completed",
            "ContinuedAsNew",
            "Failed",
            "Canceled",
            "Terminated",
            "Pending"][value];
    });

var app = new Vue({
    el: '#app',
    data: {
        orders: null,
        errorMessage: null
    },
    mounted: function () {
        this.getOrderStatuses();
    },
    methods: {
        getOrderStatuses: function () {
            this.errorMessage = null;
            fetch('/api/GetOrdersHttpClient?code=wQ5E6oG3rSRgwZcUIuFCa5m42euNc3SXy5jTakM2xjoWjjy7r72JMg==')
                .then(response => response.json())
                .then(json => {
                    this.orders = json;
                })
                .catch(err => {
                    this.errorMessage = `failed to get orders (${err})`;
                });
        },
        approve: function (order, status) {
            postData(`/api/approve/${order.rowKey}?code=hviGOehv6a6EUGM4ZsZ8AvarSGtkFS9zbEw/ijwDZUHi9QADnnU/hw==`, status)
                .then(_ => order.customStatus = '');
        }
    }
});
