const url = 'https://vue3-course-api.hexschool.io/v2'; // 請加入站點
const path = 'akihico'; // 請加入個人 API Path
const App = {
    data() {
        return {
            user: {
                username: '',
                password: '',
            }
        }
    },
    methods: {
        login(){
    // 發送 api請求
            //console.log(user);
            axios.post(`${url}/admin/signin`, this.user)
                .then((res) => {
                    alert(res.data.message);
                    const {token, expired} = res.data;
                    //console.log(token, expired);
                    // 把token和時效存在cookie中
                    document.cookie = `hexToken=${ token }; expires=${ new Date(expired)};`;
                    window.location = 'products.html';
                })
                .catch((err) => {
                    alert(err.data.message);
                })
        }
    }
}
Vue.createApp(App).mount('#app');