import { TextReplacement, getStoredReplacements } from "../utils/storage";

// content script

// Base of a recursive function
// Checks every text node for the replacable text and changes it
function replaceGlobal(node: Node) {
    getStoredReplacements().then((replacements) => {
        replacements.forEach((replacement) => {
            if ( replacement.active ) {
                replaceTextNodes(node, replacement)
            }
        })
    })
  }
// Recurssive portion - loops through each text node and does the replacement
function replaceTextNodes(node: Node, replacement : TextReplacement) {
    if (node.nodeType === Node.TEXT_NODE) {
        if (node.nodeValue) {
          node.nodeValue = node.nodeValue.replace(new RegExp(replacement.from, 'gi'), replacement.to);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
    
        // Replace text in links (anchor elements)
        if (element.tagName === 'A' || element.tagName === 'a') {
          if (element.textContent) {
            element.textContent = element.textContent.replace(new RegExp(replacement.from, 'gi'), replacement.to);
          }
        }
    
        // Replace text in buttons
        if (element.tagName === 'BUTTON' || element.tagName === 'button') {
          if (element.textContent) {
            element.textContent = element.textContent.replace(new RegExp(replacement.from, 'gi'), replacement.to);
          }
        }
    
        // Recursively process child nodes
        for (const childNode of Array.from(element.childNodes)) {
          replaceTextNodes(childNode as Node, replacement);
        }
      }
  }

// Replace the word when the page is loaded
replaceGlobal(document.body);

// Observe changes in the DOM and replace the word dynamically
const observer = new MutationObserver(mutations => {
mutations.forEach(mutation => {
    replaceGlobal(mutation.target);
});
});

observer.observe(document.body, {
childList: true,
subtree: true
});