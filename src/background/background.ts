import { getStoredReplacements, setStoredOptions, setStoredReplacements } from "../utils/storage"

// background script
chrome.runtime.onInstalled.addListener(() => {
  // Set up storage
  setStoredReplacements([])
  setStoredOptions({
    enabled: true
  })

  // Context menu option to quick add to list
  chrome.contextMenus.create({
    contexts: ['selection'],
    title: 'Add to Text Replacement extension',
    id: 'textReplacement',
  })
})

chrome.contextMenus.onClicked.addListener((event) => {
  getStoredReplacements().then((replacements) => {
    setStoredReplacements([...replacements, {
      from: event.selectionText,
      to: "",
      active: true
    }])
  })
})
