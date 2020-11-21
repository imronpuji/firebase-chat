import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
Vue.config.productionTip = false

import firebase from 'firebase';
require('firebase/firestore');


const firebaseConfig = {
 
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
