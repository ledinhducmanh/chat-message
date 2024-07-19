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
                    return `
                    <li class="conversation-item me">
                        <div class="conversation-item-side">
                            <img class="conversation-item-image" src="https://ledinhducmanh.github.io/markdevnodo/assets/img/lemanh.jpg" alt="">
                        </div>
                        <div class="conversation-item-content">
                            <div class="conversation-item-wrapper">
                                <div class="conversation-item-box">
                                    <div class="conversation-item-text">
                                        <p>${content.message}</p>
                                        <div class="conversation-item-time">${content.date}</div>
                                    </div>
                                    <div class="conversation-item-dropdown">
                                        <button onclick="chatApp.deleteMessage(${content.id})" type="button" class="conversation-item-dropdown-toggle"><i class="ri-more-2-line"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </li>
                    `;
                });
                textMessage.innerHTML = html.join("");
            },
            error: function(xhr, status, error) {}
        });
    },
    
    submitMessage() {
        var textInput = document.querySelector(".conversation-form-input");
        var submitBtn = document.querySelector(".conversation-form-submit");

        submitBtn.onclick = () => {
            this.sendMessage(textInput.value); // call sendMessage với giá trị nhập vào
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
                    message: data, // truyền ruyền data
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
            url: `${this.api}`+`/${id}`,
            type: 'DELETE',
            success: function() {
                chatApp.renderMessage();
            },
        });
    },
    updateMessage() {
        setInterval(()=> {
            this.renderMessage()
        },9000)
    },
    start() {
        this.renderMessage();
        this.submitMessage();
        this.updateMessage()
    }
};

chatApp.start();
