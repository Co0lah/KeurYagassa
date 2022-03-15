// DATAS
const products = [
    { id: 1, description: "Bogolan 1", price: 12, img: 'assets/img/bogo1.jfif' },
    { id: 2, description: 'Bogolan 2', price: 20, img: 'assets/img/bogo2.jfif' },
    { id: 3, description: 'Bogolan 3', price: 5, img: 'assets/img/bogo3.jfif' },
    { id: 4, description: 'Bogolan 4 ', price: 8, img: 'assets/img/bogo4.jfif' },
    { id: 5, description: 'Bogolan 5 ', price: 3, img: 'assets/img/bogo5.jfif' },
    { id: 6, description: 'Bogolan 6 ', price: 65, img: 'assets/img/bogo6.jfif' },
    { id: 7, description: 'Bogolan 7', price: 25, img: 'assets/img/bogo7.jfif' },
    { id: 8, description: 'Bogolan 8', price: 28, img: 'assets/img/bogo8.jfif' },
    { id: 9, description: 'Bogolan 9', price: 4, img: 'assets/img/bogo9.jfif' },
    { id: 10, description: 'Bogolan 10 ', price: 29, img: 'assets/img/bogo10.jfif' },
    { id: 11, description: 'Bogolan 11', price: 87, img: 'assets/img/bogo11.jfif' },
    { id: 12, description: 'Bogolan 12', price: 6, img: 'assets/img/bogo12.jfif' },
];



// COMPONENTS
const Home = {
    template: '#home',
    name: 'Home',
    data: () => {
        return {
            products,
            searchKey: '',
            liked: [],
            cart: []
        }
    },
    computed: {
        filteredList() {
            return this.products.filter((product) => {
                return product.description.toLowerCase().includes(this.searchKey.toLowerCase())
            })
        },
        // RECUPERE LES COOKIES
        getLikeCookie() {
            let cookieValue = JSON.parse($cookies.get('like'))
            // LIKE EST TOUJOURS VIDE, ON CHECK SI COOKIEVALUE = NULL, SINON ON PASSE LES COOKIEVALUE PARSED A THIS.LIKED
            cookieValue == null ? this.liked = [] : this.liked = cookieValue
        },
        cartTotalAmount() {
            let total = 0;
            for (let item in this.cart) {
                total = total + (this.cart[item].quantity) * (this.cart[item].price)
            }
            return total;
        },
        itemTotalAmount() {
            let itemTotal = 0;
            for (let item in this.cart) {
                itemTotal = itemTotal + (this.cart[item].quantity)
            }
            return itemTotal
        }
    },
    methods: {
        setLikeCookie() {
            document.addEventListener('input', () => {
                // LAISSER LE TEMPS AU LIKE DE S'INCREMENTER, DONC ASYNC AVEC SETIMEOUT
                setTimeout(() => {
                    $cookies.set('like', JSON.stringify(this.liked))
                }, 300)
                // METHOD JSON SUR ARRAY LIKED
            })
        },
        addToCart(product) {
            // CHECK IS PRODUIT DEJA DANS ARRAY LIKED
            for (let i = 0; i < this.cart.length; i++) {
                // SI ID PRODUIT DEJA DANS CART
                if (this.cart[i].id === product.id) {
                    return this.cart[i].quantity++
                }
            }
            this.cart.push({
                id: product.id,
                img: product.img,
                description: product.description,
                price: product.price,
                // QUANTITY : 1 SERA AMENE A ETRE INCREMENTE
                quantity: 1,

            })
        },
        cartPlusOne(product) {
            product.quantity = product.quantity + 1
        },
        // ID RECUPERE AU CLIC QU'ON VA TRANSMETTRE A CARTREMOVEITEM 
        cartMinusOne(product, id) {
            // DONC SI QQT = 1 PROCHAIN CLIC SERA LA SUPPRESSION  
            if (product.quantity == 1) {
                this.cartRemoveItem(id)
            } else {
                product.quantity = product.quantity - 1
            }
        },
        cartRemoveItem(id) {
            // METHOD VUE, PREMIER PARAM LA OU ON VEUT DELETE ET DEUXIEME PARAM L'ID QU'ON VEUT DELETE
            this.$delete(this.cart, id)
        }
    },
    // AU CHARGEMENT LES COOKIE SONT INJECTE DANS ARRAY LIKED
    mounted: () => {
        this.getLikeCookie
    }
}

const UserSettings = {
    template: '<h1>UserSettings</h1>',
    name: 'User Settings'
}

const WishList = {
    template: '<h1>WishList</h1>',
    name: 'WishList'
}

const ShoppingCart = {
    template: '<h1>ShoppingCart</h1>',
    name: 'Shopping Cart'
}

// ROUTER
const router = new VueRouter({
    routes: [
        { path: '/', component: Home, name: 'Home' },
        { path: '/user-settings', component: UserSettings, name: 'UserSettings' },
        { path: '/wish-list', component: WishList, name: 'WishList' },
        { path: '/shopping-cart', component: ShoppingCart, name: 'ShoppingCart' },
    ]
})

const vue = new Vue({
    router
}).$mount('#app');