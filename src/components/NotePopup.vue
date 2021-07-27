<template>
  <div>
    <q-card class="bg-primary text-white fullscreen z-max scroll">
      <q-header>
        <q-bar class="q-py-lg">
          <q-space />

          <q-btn
            dense
            flat
            icon="file_download"
            class="q-px-sm"
            size="sm"
            @click="downloadNote(title, noteText)"
          >
            <q-tooltip class="bg-white text-primary"
              >Download txt file</q-tooltip
            >
          </q-btn>

          <q-btn
            dense
            flat
            icon="content_copy"
            class="q-px-sm"
            size="sm"
            @click="copyNoteToClipboard(noteText)"
          >
            <q-tooltip class="bg-white text-primary">Copy text</q-tooltip>
          </q-btn>
          <q-btn
            dense
            flat
            icon="close"
            class="q-px-sm"
            size="sm"
            v-close-popup
          >
            <q-tooltip class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-bar>
      </q-header>

      <q-card-section class="q-pt-xl">
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section
        class="overflow-hidden scroll-y text-body1 white-space-default"
      >
        {{ noteText }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { copyToClipboard } from "quasar";
import { exportFile } from "quasar";

export default {
  name: "notePopup",
  props: ["noteText", "title"],
  methods: {
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
    downloadNote: function(fileName, text) {
      var file = exportFile(fileName + ".txt", text);
      if (file === true) {
        this.$q.notify({
          message: "File will start to download"
        });
      } else {
        this.$q.notify({
          message: "Error downloading file"
        });
      }
    }
  }
};
</script>
