const socket = io('/');
let userName = null;

document.addEventListener('DOMContentLoaded', () => {
    userName = prompt('Enter your name');
});

setInterval(() => {
    if (userName != '' && userName != null) {
        document.querySelector('#userH3').textContent = userName;
    }
}, 1000);

const submitMessage = () => {
    if (userName != '' && userName != null) {
        const textValue = document.querySelector('#message').value;
        document.querySelector('#message').value = '';
        socket.emit('newMessage', { msg: textValue, user: userName });
    } else {
        userName = prompt('Enter your name');
    }
};

socket.on('updateMessage', (messages) => {
    updateMessageOnScreen(messages);
});

const updateMessageOnScreen = (messages) => {
    let listMessage = '';
    messages.forEach((message) => {
        if (message.user == userName) {
            listMessage +=
                '<div class="message message-personal"><figure class="avatar"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdX6tPX96Zk00S47LcCYAdoFK8INeCElPeJrVDrh8phAGqUZP_g" /></figure><div>' +
                message.user +
                ': ' +
                message.msg +
                '<button class="btn-delete"onclick="deleteMessage(this);">Delete</button></div></div>';
        } else {
            listMessage +=
                '<div class="message new"><figure class="avatar"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpdX6tPX96Zk00S47LcCYAdoFK8INeCElPeJrVDrh8phAGqUZP_g" /></figure><div>' +
                message.user +
                ': ' +
                message.msg +
                '</div></div>';
        }
        document.querySelectorAll('.messages-content')[0].innerHTML = listMessage;
    });
};

function deleteMessage(self) {
    self.parentNode.innerHTML = 'This message has been deleted';
}
