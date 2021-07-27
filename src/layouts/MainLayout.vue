<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated class="bg-indigo">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Iotanote
        </q-toolbar-title>

        
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

<div class="fixed-bottom-left q-pl-md">Made with 
  <q-icon
                name="favorite"
                class="inline q-px-sm text-h6"
                color="indigo"
              />
              by <a href="https://n3-rd.github.io">N3rd </a>
              </div>

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksData = [
 
  {
    title: 'Github',
    caption: 'github.com/n3-rd',
    icon: 'code',
    link: 'https://github.com/n3-rd/iotanote'
  },

    {
    title: 'My Portfolio',
    caption: 'n3-rd.github.io',
    icon: 'public',
    link: 'https://n3-rd.github.io'
  },
 
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData
    }
  }
}
</script>
