import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
Vue.config.productionTip = false

import firebase from 'firebase';
require('firebase/firestore');


const firebaseConfig = {
  apiKey: "AIzaSyBXH7J69ze3HQSgvoYGWN8hZL1RjA7GpHc",
  authDomain: "getbar-26a78.firebaseapp.com",
  databaseURL: "https://getbar-26a78.firebaseio.com",
  projectId: "getbar-26a78",
  storageBucket: "getbar-26a78.appspot.com",
  messagingSenderId: "644089455457",
  appId: "1:644089455457:web:72e4763cf2dd32ab9a5b20",
  measurementId: "G-7BTDDZGHBL"
};

firebase.initializeApp(firebaseConfig)


Vue.prototype.$firebase = firebase;

const data = localStorage.getItem('data')
const user = JSON.parse(data)
if(user){
firebase.firestore().collectionGroup('messages').where('penerima', '==', `${user.user.uid}`).onSnapshot({
  // Listen for document metadata changes
}, function (doc) {
  doc.docChanges().forEach((val) => {
     
     store.commit('newChat', val.doc.data())
  })
  
});
}
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
