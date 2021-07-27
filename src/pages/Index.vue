<template>
  <q-page class="">
    <div>
      <q-banner class="bg-warning">
        This App is currently under development, features are currently limited
      </q-banner>
    </div>
    <!-- <WriteDialog :alert="false"/> -->

    <div>
      <q-dialog
        v-model="inputDialog"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card class="dialog-card">
          <q-input
            v-model="inputText"
            
            type="textarea"
            class="q-px-md q-py-sm"
            standout="text-indigo"
            filled
            :input-style="{height: '60vh!important' }"
            @keyup.enter.shift="pushNote(inputText)"
          />
          <div class="desktop-only q-pl-md">
            use <code class="bg-grey-12">Shift + Enter</code> to make entry
          </div>
          <!-- <q-card-actions align="right"> -->
          <q-btn
            flat
            label="Create Note"
            text-color="grey-1"
            class="input-text-button bg-indigo q-px-sm q-py-sm q-my-lg"
            @click="pushNote(inputText)"
            v-close-popup
          />
          <!-- </q-card-actions> -->
        </q-card>
      </q-dialog>
    </div>

    <q-btn
      class="q-btn--round bg-indigo text-grey-1 fixed-bottom-right q-mr-lg q-mb-lg q-pa-sm create-button"
      @click="inputDialog = true"
      icon="create"
    ></q-btn>

    <q-dialog
      v-model="editDialog"
      persistent
      maximized
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card class="bg-primary text-white">
        <q-bar>
          <q-space />

          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>

          <q-btn dense flat icon="check" v-close-popup @click="saveEditNote()">
            <q-tooltip class="bg-white text-primary">Done</q-tooltip>
          </q-btn>
        </q-bar>

        <q-card-section>
          <div class="text-h6">Edit Note</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            v-model="tempEditNote"
            filled
            :input-style="{ color: '#ffffff', height: '80vh!important' }"
            type="textarea"
          />
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-list>
      <div v-for="notes in noteList" :key="notes.age">
        <q-item>
          <q-item-section>
            <q-item-label class="text-h6">{{ notes.title }}</q-item-label>
            <q-item-label class="ellipsis-2-lines"
              >{{ notes.noteText }}.</q-item-label
            >
            <q-popup-proxy
              transition-show="slide-up"
              transition-hide="slide-down"
            >
              <NotePopup :title="notes.title" :noteText="notes.noteText" />
            </q-popup-proxy>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{ notes.date }}</q-item-label>
            <q-item-label caption>{{ notes.time }}</q-item-label>
            <span>
              <!-- <q-icon
                name="file_download"
                class="inline q-px-sm text-h6"
                color="green"
                @click="downloadNote(notes.title, notes.noteText)"
              /> -->
              <q-icon
                name="create"
                class="inline q-px-sm text-h6"
                color="indigo"
                @click="editNote(notes)"
              />
              <q-icon
                name="delete"
                class="inline q-px-sm text-h6"
                color="red"
                
              >
              <q-popup-proxy>
 <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="delete" color="indigo" text-color="white" />
          <span class="q-ml-sm">Are you sure you want to delete this note?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="indigo" v-close-popup />
          <q-btn flat label="Delete" color="negative" @click="deleteNote(notes)" v-close-popup />
        </q-card-actions>
      </q-card>
              </q-popup-proxy>
              </q-icon>
            </span>
          </q-item-section>
        </q-item>

        <q-separator spaced inset />
      </div>
    </q-list>
  </q-page>
</template>

<script>
import { date } from "quasar";
import { uid } from "quasar";
import NotePopup from "components/NotePopup";

export default {
  name: "PageIndex",
  data() {
    return {
      inputDialog: false,
      editDialog: false,
      inputText: "",
      tempEditNote: "",
      tempNoteIndex: "",
      noteList: [],
      timeStamp: Date.now(),
      dateFormats: {
        days: [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday" /* and all the rest of days - remember starting with Sunday */
        ],
        daysShort: [
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thur",
          "Fri",
          "Sat" /* and all the rest of days - remember starting with Sunday */
        ],
        months: [
          "January",
          "Feburary",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December" /* and all the rest of months */
        ],
        monthsShort: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sept",
          "Oct",
          "Nov",
          "Dec" /* and all the rest of months */
        ]
      }
    };
  },
  components: {
    // WriteDialog
    NotePopup
  },
  methods: {
    pushNote: function(note) {
      var noteDay = date.formatDate(this.timeStamp, "DD", this.dateFormats);
      var noteMonth = date.formatDate(this.timeStamp, "MMM", this.dateFormats);
      var noteYear = date.formatDate(this.timeStamp, "YYYY", this.dateFormats);
      var noteTimeOfDay = date.formatDate(
        this.timeStamp,
        "a",
        this.dateFormats
      );
      var today = new Date();
      var time = `${today.getHours()} : ${today.getMinutes()} ${noteTimeOfDay}`;

      if (this.inputText != "" && this.inputText != "\n") {
        this.noteList.unshift({
          noteText: note,
          date: `${noteDay} ${noteMonth} ${noteYear}`,
          time: time,
          title: `${this.inputText.substr(0, 10)}....`,
          id: uid()
        });
        this.storeNewNote();
        this.clearInputText();
      } else {
        this.$q.notify({
          message: "Please write some content"
        });
        this.clearInputText();

      }
      this.inputDialog = false;
      // this.logStored()
    },

    deleteNote: function(deletedNote) {
      console.log(this.noteList.indexOf(deletedNote));
      var noteDeleteRange = this.noteList.indexOf(deletedNote);
      this.noteList.splice(noteDeleteRange, 1);
      this.storeNewNote();
      this.updateNotes();
      this.$q.notify({
        message: "Note deleted"
      });
    },
    editNote: function(note) {
      console.log(this.noteList.indexOf(note));
      var noteIndex = this.noteList.indexOf(note);
      console.log(this.noteList[noteIndex].noteText);
      var tempNoteText = this.noteList[noteIndex].noteText;
      this.editDialog = true;
      this.tempNoteIndex = noteIndex;
      this.tempEditNote = tempNoteText;
    },
    saveEditNote: function() {
      var noteIndex = this.tempNoteIndex;
      var tempEditNote = this.tempEditNote;
      var tempEditNoteTitle = `${this.tempEditNote.substr(0, 10)}...`;
      this.noteList[noteIndex].noteText = tempEditNote;
      this.noteList[noteIndex].title = tempEditNoteTitle;
      this.storeNewNote();
      this.updateNotes();
      this.tempEditNote = "";
      this.$q.notify({
        message: "Note updated"
      });
    },
    clearInputText: function() {
      this.inputText = "";
    },
    storeNewNote: function() {
      localStorage.setItem("storedNotes", JSON.stringify(this.noteList));
    },
    updateNotes: function() {
      this.noteList = JSON.parse(localStorage.getItem("storedNotes"));
    },
    createWelcomeNote: function() {
      if (!localStorage.getItem("storedNotes")) {
        localStorage.setItem(
          "storedNotes",
          JSON.stringify([
            {
              title: "Welcome to Scrapnote!",
              noteText: "Click the write button to create a new note"
            }
          ])
        );
        this.updateNotes();
      } else {
        this.updateNotes();
      }
    }
  },
  created() {
    this.createWelcomeNote();
    this.$q.addressbarColor.set("#a2e3fa");
  },
  updated() {
    // window.noteList = this.noteList;
  }
};
</script>
