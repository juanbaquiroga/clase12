import express from 'express';
import {Server as IOServer} from 'socket.io';
import {dirname} from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const expressServer = app.listen(3000, ()=>{
    console.log('server listening port 3000')
})

const io = new IOServer(expressServer);
const messages = [{username:'server', message:'bienvenido a mi chat'}]

app.use(express.static(__dirname + '/public'))

io.on('connection', (socket)=>{
    console.log(`new connection, socket ID: ${socket.id}`)

    socket.emit('server:message', messages)

    socket.on("client:message", (messageInfo) => {
        messages.push(messageInfo);
    
        io.emit("server:message", messages);
      });
})
