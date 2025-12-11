export default {
    name: 'NotFoundPage',
    layout: 'default',
    pageTitle: '404 - Halaman Tidak Ditemukan',
    data() {
        return {
            requestedUrl: window.location.hash || window.location.pathname
        }
    },
    methods: {
        goBack() {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                this.navigateTo('home');
            }
        }
    },
    mounted() {
        this.log('info', '404 page loaded', { requestedUrl: this.requestedUrl });
    }
}