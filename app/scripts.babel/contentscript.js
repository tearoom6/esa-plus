'use strict'

/*
 * Switch header bg color.
 */
const setTeamColor = (teamName) => {
  chrome.storage.sync.get('teams', (items) => {
    const headers = document.getElementsByTagName('header')
    if (! items || ! items.teams || ! headers || headers.length <= 0) {
      return
    }
    const teams = JSON.parse(items.teams)
    for (const team of teams) {
      if (team.teamName == teamName) {
        headers[0].style.backgroundColor = team.teamColor
        break
      }
    }
	})
}

const bindings = document.querySelectorAll('[data-team-name]')
if (bindings && bindings.length > 0) {
  // Get attribute value of "[data-team-name]".
  const teamName = bindings[0].dataset.teamName
  setTeamColor(teamName)
}

