'use strict'

const options = new Vue({
  el: '#options',
  data: {
    locales: {
      appTitle:              chrome.i18n.getMessage('appName'),
      save:                  chrome.i18n.getMessage('button_save'),
      strokeOnDoneTasks:     chrome.i18n.getMessage('label_strokeOnDoneTasks'),
      replaceFindShortcut:   chrome.i18n.getMessage('label_replaceFindShortcut'),
      switchToWysiwygEditor: chrome.i18n.getMessage('label_switchToWysiwygEditor'),
    },
    strokeOnDoneTasks:     false,
    replaceFindShortcut:   false,
    switchToWysiwygEditor: false,
  },
  created: function() {
    chrome.storage.sync.get({
      'optionStrokeOnDoneTasks':     true,
      'optionReplaceFindShortcut':   true,
      'optionSwitchToWysiwygEditor': true,
    }, (items) => {
      if (items.optionStrokeOnDoneTasks) {
        this.strokeOnDoneTasks = true
      }
      if (items.optionReplaceFindShortcut) {
        this.replaceFindShortcut = true
      }
      if (items.optionSwitchToWysiwygEditor) {
        this.switchToWysiwygEditor = true
      }
    })
  },
  methods: {
    saveOptions: function() {
      chrome.storage.sync.set({'optionStrokeOnDoneTasks': this.strokeOnDoneTasks})
      chrome.storage.sync.set({'optionReplaceFindShortcut': this.replaceFindShortcut})
      chrome.storage.sync.set({'optionSwitchToWysiwygEditor': this.switchToWysiwygEditor})
    }
  }
})
