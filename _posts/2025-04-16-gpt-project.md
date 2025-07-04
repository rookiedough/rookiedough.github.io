---
layout: none
title: MyGPT project
date: 2025-07-03 20:36 +0300
categories: [About Me]
tags: [html, project]
---

<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Chat Interface</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      display: flex;
      flex-direction: row;
      height: 100vh;
      margin: 0;
      background-color: #2e2e2e;
      color: #e0e0e0;
    }

    #main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    #sidebar {
      width: 350px;
      border-left: 1px solid #444;
      background-color: #121212;
      padding: 10px;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
    }

    #chat-history {
      flex: 1;
      margin-bottom: 10px;
      overflow-y: auto;
    }

    .chat-history-item {
      padding: 10px;
      border: 1px solid #333;
      margin-bottom: 10px;
      background-color: #121212;
      border-radius: 10px;
      border-color: #333;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
    }

    .delete-button {
      background-color: #131313;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      padding: 5px 10px;
      margin-left: 10px;
      display: none;
      position: absolute;
      right: 10px;
    }

    .chat-history-item:hover .delete-button {
      display: inline-block;
    }
/* General button styles */
#newChatButton, #openPromptbookButton {
  padding: 10px;
  background-color: #007BFF;
  color: white;
  text-align: left;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 20px;
  margin-bottom: 10px;
  border: none;
  display: inline-block;
  font-size: 14px;
  width: 20px; /* Default small width */
  height: 20px; /* Default small height */
  position: relative;
  bottom: 15px;
  line-height: 30px;
  overflow: hidden;
  transition: padding 0.3s ease;
}

/* Placeholder text displayed initially using ::before */
#openPromptbookButton::before {
  content: '🖾'; /* Placeholder text */
  visibility: visible;
  opacity: 1;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.1s ease;
  white-space: nowrap;
}

/* Placeholder text displayed initially using ::before */
#newChatButton::before{
  content: '🗪'; /* Placeholder text */
  visibility: visible;
  opacity: 1;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.1s ease;
  white-space: nowrap;
}


/* The actual text is hidden initially and displayed on hover using ::after */
#newChatButton::after, #openPromptbookButton::after {
  content: ''; /* Default empty content */
  visibility: hidden;
  opacity: 0;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transition: opacity 0.1s ease;
  white-space: nowrap;
}

/* Assign specific text to each button */
#newChatButton::after {
  content: 'New Chat'; /* Actual text */
}

#openPromptbookButton::after {
  content: 'Open Promptbook'; /* Actual text */
}

/* Hover effect to change button dimensions and reveal actual text */
#left-buttons:hover #newChatButton, 
#left-buttons:hover #openPromptbookButton {
  padding: 10px 20px;
  border-radius: 20px;
  width: 100px;
  height: 20px;
  background-color: #0056b3;
}

#left-buttons:hover #newChatButton::before, 
#left-buttons:hover #openPromptbookButton::before {
  opacity: 0; /* Hide placeholder text */
}

#left-buttons:hover #newChatButton::after, 
#left-buttons:hover #openPromptbookButton::after {
  visibility: visible;
  opacity: 1; /* Show actual text */
}



    #chat-container {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 10px;
      background-color: #121212;
      overflow-y: auto;
    }

    #input-container {
      display: flex;
      align-items: center;
      padding: 10px;
      background-color: #121212;
      position: relative; /* Positioning context for the send button */
    }

    #left-buttons {
      display: flex;
      flex-direction: column; /* Stack the buttons vertically */
      margin-right: 10px; /* Space between the buttons and the input box */
    }


    #messageInput {
      flex: 1;
      padding: 20px;
      padding-right: 60px; /* Keep padding to the right for the button */
      border: 1px solid #333;
      border-radius: 20px;
      margin-right: 20px;
      margin-bottom: 10px;
      resize: vertical;
      min-height: 80px;
      max-height: 180px;
      background-color: #1a1a1a;
      color: #e0e0e0;
    }

    /* Positioning the send button inside the message input box */
    #sendButton {
      position: absolute;
      right: 35px;
      bottom: 10px;
      margin-bottom: 10px;
      margin-right: 10px;
      background-color: transparent; /* Remove background */
      border: none; /* Remove border */
      color: #007BFF; /* Text color */
      cursor: pointer;
      font-size: 30px; /* Adjust text size */
      padding: 0; /* Remove padding */
      z-index: 2;
    }



    .message {
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 4px;
      background-color: #121212;
      color: #e0e0e0;
    }

    .loading {
      font-style: italic;
      color: #888;
    }

    pre {
      position: relative;
      padding: 15px;
      border: 1px solid #666;
      border-radius: 4px;
      background: #222;
      overflow-x: auto;
      margin: 0;
      white-space: pre-wrap;
      color: #e0e0e0;
    }

    code {
      display: block;
      line-height: 1.5;
    }

    .copy-button {
      position: absolute;
      top: 10px;
      right: 10px;
      padding: 5px;
      border: none;
      background-color: #007BFF;
      color: white;
      cursor: pointer;
      border-radius: 4px;
      font-size: 12px;
    }

    #sidebarInput {
      width: calc(100% - 20px);
      height: 20%;
      padding: 10px;
      margin-top: 10px;
      border-radius: 4px;
      border: 1px solid #333;
      background-color: #1a1a1a;
      color: #e0e0e0;
    }

    #saveButton {
      padding: 10px;
      margin-top: 10px;
      background-color: #007BFF;
      color: white;
      text-align: center;
      border-radius: 4px;
      cursor: pointer;
    }

    /* Styles for the modal */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}


#promptbookModalContent {
  background-color: #333;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 60%;
  max-height: 80%; /* Set a max height to limit the expansion */
  color: #e0e0e0;
  position: relative;
  overflow-y: auto; /* Add vertical scrolling */
}

/* Styles for the close button */
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  border: none;
  font-size: 28px;
  font-weight: bold;
  color: #aaa;
  cursor: pointer;
  transition: color 0.3s ease;
}

.close-button:hover,
.close-button:focus {
  color: #fff;
  text-decoration: none;
  cursor: pointer;
}

/* Enhance the modal content */
#promptbookModalContent {
  background-color: #292929; /* Darker background for better contrast */
  margin: 10% auto;
  padding: 20px;
  border-radius: 10px; /* Rounded corners for a softer look */
  border: none;
  width: 50%;
  max-height: 80%;
  color: #e0e0e0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Add shadow for depth */
  overflow-y: auto;
}

/* Enhance promptbook items */
.prompt-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #3a3a3a;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.prompt-item:hover {
  background-color: #4a4a4a;
}

/* Notepad name input */
.notepad-name-input {
  flex: 1;
  margin-right: 10px;
  padding: 8px;
  border: 1px solid #666;
  border-radius: 4px;
  background-color: #444;
  color: #e0e0e0;
  transition: border-color 0.3s;
}

.notepad-name-input:focus {
  border-color: #007bff;
  outline: none;
}

/* Button improvements */
.usePromptButton, .deletePromptButton {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 5px;
  transition: background-color 0.3s;
}

.usePromptButton:hover, .deletePromptButton:hover {
  background-color: #0056b3;
}

.deletePromptButton {
  background-color: #ff4b4b;
}

.deletePromptButton:hover {
  background-color: #d43f3f;
}

/* Style the close button */
.close-button {
  position: absolute;
  top: 15px;
  right: 15px;
  background-color: transparent;
  border: none;
  font-size: 24px;
  font-weight: bold;
  color: #aaa;
  transition: color 0.3s;
}

.close-button:hover {
  color: #fff;
}

/* Add hover effect to the add button */
#addPromptButton {
  background-color: #28a745;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

#addPromptButton:hover {
  background-color: #218838;
}

/* Styling the back button */
.close-button {
  background-color: white;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #333;
  margin-bottom: 20px;
}

.close-button:hover {
  color: #007BFF;
}

/* Editable title input */
#editNotepadTitle {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  background-color: #1a1a1a;
  border-radius: 5px;
  box-sizing: border-box;
  color: #e0e0e0;
}

/* Textarea styling */
#editNotepadContent {
  width: 100%;
  height: 150px;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #121212;
  background-color: #1a1a1a;
  border-radius: 5px;
  margin-bottom: 20px;
  resize: none;
  box-sizing: border-box;
  color: #e0e0e0;
}


/* Buttons styling */
button {
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Save button */
#saveEditedNotepadButton {
  background-color: #28a745;
  color: white;
  margin-right: 10px;
}

#saveEditedNotepadButton:hover {
  background-color: #218838;
}

/* Delete button */
#deleteNotepadButton {
  background-color: #dc3545;
  color: white;
}

#deleteNotepadButton:hover {
  background-color: #c82333;
}

/* Adding responsiveness */
@media (max-width: 600px) {
  .modal {
    width: 95%;
  }

  button {
    width: 100%;
    margin-bottom: 10px;
  }
}

/* Button group styling */
.button-group {
  display: flex;
  justify-content: space-between; /* Space between buttons */
  margin-top: 10px; /* Space above the button group */
}

.button-group button {
  flex: 1; /* Make buttons equal width */
  margin-right: 5px; /* Space between buttons */
}

/* Remove margin for the last button in the group */
.button-group button:last-child {
  margin-right: 0;
}
    
  </style>
</head>
<body>
  <div id="main-content">
    <div id="chat-container"></div>
    <div id="input-container">
      <div id="left-buttons">
        <div id="newChatButton"></div>
        <div id="openPromptbookButton"></div>
      </div>
      <textarea id="messageInput" placeholder="Ask me anything..."></textarea>
      <button id="sendButton">➢</button>
    </div>    
  </div>

  <div id="sidebar">
    <div id="chat-history"></div>
    <textarea type="text" id="sidebarInput" placeholder="Enter text..."></textarea>
    <button id="saveButton">Save</button>
  </div>


<!-- Main Modal for Promptbook -->
<div id="promptbookModal" class="modal">
  <button id="closePromptbook" class="close-button">&times;</button>
  <div id="promptbookModalContent">
    <h2>Promptbook</h2>
    <div id="promptbookList"></div> <!-- Displaying the notepad list -->
    <button id="addPromptButton">Add Notepad</button>
  </div>
</div>

<!-- Modal for Editing a Notepad -->
<div id="editNotepadModal" class="modal">
  <div id="promptbookModalContent">
    <input type="text" id="editNotepadTitle" placeholder="Enter title here..." /> <!-- Editable title input -->
    <textarea id="editNotepadContent" placeholder="Write your notes here..."></textarea>
    <button id="backButton">&larr; Back</button>
    <button id="saveEditedNotepadButton">Save</button>
    <button id="copyToMessageBoxButton">Copy</button>
    <button id="deleteNotepadButton">Delete</button>
  </div>
</div>


  <!-- Include Showdown and Highlight.js libraries from Cloudflare -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/showdown/1.9.1/showdown.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/highlight.min.js"></script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/default.min.css">
  <script>
    
    let chatSessions = [];
    let currentSessionIndex = -1; // Tracks the current chat session
    let promptbook = []; // Array to hold saved prompts


    // Save chat sessions to localStorage
    function saveChatSessionsToLocalStorage() {
        localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
        localStorage.setItem('currentSessionIndex', currentSessionIndex);
    }

    // Load chat sessions from localStorage
    function loadChatSessionsFromLocalStorage() {
        const sessionData = localStorage.getItem('chatSessions');
        const sessionIndex = localStorage.getItem('currentSessionIndex');

        if (sessionData) {
            chatSessions = JSON.parse(sessionData);
            currentSessionIndex = sessionIndex !== null ? parseInt(sessionIndex) : -1;
        }
    }

    function updateChatSessionTabs() {
        const chatHistoryContainer = document.getElementById('chat-history');
        chatHistoryContainer.innerHTML = ''; // Clear existing chat history

        chatSessions.forEach((session, index) => {
            const chatTab = document.createElement('div');
            chatTab.classList.add('chat-history-item');
            chatTab.innerText = session.summary || `Chat Session ${index + 1}`; // Default tab name

            // Create delete button
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('delete-button');
            deleteButton.innerText = '🗑';

            // Attach event listener to delete button
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation(); // Prevent switching to the chat session when deleting
                deleteChatSession(index);
            });

            chatTab.appendChild(deleteButton);

            // On clicking the chat tab, switch to that chat session
            chatTab.addEventListener('click', () => {
                switchChatSession(index);
            });

            chatHistoryContainer.appendChild(chatTab);
        });

        saveChatSessionsToLocalStorage(); // Save to localStorage whenever tabs are updated
    }

    function deleteChatSession(index) {
        chatSessions.splice(index, 1); // Remove the chat session from the array

        if (currentSessionIndex === index) {
            currentSessionIndex = -1; // Reset if the current session was deleted
            const chatContainer = document.getElementById('chat-container');
            chatContainer.innerHTML = ''; // Clear the chat display
        } else if (currentSessionIndex > index) {
            currentSessionIndex--; // Adjust the current session index if a previous session was deleted
        }

        updateChatSessionTabs(); // Update the sidebar
        saveChatSessionsToLocalStorage(); // Save to localStorage
    }

    function switchChatSession(index) {
        currentSessionIndex = index;
        const chatContainer = document.getElementById('chat-container');
        chatContainer.innerHTML = ''; // Clear current chat view

        const currentSession = chatSessions[currentSessionIndex];
        currentSession.messages.forEach(message => {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('message');

            // Check message type and format accordingly
            if (message.startsWith('You: ')) {
                messageDiv.innerHTML = `<strong>You:</strong><br><br>${message.substring(4).trim()}`;
            } else if (message.startsWith('API: ')) {
                messageDiv.innerHTML = `<strong>API:</strong><br><br>${message.substring(5).trim()}`;
            } else if (message.startsWith('Error: ')) {
                messageDiv.innerHTML = `<strong>Error:</strong><br><br>${message.substring(7).trim()}`;
            } else {
                messageDiv.innerHTML = message; // Default for untagged messages
            }

            chatContainer.appendChild(messageDiv);
        });
    }


    function autofillSidebarInput() {
        const sysMessageInput = document.getElementById('sidebarInput');
        if (!sysMessageInput.value.trim()) { // Check if the input is empty or only contains whitespace
            sysMessageInput.value = 'You are a helpful assistant'; // Set your default value here
        }
    }

    // Function to save the system message input from the sidebar
    function saveSystemMessage() {
        const sysMessageInput = document.getElementById('sidebarInput').value;
        localStorage.setItem('systemMessage', sysMessageInput);
        alert('System message saved!'); // Inform the user that the message was saved
    }

    // Load saved system message on page load
    function loadSystemMessage() {
        const savedMessage = localStorage.getItem('systemMessage');
        if (savedMessage) {
            document.getElementById('sidebarInput').value = savedMessage;
        }
    }

    // Helper function to convert past messages to the required format
    function getPastConversation() {
        if (currentSessionIndex === -1) return []; // No active session

        const currentSession = chatSessions[currentSessionIndex];
        const pastConvoList = [];

        currentSession.messages.forEach((message) => {
            if (message.startsWith('You: ')) {
                pastConvoList.push({ role: "user", content: message.substring(4).trim() });
            } else if (message.startsWith('API: ')) {
                pastConvoList.push({ role: "assistant", content: message.substring(5).trim() });
            }
        });

        return pastConvoList;
    }

    // Modified sendMessage function to include past conversations
    async function sendMessage() {
        autofillSidebarInput(); 
        var converter = new showdown.Converter();
        const messageInput = document.getElementById('messageInput');
        const sysMessageInput = document.getElementById('sidebarInput');
        const message = messageInput.value;
        const sys_message = sysMessageInput.value;

        if (!message.trim()) return; // Do nothing if input is empty

        const chatContainer = document.getElementById('chat-container');
        const userMessage = document.createElement('div');
        userMessage.classList.add('message');
        userMessage.innerHTML = `<strong>You:</strong><br><br>${converter.makeHtml(message)}`;
        chatContainer.appendChild(userMessage);

        // If no session is active, create a new one
        if (currentSessionIndex === -1) {
            chatSessions.push({ summary: message.substring(0, 20) + '...', messages: [] });
            currentSessionIndex = chatSessions.length - 1;
        }

        // Save user message to the current chat session
        chatSessions[currentSessionIndex].messages.push(`You: ${message}`);

        const loadingMessage = document.createElement('div');
        loadingMessage.classList.add('message', 'loading');
        loadingMessage.innerText = 'API is responding...';
        chatContainer.appendChild(loadingMessage);

        messageInput.value = '';
        chatContainer.scrollTop = chatContainer.scrollHeight;

        const pastConvoList = getPastConversation(); // Get past conversation as a list of messages

        try {
            const response = await fetch('http://localhost:7071/api/summarizer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: message, sys_prompt: sys_message, past_convo: pastConvoList })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            let data = await response.text();

            const lines = data.split('\n');
            // Extract the first line and store it
            const firstLine = lines.shift();
            chatSessions[currentSessionIndex].summary = firstLine || 'Untitled';

            // Join the remaining lines back into a single string
            data = lines.join('\n');

            const apiMessage = `<strong>API:</strong><br><br>${converter.makeHtml(data)}`;

            loadingMessage.innerHTML = apiMessage;
            loadingMessage.classList.remove('loading');

            chatSessions[currentSessionIndex].messages.push(apiMessage);

            updateChatSessionTabs();

            document.querySelectorAll('pre code').forEach((block) => {
                hljs.highlightBlock(block);
            });

            document.querySelectorAll('pre').forEach((pre) => {
                const copyButton = document.createElement('button');
                copyButton.textContent = 'Copy';
                copyButton.classList.add('copy-button');
                pre.appendChild(copyButton);

                copyButton.addEventListener('click', () => {
                    const code = pre.querySelector('code').textContent;
                    navigator.clipboard.writeText(code).then(() => {
                        alert('Code copied to clipboard!');
                    });
                });
            });
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = `<strong>Error:</strong><br><br>${error.message}`;

            loadingMessage.innerHTML = errorMessage;
            loadingMessage.classList.remove('loading');

            chatSessions[currentSessionIndex].messages.push(errorMessage);

            updateChatSessionTabs();
        }
    }


    // Load promptbook from localStorage
    function loadPromptbook() {
        const savedPromptbook = localStorage.getItem('promptbook');
        if (savedPromptbook) {
            promptbook = JSON.parse(savedPromptbook);
        }
    }

    // Save promptbook to localStorage
    function savePromptbook() {
        localStorage.setItem('promptbook', JSON.stringify(promptbook));
    }


    // Update the promptbook list
    function updatePromptbookList() {
        const promptbookList = document.getElementById('promptbookList');
        promptbookList.innerHTML = ''; // Clear existing list
    
        promptbook.forEach((promptObject, index) => {
        const notepadName = Object.keys(promptObject)[0]; // The notepad name
    
        const promptItem = document.createElement('div');
        promptItem.classList.add('prompt-item');
        promptItem.innerText = notepadName; // Display the notepad name
    
        // Add click event to open the editing modal when a notepad is clicked
        promptItem.addEventListener('click', () => {
            openEditNotepadModal(index, notepadName);
        });
    
        promptbookList.appendChild(promptItem);
        });
    }
    
    // Add a new notepad
    function addPrompt() {
        const notepadName = `Notepad ${promptbook.length + 1}`; // Generate a notepad name
        promptbook.push({ [notepadName]: 'enter words' }); // Add new notepad
        savePromptbook(); // Save the updated promptbook
        updatePromptbookList(); // Refresh the list
        document.getElementById('newPrompt').value = ''; // Clear input field
        
    }
    
    // Open edit notepad modal with editable title
    function openEditNotepadModal(index, notepadName) {
        const notepadContent = promptbook[index][notepadName]; // Get notepad content
        document.getElementById('editNotepadTitle').value = notepadName; // Set editable title
        document.getElementById('editNotepadContent').value = notepadContent; // Set content
    
        document.getElementById('promptbookModal').style.display = 'none'; // Hide the promptbook modal
        document.getElementById('editNotepadModal').style.display = 'block'; // Show the editing modal
    
        // Set event for saving changes
        document.getElementById('saveEditedNotepadButton').onclick = () => saveEditedNotepad(index, notepadName);
    
        // Set event for deleting the notepad
        document.getElementById('deleteNotepadButton').onclick = () => deletePrompt(index);
    }
    
    // Save edited notepad, including updated title
    function saveEditedNotepad(index, oldNotepadName) {
        const newNotepadName = document.getElementById('editNotepadTitle').value.trim();
        const editedContent = document.getElementById('editNotepadContent').value.trim();
    
        if (newNotepadName && editedContent) {
        // Check if the title has changed
        if (newNotepadName !== oldNotepadName) {
            // Update the promptbook with the new title and content
            promptbook[index] = { [newNotepadName]: editedContent };
        } else {
            // If the title hasn't changed, just update the content
            promptbook[index][newNotepadName] = editedContent;
        }
        savePromptbook(); // Save the updated promptbook
        updatePromptbookList(); // Refresh the list
        closeEditNotepadModal(); // Close the editing modal
        }
    }
    
    // Delete a notepad
    function deletePrompt(index) {
        promptbook.splice(index, 1); // Remove the notepad from the array
        savePromptbook(); // Save changes to localStorage
        updatePromptbookList(); // Update the list
        closeEditNotepadModal(); // Close the editing modal
    }
    
    // Close the edit notepad modal and go back to the main promptbook modal
    function closeEditNotepadModal() {
        document.getElementById('editNotepadModal').style.display = 'none'; // Hide editing modal
        document.getElementById('promptbookModal').style.display = 'block'; // Show main promptbook modal
    }
    
    // Open the promptbook modal
    function openPromptbook() {
        document.getElementById('promptbookModal').style.display = 'block'; // Show main promptbook modal
        updatePromptbookList(); // Update the list when modal is opened
    }
    
    // Close the promptbook modal
    function closePromptbook() {
        document.getElementById('promptbookModal').style.display = 'none';
    }
    
    // Close the edit notepad modal and go back to the promptbook list
    function backToPromptbook() {
        document.getElementById('editNotepadModal').style.display = 'none'; // Hide editing modal
        document.getElementById('promptbookModal').style.display = 'block'; // Show main promptbook modal
    }

    // Function to copy content to the input message box
    function copyToMessageBox() {
        const content = document.getElementById('editNotepadContent').value; // Get content from the textarea
        document.getElementById('messageInput').value = content; // Set content to the input message box
        closeEditNotepadModal()
        backToPromptbook()
        closePromptbook()
    }

    // Load the promptbook on page load
    window.onload = () => {
        loadChatSessionsFromLocalStorage();
        loadSystemMessage();
        loadPromptbook();  // Load the promptbook when the page loads
        updateChatSessionTabs();
        if (currentSessionIndex !== -1) {
            switchChatSession(currentSessionIndex);
        }
        autofillSidebarInput();
    }

    function handleKeyPress(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    }

    document.getElementById('sendButton').addEventListener('click', sendMessage);
    document.getElementById('messageInput').addEventListener('keypress', handleKeyPress);
    document.getElementById('newChatButton').addEventListener('click', () => {
        const chatContainer = document.getElementById('chat-container');
        chatContainer.innerHTML = '';
        chatSessions.push({ summary: 'New Chat', messages: [] });
        currentSessionIndex = chatSessions.length - 1;
        updateChatSessionTabs();
        saveChatSessionsToLocalStorage(); // Save to localStorage when starting a new chat
    });

    document.getElementById('saveButton').addEventListener('click', saveSystemMessage); // Save system message when the button is clicked

    document.getElementById('openPromptbookButton').addEventListener('click', openPromptbook);
    document.getElementById('closePromptbook').addEventListener('click', closePromptbook);
    document.getElementById('addPromptButton').addEventListener('click', addPrompt);
    document.getElementById('backButton').addEventListener('click', backToPromptbook);

    document.getElementById('copyToMessageBoxButton').addEventListener('click', copyToMessageBox);



    loadPromptbook();

  </script>
</body>
</html>
