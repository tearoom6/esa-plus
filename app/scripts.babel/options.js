'use strict'

const options = new Vue({
  el: '#options',
  data: {
    locales: {
      appTitle:          chrome.i18n.getMessage('appName'),
      save:              chrome.i18n.getMessage('button_save'),
      strokeOnDoneTasks: chrome.i18n.getMessage('label_strokeOnDoneTasks'),
    },
    strokeOnDoneTasks: false
  },
  created: function() {
    chrome.storage.sync.get({'optionStrokeOnDoneTasks': true}, (items) => {
      if (items.optionStrokeOnDoneTasks) {
        this.strokeOnDoneTasks = true
      }
    })
  },
  methods: {
    saveOptions: function() {
      chrome.storage.sync.set({'optionStrokeOnDoneTasks': this.strokeOnDoneTasks})
    }
  }
})
