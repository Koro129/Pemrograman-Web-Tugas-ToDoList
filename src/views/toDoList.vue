<template>
  <div class="toDo">
    <form @submit.prevent="addTask">
      <input type="text" v-model="this.task" required> 
      <input type="checkbox" ref="cat1"> <label> Category 1 </label>
      <input type="checkbox" ref="cat2"> <label> Category 2 </label>
      <input type="checkbox" ref="cat3"> <label> Category 3 </label>
      <button type="submit"> Add </button>
    </form>
    <div>
      <button @click="this.show = 'all'"> All </button>
      <button @click="this.show = 'cat1'"> Category 1 </button>
      <button @click="this.show = 'cat2'"> Category 2 </button>
      <button @click="this.show = 'cat3'"> Category 3 </button>
      <button @click="this.show = 'clear'"> Cleared </button>
      <button @click="this.show = 'unclear'"> Unclear </button>
      <ul>
        <li v-for="(toDo, i) in show" :key="i">
          <RouterLink :to="{'name':'update','params':{'id':toDo.id}}"> {{toDo.task}} </RouterLink> <input @click="updateClear(toDo.id, toDo.clear)" type="checkbox" :checked="toDo.clear"> <button @click="dele(toDo.id)"> delete </button>
          <p>
            <span v-if="toDo.cat1">Category 1 </span>
            <span v-if="toDo.cat2">Category 2 </span>
            <span v-if="toDo.cat3">Category 3 </span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { initializeApp } from "firebase/app"
import { getFirestore, collection, updateDoc, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore"

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

export default{
  data() {
    return {
      task: "",
      show: "all",
      toDos: []
    }
  },
  methods: {
    async addTask() {
      try {
        const docRef = await addDoc(collection(db, "toDo"),{
          id: "",
          task: this.task,
          cat1: this.$refs.cat1.checked ? true : false,
          cat2: this.$refs.cat2.checked ? true : false,
          cat3: this.$refs.cat3.checked ? true : false,
          clear: false
        })
        const docUp = doc(db, "toDo", docRef.id)
        await updateDoc(docUp, {id: docRef.id})
        console.log("Berhasil menambahkan ", docRef.id)
        this.load()
      }
      catch(e) {
        console.log("Gagal menambahkan ", e)
      }
    },
    async updateClear(id, cleared){
      const docUp = doc(db, "toDo", id)
      await updateDoc(docUp, {clear: !cleared})
      this.load()
    },
    async dele(id){
      try{
        await deleteDoc(doc(db, "toDo", id));
        console.log("Berhasil menghapus", id)
        this.load()
      }
      catch(e) {
        console.log("Gagal menghapus ", e)
      }
    },
    async load(){
      try {
        const querySnapshot = await getDocs(collection(db, "toDo"))
        this.toDos = []
        querySnapshot.forEach((doc) => {
          console.log(doc.data())
          this.toDos.push(doc.data())
        })
      }
      catch(err){
        console.log(err.message)
      }
    }
  },
  computed: {
    show(){
      if(this.show != 'all'){
        if(this.show == 'clear') return this.toDos.filter((toDo) => toDo.clear == true)
        else if(this.show == 'unclear') return this.toDos.filter((toDo) => toDo.clear == false)
        else if(this.show == 'cat1') return this.toDos.filter((toDo) => toDo.cat1 == true)
        else if(this.show == 'cat2') return this.toDos.filter((toDo) => toDo.cat2 == true)
        else return this.toDos.filter((toDo) => toDo.cat3 == true)
      }
      else return this.toDos
    },
  },
  mounted(){
    this.load()
  }
}
</script>


<style>
.toDO {
  display: flex;
  padding: 10px;
  align-items: center;
}
</style>
