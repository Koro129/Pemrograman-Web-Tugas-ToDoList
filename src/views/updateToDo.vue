<template>
  <div class="about">
    <h2 v-show="updated">Data has been updated</h2>
    <input type="text" ref="taskUp" v-model="this.toDos.find(d => d.id == this.id).task">
    <input type="checkbox" ref="cat1" :checked="this.toDos.find(d => d.id == this.id).cat1"> <label> Category 1 </label>
    <input type="checkbox" ref="cat2" :checked="this.toDos.find(d => d.id == this.id).cat2"> <label> Category 2 </label>
    <input type="checkbox" ref="cat3" :checked="this.toDos.find(d => d.id == this.id).cat3"> <label> Category 3 </label>
    <button @click="updateTask()"> Update </button>
    <button @click="$router.go(-1)"> Back </button> 
  </div>
</template>

<script>
import { initializeApp } from "firebase/app"
import { getFirestore, collection, updateDoc, getDocs, doc } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBP9iqUpns3UFn17tytAFUa6qpQxSLjrhw",
  authDomain: "tesvue-8b95c.firebaseapp.com",
  projectId: "tesvue-8b95c",
  storageBucket: "tesvue-8b95c.appspot.com",
  messagingSenderId: "314403062989",
  appId: "1:314403062989:web:e8e3e5cf04d26da0c79584"
};

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export default {
  data() {
    return {
      updated: false,
      id:this.$route.params.id,
      toDos: []
    }
  },
  methods: {
    async updateTask(){
      const docUp = doc(db, "toDo", this.id)
      await updateDoc(docUp, {
        task: this.$refs.taskUp.value,
        cat1: this.$refs.cat1.checked ? true : false,
        cat2: this.$refs.cat2.checked ? true : false,
        cat3: this.$refs.cat3.checked ? true : false})
      this.updated = true
    },
    async load(){
        try {
          const querySnapshot = await getDocs(collection(db, "toDo"))
          this.toDos = []
          querySnapshot.forEach((doc) => {
            console.log(doc.data())
            this.toDos.push(doc.data())
          })
          console.log(this.toDos.find(d => d.id == this.id))
        }
        catch(err){
          console.log(err.message)
        }
    }
  },
  created(){
    this.load()
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>