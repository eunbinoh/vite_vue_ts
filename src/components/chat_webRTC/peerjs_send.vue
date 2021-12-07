/** PeerJS _ Vue _ TypeScript
    Chat_ Send _ Author: Eunbi Noh 
*/
<template>
    <VmContainer>
        <VmCell>
            <label>ID :</label> 
            <input v-model="recvId" id="send-id">
            <button @click="join">연결</button>
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

const message = ref('');
const messages = reactive([]);
const msg = ref('');
const recvId = ref('');
let peer :any = null;
let conn :any = null;
let lastPeerId :any = null;

let pc = null;
let sd = null;

function initialize () {
    // WEB RTC PEER 연결
    pc = new RTCPeerConnection();
    sd = pc.currentRemoteDescription;
    if (sd) {
        console.log("local session: type -"+ sd.type + ", sdp description -" + sd.sdp);
    }else {
        console.log("No local session yet")
    }

    // peer 생성
    peer = new Peer( '', {
        debug : 2
    })
    // Create own peer object with connection to shared PeerJS server
    peer.on('open', function () {
        if (peer.id === null) {
            console.log('Received null id from peer open');
            peer.id = lastPeerId;
        }else {
            lastPeerId = peer.id;

            console.log(`ID: ${peer.id}`);
            console.log('last ID :', lastPeerId);
            
            //conn = peer.connect(peer.id, {});
        }
    });

    peer.on('connection', function(c :any) {
        c.on('open', function() {
            c.send('connected client');
            console.log('conn accept !!');
            setTimeout(function() { c.close() }, 500);
        });
    });
    peer.on('disconnected', function () {
        console.log('Connection lost. Please reconnect');
        peer.id = lastPeerId;
        peer._lastServerId = lastPeerId;
        peer.reconnect();
    });
    peer.on('close', function() {
        conn = null;
        console.log('Connection destroyed');
    });
    peer.on('error', function (err :any) {
        console.log(err);
        alert('' + err);
    });
};

function join () {
    if (conn) {
        conn.close();
    }

    conn = peer.connect(recvId.value, {
        reliable: true
    });

    conn.on('open',function() {
        console.log("Connected to: "+ conn.peer);

        const command = getUrlParam("command");
        if(command) {
            conn.send(command);
        }
    })

    conn.on('data',function(data :any){
        console.log("conn on. data functioning..")
        addMessage("Peer_" + data);
    })

}

function getUrlParam(name :any){
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(window.location.href);
    if (results == null)
        return null;
    else
        return results[1];
};


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
#sendMessageBox, #send-id {
    width: 210px;
}
</style>