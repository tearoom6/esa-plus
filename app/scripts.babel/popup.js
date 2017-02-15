'use strict'

const defaultColor = 'ffffff'
const app = new Vue({
  el: '#app',
  data: {
    locales: {
      appTitle:   chrome.i18n.getMessage('appName'),
      addTeam:    chrome.i18n.getMessage('button_addTeam'),
      removeTeam: chrome.i18n.getMessage('button_removeTeam'),
    },
    teamName: '',
    teamColor: defaultColor,
    teams: [
    ]
  },
  created: function() {
    chrome.storage.sync.get('teams', (items) => {
      if (items && items.teams) {
        this.teams = JSON.parse(items.teams)
      }
    })
  },
  methods: {
    addTeam: function() {
      let teamName = this.teamName.trim()
      let teamColor = this.teamColor.trim()
      if (teamName && teamColor) {
        this.teams.push({
          teamName: teamName,
          teamColor: `#${teamColor}`,
        })
        chrome.storage.sync.set({'teams': JSON.stringify(this.teams)})

        this.teamName = ''
        this.teamColor = defaultColor
      }
    },
    removeTeam: function(index) {
      this.teams.splice(index, 1)
      chrome.storage.sync.set({'teams': JSON.stringify(this.teams)})
    }
  }
})
