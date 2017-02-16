'use strict'

/*
 * Switch header bg color.
 */
const setTeamColor = (teamName) => {
  chrome.storage.sync.get('teams', (items) => {
    const headers = document.getElementsByTagName('header')
    if (! items.teams || ! headers || headers.length <= 0) {
      return
    }
    const teams = JSON.parse(items.teams)
    for (const team of teams) {
      if (team.teamName == teamName) {
        Velocity(headers[0], {
          backgroundColor: team.teamColor
        }, 1000)
        break
      }
    }
  })
}

/*
 * Add stroke to done tasks
 */
const addStrokeToDoneTasks = () => {
  chrome.storage.sync.get({'optionStrokeOnDoneTasks': true}, (items) => {
    if (! items.optionStrokeOnDoneTasks) {
      return
    }
    const taskCheckboxes = document.getElementsByClassName('task-list-item-checkbox')
    if (! taskCheckboxes) {
      return
    }
    for (const taskCheckbox of taskCheckboxes) {
      const textNode = taskCheckbox.nextSibling
      if (textNode && taskCheckbox.checked) {
        const newNode = document.createElement('span')
        newNode.setAttribute('style', 'text-decoration: line-through;')
        const newTextNode = document.createTextNode(textNode.textContent)
        newNode.appendChild(newTextNode)
        taskCheckbox.parentNode.replaceChild(newNode, textNode)
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
addStrokeToDoneTasks()

