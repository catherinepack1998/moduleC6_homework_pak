const wsUri = "wss://echo-ws-service.herokuapp.com";

const output = document.getElementById("output");
const btnSend = document.querySelector('.j-btn-send');
const inp = document.querySelector('#inp');
const btnGeo = document.querySelector(".j-btn-send-geo")
let messageFromUser;
let websocket;

function writeToScreen(message) {
  let pre = document.createElement("p");
  pre.innerHTML = message;
  output.appendChild(pre);
}

(function connectToAPI () {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    writeToScreen("CONNECTED");
  };
  websocket.onmessage = function(evt) {
    writeToScreen(
      '<span id = "resp">RESPONSE: ' + evt.data+'</span>'
    );
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };
})();

btnSend.addEventListener('click', () => {
  const message = `${messageFromUser}`;
  writeToScreen('<span id = "sent">SENT: ' + message+'</span>');
  websocket.send(message);
  inp.value = '';
});

inp.addEventListener('change', () => {
  messageFromUser = inp.value;
});

const status = document.querySelector('#output');


// Функция, выводящая текст об ошибке
const error = () => {
  writeToScreen('Невозможно получить ваше местоположение');
}

// Функция, срабатывающая при успешном получении геолокации
const success = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  writeToScreen(`<a id = "sent" href = 'https://www.openstreetmap.org/#map=18/${latitude}/${longitude}';">Гео-локация</a>`);
};

btnGeo.addEventListener('click', () => {
  if (!navigator.geolocation) {
    writeToScreen('<span style="color: red;">Гео не поддерживается</span>');
  } else {
    navigator.geolocation.getCurrentPosition(success, error);
  }
});