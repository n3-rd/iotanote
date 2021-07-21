<template>
  <q-page class="">

    <!-- <WriteDialog :alert="false"/> -->
  

 <div>
        <q-dialog v-model="inputDialog">
      <q-card class="dialog-card">
        <!-- <q-card-section>
          <div class="text-h6">inputDialog</div>
        </q-card-section> -->

        <q-input v-model="inputText" label="Input your text" type="textarea" class="q-px-md q-py-sm"
        standout="text-indigo"
         filled/>

        <!-- <q-card-actions align="right"> -->
          <q-btn flat label="OK"
          class="input-text-button bg-indigo q-px-sm q-py-sm q-my-lg"
          @click="pushNote(inputText)"
           v-close-popup />
        <!-- </q-card-actions> -->
      </q-card>
    </q-dialog>
    </div>

<q-btn class="q-btn--round bg-indigo fixed-bottom-right q-mr-lg q-mb-lg q-pa-sm"
@click="inputDialog = true"
 icon="create"></q-btn>

<!-- <div v-for="notes in noteList" :key="notes.age">
<div>{{notes.name}}</div> <button @click="deleteNote(notes)">delete note</button>
</div> -->


<q-list>
   <div v-for="notes in noteList" :key="notes.age">
      <q-item>
        <q-item-section>
          <q-item-label>Single line item</q-item-label>
          <q-item-label class="ellipsis-2-lines">{{notes.name}}.</q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="delete" color="red" @click="deleteNote(notes)" />
        </q-item-section>
      

      </q-item>
      <q-separator spaced inset />
   </div>

 </q-list>

  </q-page>
</template>

<script>
// import WriteDialog from 'components/WriteDialog'
// var noteList;
export default {
  name: 'PageIndex',
  data(){
    return{
inputDialog : false,
inputText : '',
noteList: [

],
tempNotes: [
 
]
    }
    
  },
  components: {
    // WriteDialog

  },
  methods: {
   pushNote : function(note){
this.noteList.push(
  {name: note}
)
this.storeNewNote()
this.clearInputText()

// this.logStored()
   },

deleteNote: function(deletedNote){
  console.log(this.noteList.indexOf(deletedNote))
  var noteDeleteRange = this.noteList.indexOf(deletedNote)
  this.noteList.splice(noteDeleteRange, 1)
  this.storeNewNote()
  this.updateNotes()
},
clearInputText: function(){
this.inputText = ''
},
storeNewNote: function(){
  localStorage.setItem('storedNotes', JSON.stringify(this.noteList))
},
updateNotes: function(){
  this.noteList = JSON.parse(localStorage.getItem('storedNotes'))
 
}

  },
  created(){

  this.updateNotes()
  },
  updated(){
    
    // window.noteList = this.noteList;

  }

  

}
</script>
