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

/*
 * Replace shortcut key
 */
const replaceShortcutKey = () => {
  chrome.storage.sync.get({'optionReplaceFindShortcut': true}, (items) => {
    document.addEventListener('keydown', (e) => {
      // Replace [Cmd-f].
      if (items.optionReplaceFindShortcut && e.metaKey && e.which == 70) {
        const searchBox = document.getElementById('search_input')
        if (searchBox) {
          searchBox.focus()
          e.stopPropagation()
          e.preventDefault()
        }
      }
    })
  })
}

/*
 * Switch to WYSIWYG editor
 */
const switchToWysiwygEditor = () => {
  chrome.storage.sync.get({'optionSwitchToWysiwygEditor': true}, (items) => {
    if (! items.optionSwitchToWysiwygEditor) {
      return
    }
    const editorBody = document.getElementById('post_body_md')
    if (editorBody) {
      const simplemde = new SimpleMDE({ element: editorBody })
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
replaceShortcutKey()
switchToWysiwygEditor()

