document.addEventListener('submit',sendForm);

function sendForm(e){
    e.preventDefault();
    let form= document.getElementById('prodForm');
    let data = new FormData(form);
    fetch('/api/products',{
        method:'POST',
        body:data
    }).then(result=>{
        return result.json();
    }).then(json=>{
        Swal.fire({
            title:'Producto Creado',
            text:json.message,
            icon:'success',
            timer:3000,
        }).then(result=>{
        })
    })
}

document.getElementById("thumbnail").onchange = (e)=>{
    let read = new FileReader();
    read.onload = e =>{
        document.querySelector('.image-text').innerHTML = "¡A subir la imagen ;)!"
        document.getElementById("preview").src = e.target.result;
    }
    
    read.readAsDataURL(e.target.files[0])
}

const socket = io(); //instanciamos io

socket.on('getProd',data=>{
    // let products = data.payload;
    fetch('templates/productsTables.handlebars').then(string=>string.text()).then(template=>{
        const processTemplate = Handlebars.compile(template);
        const templateObj={
            products:data
        }   
        const html = processTemplate(templateObj);
        let div = document.getElementById('productsTables');
        div.innerHTML=html;
    })
})


//Chat
let input = document.getElementById('messages');
let user = document.getElementById('email');
input.addEventListener('keyup',(e)=>{
    if(e.key==="Enter"){
        if(e.target.value){
            socket.emit('message',{user:email.value,message:e.target.value});
        }
    }
})

socket.on('messlog', data=>{
    let m = document.getElementById('log');
    let messages = data.map(message=>{
        return `<div><span>${message.email} dice: ${message.message}</span></div>`
    }).join('');
    m.innerHTML=messages;
})


const socket = io()

let userId = document.getElementById("user-id")
let userName = document.getElementById("user-name")
let userLastName = document.getElementById("user-last-name")
let userAge = document.getElementById("user-age")
let userAlias = document.getElementById("user-alias")
let userAvatar = document.getElementById("user-avatar")
let input = document.getElementById("message-input")
let inputButton = document.getElementById("message-send-button")
let messageCompression= document.getElementById("compresion")

function sendMessage(text) {
    if (userId.value.includes("@") && userName.value && userLastName.value && userAge.value && userAlias.value && userAvatar.value) {
        socket.emit("message", {
            author: {
                id: userId.value,
                nombre: userName.value,
                apellido: userLastName.value,
                edad: userAge.value,
                alias: userAlias.value,
                avatar: userAvatar.value
            },
            text: input.value
        })
        input.value=""
    } else {
        alert(`Por favor completa tus datos para chatear. Tu dirección de e-mail debe incluir "@"`)
    }    
}

input.addEventListener("keyup",(e)=> {
    if (e.key==="Enter" && input.value !="") {sendMessage()}
})

inputButton.addEventListener("click", ()=> {
    if (input.value !="") {sendMessage()}
})

socket.on("messagelog",data => {
    let p = document.getElementById("home-chat-message-log")

    const authorSchema= new normalizr.schema.Entity("autores")
    const messageSchema= new normalizr.schema.Entity("mensajes",{
        author: authorSchema
    })
    const chatSchema= new normalizr.schema.Entity("chatLogs",{
        mensajes: [messageSchema]
    })

    const denormalizedData = normalizr.denormalize(data.payload.result,chatSchema,data.payload.entities)

    console.log(data)
    console.log(denormalizedData)

    let normalizada= JSON.stringify(data.payload).length
    let desnormalizada = denormalizedData? JSON.stringify(denormalizedData).length : 2
    const compresion= Math.floor(normalizada/desnormalizada*100)+"%"
    console.log(`normalizada:${normalizada} desnormalizada:${desnormalizada} compresión al ${compresion}`)
    messageCompression.innerHTML= `(compresión al ${compresion})`
    
    if (denormalizedData) {
        let messages = denormalizedData.mensajes.map(message => {
            return `<div class="chat-log-message">
                        <span class="chat-log-message-user">${message.author.id} - </span>
                        <span class="chat-log-message-time">${message.time}: </span>
                        <span class="chat-log-message-text">${message.text}</span>
                    </div>`
        }).join("")
        p.innerHTML= messages
    } else {
        p.innerHTML= "No hay mensajes"
    }
}) 

let clearLogButton = document.getElementById("clear-log-button")
clearLogButton.addEventListener("click", ()=> {
    socket.emit("clearLog")
})

