const url = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點
const path = 'akihico'; // 請加入個人 API Path

const App = {
    data(){
        return {
            products: [],
            tempProduct:{},
        }
    },
    methods: {
        checkLogin(){
            //取出token
            const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
            // headers夾帶token
            axios.defaults.headers.common['Authorization'] = token;
            axios.post(`${url}/api/user/check`)
            .then((res) => {
                this.render();
            })
            .catch((err) => {
                alert(err.data.message);
                window.location = 'login.html';
            })
        },
        // 取得產品資訊
        getProducts(){
            axios.get(`${url}/api/${path}/admin/products`)
            .then((res) => {
                this.products = res.data.products;
            })
            .catch((err) => {
                alert(err.data.message);
            })
        },
        // 刪除產品
        deleteProduct(id){
            axios.delete(`${url}/api/${path}/admin/product/${id}`)
            .then((res) => {
                alert(res.data.message);
                this.render();
            })
            .catch((err) => {
                alert(err.data.message);
            })
        },
        // 渲染
        render(){
            this.getProducts();
        }
    },
    created(){
        this.checkLogin();
    }
}
Vue.createApp(App).mount('#app');