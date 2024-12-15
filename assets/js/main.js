/* * Copyright (C) 2024 markdevnodo * All rights reserved. *  * Author: markdevnodo * Creation Date: 01/01/2024 *  * Desciption: * A one-way messaging software. *  * MIT License: *  * Permission is hereby granted, free of charge, to any person obtaining a copy * of this software and associated documentation files (the "Software"), to deal * in the Software without restriction, including without limitation the rights * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell * copies of the Software, and to permit persons to whom the Software is * furnished to do so, subject to the following conditions: *  */ const access = "mit" /* * The above copyright notice and this permission notice shall be included in all * copies or substantial portions of the Software. *  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER */; var uP = prompt("ENTER YOUR PASSWORD") /* * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE * SOFTWARE. */









































function escapeHTML(str) {
    const escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return str.replace(/[&<>"']/g, match => escapeMap[match]);
}








if (uP == access) {
const chatApp = {
    api: "https://lemanh-api.onrender.com/testAPI",
    date: new Date(),
    formatTime(date) {
        let hours = date.getHours();
        let minutes = date.getMinutes();
    
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
    
        return hours + ':' + minutes;
    },
    renderMessage() {
        var textMessage = document.querySelector(".conversation-wrapper");
        $.ajax({
            url: this.api,
            type: 'GET',
            success: function(response) {
                var html = response.map((content) => {
                    const safeMessage = escapeHTML(content.message);
                    return `
                    <li class="conversation-item me">
                        <div class="conversation-item-side">
                            <img class="conversation-item-image" src="https://ledinhducmanh.github.io/markdevnodo/assets/img/lemanh.jpg" alt="">
                        </div>
                        <div class="conversation-item-content">
                            <div class="conversation-item-wrapper">
                                <div class="conversation-item-box">
                                    <div class="conversation-item-text">
                                        <pre><code>${safeMessage}</code></pre>
                                        <div class="conversation-item-time">${content.date}</div>
                                    </div>
                                    <div class="conversation-item-dropdown">
                                        <button onclick="chatApp.deleteMessage(${content.id})" type="button" class="conversation-item-dropdown-toggle"><i class="ri-more-2-line"></i></button>
                                    </div>
                                    <!-- New copy button -->
                                    <div class="conversation-item-copy">
                                        <button type="button" class="copy-button" data-message="${safeMessage}" title="Copy message"><i class="ri-file-copy-line"></i>COPY</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    `;
                });
                textMessage.innerHTML = html.join("");
    
                // Attach event listeners for copy buttons
                document.querySelectorAll('.copy-button').forEach(button => {
                    button.addEventListener('click', function() {
                        const message = this.getAttribute('data-message');
                        chatApp.copyMessage(message);
                    });
                });
            },
            error: function(xhr, status, error) {
                console.error("Error fetching messages:", error);
            }
        });
        scrollConversation() , 2000
    },
    copyMessage(message) {
        // Create a temporary textarea element to copy text
        const tempInput = document.createElement("textarea");
        document.body.appendChild(tempInput);
        tempInput.value = message; // Set the value to the message
        tempInput.select(); // Select the text
        document.execCommand("copy"); // Copy the selected text
        document.body.removeChild(tempInput); // Remove the temporary element
        alert("Message copied to clipboard!"); // Feedback for the user
    },
    submitMessage() {
        const textInput = document.querySelector(".conversation-form-input");
        const submitBtn = document.querySelector(".conversation-form-submit");
        
        submitBtn.onclick = () => {
            this.sendMessage(textInput.value.trim());
        };
    },
    sendMessage(data) {
        let now = new Date();
        let formattedTime = this.formatTime(now);

        if(data.trim() != "" && data.length != 0) {
            $.ajax({
                url: this.api,
                type: 'POST',
                data: JSON.stringify({
                    name: "Lê Mạnh",
                    message: data,
                    date: formattedTime,
                }),
                contentType: 'application/json',
                success: function() {
                    chatApp.renderMessage();
                },
            });
        } 
    },
    deleteMessage(id) {
        $.ajax({
            url: `${this.api}/${id}`,
            type: 'DELETE',
            success: function() {
                chatApp.renderMessage();
            },
        });
    },
    updateMessage() {
        setInterval(()=> {
            this.renderMessage();
        },9000);
    },
    start() {
        this.renderMessage();
        this.submitMessage();
    }
};
chatApp.start();
document.getElementById('scroll-button').addEventListener('click', scrollConversation);

function scrollConversation() {
    setTimeout(() => {
        const conversationMain = document.getElementById('conversation-main');
        conversationMain.scrollTo({
            top: conversationMain.scrollHeight,
            behavior: 'smooth'
        });
    }, 500)
}
}

