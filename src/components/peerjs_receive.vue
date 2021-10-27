/** PeerJS _ Vue _ TypeScript
    Chat_ Receive _ Author: Eunbi Noh 
*/
<template>
    <VmContainer>
        <VmCell>
            <label>ID :</label> 
            <div id="receiver-id">{{ recvId }}</div>
            <div class="textArea" id="message">
                <div v-for="m in messages">{{ m }}</div>
            </div>
            <input id="sendMessageBox" v-model="msg" @keypress.enter="sendMessage" placeholder="메세지 입력" type="text">
            <button id="sendButton" @click="sendMessage">전송</button>
        </VmCell>
    </VmContainer>
</template>

<script setup lang="ts">
import { ref, toRaw, unref } from '@vue/reactivity';
import { reactive } from 'vue';
import Peer from 'peerjs'

const peer = new Peer('', {} ); 
const message = ref('');
const messages = reactive([]);
const msg = ref('');
const recvId = ref('');
let conn :any = null;

let lastPeerId :any = null;

let pc = null;
let sd = null;

pc = new RTCPeerConnection();
sd = pc.currentRemoteDescription;
if (sd) {
    console.log("local session: type -"+ sd.type + ", sdp description -" + sd.sdp);
}else {
    console.log("No local session yet")
}

function initialize () {
    // Create own peer object with connection to shared PeerJS server

    peer.on('open', function (id) {
        if (peer.id === null) {
            console.log('Received null id from peer open');
            peer.id = lastPeerId;
        } else {
            lastPeerId = peer.id;
        }
        console.log(`ID: ${peer.id}`);
        console.log('Last ID:', lastPeerId);
        
        conn = peer.connect(peer.id, {});
        recvId.value = peer.id ;
    });

    peer.on('connection', function(c) {
        if (conn && conn.open) {
            c.on('open', function() {
                c.send('Already connected another Client');
                setTimeout(function() { c.close() }, 500);
            });
            return;
        }
        conn = c;
        console.log('Connected to :', conn.peer);
        action();
    });

    peer.on('disconnected', function () {
        console.log('Connection lost. Please reconnect');
        peer.reconnect();
    });
    peer.on('close', function() {
        console.log('Connection destroyed');
        conn = null;
    });
    peer.on('error', function (err) {
        console.log(err);
        alert('' + err);
    });
};

function action() {
    conn.on('data', function(data :any){
        console.log('data receive!!! Good');
        addMessage('Peer_: ' + data);
    })
}

function addMessage(msg :any){
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    if (h > 12) h -= 12;
    else if (h === 0) h = 12;

    if(message !== null ) {
        message.value = msg + " ( time_" + h + "시 " + m + "분" + s + "초 )"
        console.log(`add __message value: ${message.value}`);
        
        const msgArr : String[] = toRaw(unref(messages));
        msgArr.push(message.value);
    }
}

function sendMessage(m :any) {
     if (conn) {
        if(msg.value !== null ) {
            conn.send(msg.value);
            addMessage("Self_: " + msg.value);

            msg.value = '';
        }
    }
}

initialize();

</script>

<style >
.textArea {
    height: 250px ;
    width: 250px;
    border: 1px solid black;
}
#sendMessageBox {
    width: 210px;
}
#receiver-id {
  width: 250px;
}
</style>