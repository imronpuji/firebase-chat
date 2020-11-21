import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);



export default new Vuex.Store({
    state : {
        test : 'test',
        user : [],
        client : [],
        chat : [],
    },
    
    actions : {
    
    },
    
    mutations : {
        newChat(state, val){
            state.chat[0].push(val)
            console.log(val)
        },
        chat (state, val){
            state.chat = [] 
            state.chat.push(val)
            console.log(state.chat[0])
        }
    }
})