'use strict'

const options = new Vue({
  el: '#options',
  data: {
    locales: {
      appTitle:            chrome.i18n.getMessage('appName'),
      save:                chrome.i18n.getMessage('button_save'),
      strokeOnDoneTasks:   chrome.i18n.getMessage('label_strokeOnDoneTasks'),
      replaceFindShortcut: chrome.i18n.getMessage('label_replaceFindShortcut'),
    },
    strokeOnDoneTasks:   false,
    replaceFindShortcut: false,
  },
  created: function() {
    chrome.storage.sync.get({
      'optionStrokeOnDoneTasks':   true,
      'optionReplaceFindShortcut': true,
    }, (items) => {
      if (items.optionStrokeOnDoneTasks) {
        this.strokeOnDoneTasks = true
      }
      if (items.optionReplaceFindShortcut) {
        this.replaceFindShortcut = true
      }
    })
  },
  methods: {
    saveOptions: function() {
      chrome.storage.sync.set({'optionStrokeOnDoneTasks': this.strokeOnDoneTasks})
      chrome.storage.sync.set({'optionReplaceFindShortcut': this.replaceFindShortcut})
    }
  }
})
