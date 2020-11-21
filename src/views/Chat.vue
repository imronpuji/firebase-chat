<template>
<div>
    <h1>chat</h1>
    <button @click="logout">logout</button>

    <div class="card" v-for="data in users" :key="data.uid" style="position:relative; top:100px;">
        <img style="border-radius:100px" src="https://ui-avatars.com/api/?background=random" alt="">
        <h2>{{data.nama}}</h2>
        <p>{{data.email}}</p>
        <button style="position:absolute; top:40%;" @click="buatObrolan(data.uid, data.nama)">Buat Obrolan</button>
        <hr>
    </div>
    <div class="obrolan" style="overflow:scroll;border:2px solid rgba(100, 100, 100, 0.3); width:500px; background:#fff2f5; float:right; height:400px; position:relative; top:-300px">
        <h1 style="margin:20px">{{client.nama}}</h1>
        <p style="margin:20px">{{client.uid}}</p>

        <ul v-for="dataChat in $store.state.chat[0]" :key="dataChat.uid">
            <li v-if="dataChat.penerima == client.uid" style="position:relative; text-align:right; left:230px; width:200px; display:block; ">
                {{dataChat.pesan}}
            </li>
            
             <li v-else style="position:relative; right:0">
                {{dataChat.pesan}}
            </li>
 
        </ul>

        <input v-model="pesan" style="float:left;position:fixed; bottom:0; height:30px" type="text" placeholder="tulis sesuatu">
        <button @click="kirimPesan" style="float:right; position:fixed; bottom:0; right:0">Kirim Pesan</button>
    </div>
</div>
</template>

<script>
export default {

    data() {
        return {
            users: [],
            client: [],
            pesan: '',
            lastChat: []
        }
    },
    


  
    mounted() {



        // this.$firebase.auth().onAuthStateChanged(user => {
        //     if(user){
        //     } else {

        //     }
        // })
        const db = this.$firebase.firestore();
        db
            .collection('test')
            .add({
                nama: 'imron'
            })
            .then(() => {})
            .catch(() => this.$router.replace({
                path: '/login'
            }))

        db.collection('users').get().then((data) => {
            const pushUserData = []
            data.forEach(val => {
                pushUserData.push(val.data())
            })
            this.users = pushUserData
        })
    },

    methods: {
        logout() {
            this.$firebase.auth().signOut()
            this.$router.replace({
                path: '/login'
            })
        },
        
        test(val){
            console.log(val)        
        },

        buatObrolan(uid, nama) {
                    console.log(this.$store.state.test)

            this.lastChat = []
            const data = localStorage.getItem('data')
            const user = JSON.parse(data)

            this.client = {
                uid,
                nama
            }

            // this.$firebase.firestore().collection('chat').doc(user.user.uid + this.client.uid).collection('chat')
            // .get()
            // .then((doc) => {
            // const pushLastChat = []
            //      if (doc.exists) {
            //         console.log("Document data:", doc.data());
            //         pushLastChat.push(doc.data())
            //     } else {
            //         // doc.data() will be undefined in this case
            //         console.log("No such document!");
            //     }
            //      this.lastChat = pushLastChat

            // })
            var citiesRef = this.$firebase.firestore().collection('chat');
            const pushLastChat = []
            var uidChat = user.user.uid < this.client.uid ? user.user.uid + this.client.uid : this.client.uid + user.user.uid
            Promise.all([
                citiesRef.doc(uidChat).collection('messages').get().then(res => {
                    res.forEach((doc) => {
                        pushLastChat.push(doc.data())
                        this.$store.commit('chat', pushLastChat)
                    })
                })
            ])

            
                this.$firebase.firestore().collection('chat').doc(uidChat).collection('messages').doc('createRoom').set({room:'created'})
                .then(() => {
                   
                })
                .catch(err => err)

        },

        kirimPesan() {

            const pesan = this.pesan

            //     pesan.push({...this.client['pesan']})

            const data = localStorage.getItem('data')
            const user = JSON.parse(data)

            this.lastChat.push({
                pesan: this.pesan,
                pengirim: user.user.displayName
            })
            var uidChat = user.user.uid < this.client.uid ? user.user.uid + this.client.uid : this.client.uid + user.user.uid

            this.$firebase.firestore().collection('chat').doc(uidChat).collection('messages').add({
                    pesan,
                    pengirim: user.user.uid,
                    penerima : this.client.uid,
                    nama_pengirim : user.user.displayName,
                    created : this.$firebase.database.ServerValue.TIMESTAMP 
            
                })
                .then(() => {
                    this.$store.commit('newChat', {pesan,pengirim: user.user.uid,
                    penerima : this.client.uid, nama_pengirim : user.user.displayName})
                })
                .catch(err => err)

        }
    }
}
</script>
