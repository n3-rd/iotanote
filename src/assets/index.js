import { date } from "quasar";
import { exportFile } from "quasar";
import { copyToClipboard } from "quasar";
import { uid } from "quasar";
import NotePopup from 'components/NotePopup'

export default {
    name: "PageIndex",
    data() {
      return {
        inputDialog: false,
        inputText: "",
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
  
        if (this.inputText != "") {
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
        }
  
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
      downloadNote: function(fileName, text) {
        var file = exportFile(fileName, text);
        if (file === true) {
          this.$q.notify({
            message: "File will start to download"
          });
        } else {
          this.$q.notify({
            message: "Error downloading file"
          });
        }
      },
      copyNoteToClipboard: function(text) {
        copyToClipboard(text)
          .then(() => {
            this.$q.notify({
              message: "Text copied successfully"
            });
          })
          .catch(() => {
            this.$q.notify({
              message: "Error while copying text"
            });
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

  