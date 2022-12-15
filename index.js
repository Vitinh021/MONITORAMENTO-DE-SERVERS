const express = require('express')
const app = express()
require('dotenv').config()
const axios = require("axios")
const TotalVoice = require("totalvoice-node")
const client = new TotalVoice(process.env.ACESS_TOKEN)

app.get("/", (req, res) => {
    res.sendStatus(200)
})

app.listen(2000, () => {
    console.log('Porta --> 2000')
})

const servers = [
    {
        name: "servidor 1",
        url: "http://localhost:4001",
        developer: {
            name: process.env.NAME, // <-- nome do desenvolvedor que receberá o chamado
            telephone: process.env.TELEPHONE  // <-- um numero de celular valido
        }
    },
    {
        name: "servidor 2",
        url: "http://localhost:4002",
        developer: {
            name: process.env.NAME, // <-- nome do desenvolvedor que receberá o chamado
            telephone: process.env.TELEPHONE // <-- um numero de celular valido
        }
    }
];

(async () => {
    console.log("Iniciou o monitoramento!")
    for (const server of servers) {
        await axios({
            url: server.url,
            method: "get",
        }).then(() => {
            console.log(`${server.name} está no ar`)
        }).catch(() => {
            console.log(`${server.name} está fora do ar`)
            const message = `${server.developer.name} o ${server.name} está fora do ar, por favor, faça alguma coisa o mais rapido possivel`
            const options = {
                velocidade: 2,
                tipo_voz: "br-Vitoria"
            }
            client.tts.enviar(server.developer.telephone, message, options).then(() => {
                console.log(`O desenvolvedor ${server.developer.name} já foi avisado!`)
            }).catch((e) => {
                console.log(e)
            })
        })
    }
    console.log("Fim do monitoramento!")
})()