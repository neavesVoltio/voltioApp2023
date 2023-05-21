import { getFirestore, doc, getDoc, collection, getDocs, query, where, deleteDoc, orderBy, updateDoc, setDoc, limit, addDoc  } from '../firebase/firebaseJs.js'
import { app, auth } from '../firebase/config.js'
import { onAuthStateChanged, updateProfile } from '../firebase/firebaseAuth.js';
const db = getFirestore(app) 
getMessagesList()
// Crear un array para almacenar los últimos registros por voltioId
const latestLeadNotes = [];
let voltioId
let leadName
let backToMessagesListBtn = document.getElementById('backToMessagesListBtn');
let listMessagesSection = document.getElementById('listMessagesSection');
let detailedMessagesSection = document.getElementById('detailedMessagesSection');
let searchLeadText = document.getElementById('searchLeadText');
let currentUserName
let loading = document.getElementById('loading');
let userId
let latestLeadNotesArray

startLoading()

function startLoading(){
  loading.classList.remove("invisible");
}

function endLoading(){
  loading.classList.add("invisible");
}
onAuthStateChanged(auth, async(user) => {
    if (user) {
        // El usuario está autenticado
        currentUserName = user.displayName;
        userId = user.uid
      } else {
        // El usuario no está autenticado
        console.log('No hay usuario autenticado');
      }
})

async function getMessagesList(){
   
    // Crear una consulta para obtener los documentos ordenados por voltioId y fecha descendente
    const q = query(collection(db, 'leadData'), orderBy('voltioIdKey'));

    // Obtener los documentos ordenados por voltioId y fecha descendente
    const querySnapshot = await getDocs(q);

    // Iterar sobre los documentos y guardar el último registro por voltioId en el objeto
    querySnapshot.forEach((doc) => {
    const data = doc.data();
    const voltioId = data.voltioIdKey;
    latestLeadNotes[voltioId] = data;
    });

    // Convertir el objeto en un array de los últimos registros
    latestLeadNotesArray = Object.values(latestLeadNotes);
    createListOfMessages(latestLeadNotesArray)
}

function createListOfMessages(latestLeadNotesArray){
    let messagesListContainer = document.getElementById('messagesListContainer');
    messagesListContainer.innerHTML = ''
    latestLeadNotesArray.forEach(function(item) {
        // Crear el elemento div
        const container = document.createElement("div");
        container.classList.add("container", "messageRow");
        container.dataset.id = item.voltioIdKey;
        container.dataset.name = item.customerName;
        
        // Crear el contenido del elemento
        const content = `
            <div class="row">
            <div class="col-12">
                <div class="row align-items-center border-bottom py-2 custom-button">
                <div class="col-2">
                    <div class="circle">${item.voltioIdKey}</div>
                </div>
                <div class="col-10">
                    <h4 class="customerName">${item.customerName}</h4>
                </div>
                </div>
            </div>
            </div>
        `;
        
        // Asignar el contenido al elemento div
        container.innerHTML = content;
        
        // Agregar el elemento al DOM
        messagesListContainer.appendChild(container);
        
    });
    endLoading()
    let messageRow = document.querySelectorAll('.messageRow');
    messageRow.forEach(function(item) {
        item.addEventListener('click', function (e) {
            if (e.target.closest('.messageRow')) {
                voltioId = item.dataset.id
                leadName = item.dataset.name
                getDetailMessages()
                listMessagesSection.style.display = 'none'
                detailedMessagesSection.style.display = 'block'             
              }
        });
    });
    
    truncateWords()
    
}

async function getDetailMessages(){
    /* container.dataset.id = item.voltioId;
        container.dataset.name = item.leadName; 
    */
    let chatTitleLeadname = document.getElementById('chatTitleLeadname');
    let chatTitleVoltioId = document.getElementById('chatTitleVoltioId');
    chatTitleVoltioId.innerHTML = voltioId
    chatTitleLeadname.innerHTML = leadName
    let messagesDetailContainer = document.getElementById('messagesDetailContainer')
    messagesDetailContainer.innerHTML = ''
    const collectionRef = collection(db, 'listOfleadNotes');
    const q = query(collectionRef, where('voltioId', '==', voltioId), orderBy('date', 'desc'));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
    const data = doc.data();
    const { userName, customerComment, date } = data;

    const chatElement = document.createElement('div');
    chatElement.classList.add('container');

    const rowElement = document.createElement('div');
    rowElement.classList.add('row');

    const colElement = document.createElement('div');
    colElement.classList.add('col-12');

    const contentElement = document.createElement('div');

    // ajusta la fecha y hora a formato visible
    const timestamp =  date ;
    const dateNew = new Date(timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000));
    
    let month = dateNew.getMonth() < 10 ? '0'+ (dateNew.getMonth() + 1): (dateNew.getMonth()+ 1)
    let day = dateNew.getDate() < 10 ? '0' + dateNew.getDate() : dateNew.getDate()
    const formattedDate = `${month}/${day}/${dateNew.getFullYear()}`;

    if (userName !== currentUserName) {
        contentElement.classList.add('receiverMessageBox', 'chat', 'text-box', 'col-10', 'mb-2');
        contentElement.innerHTML = `
        <h3 class="chat-title receiverName">${userName}</h3>
        <p class="chat-message receiverMessage">${customerComment}</p>
        <p class="chat-date receiverDate">${formattedDate}</p>
        `;
    } else {
        contentElement.classList.add('senderMessageBox', 'chat', 'col-10', 'offset-2', 'mb-2');
        contentElement.innerHTML = `
        <h3 class="chat-title senderName">${userName}</h3>
        <p class="chat-message senderMessage">${customerComment}</p>
        <p class="chat-date senderDate">${formattedDate}</p>
        `;
    }

    colElement.appendChild(contentElement);
    rowElement.appendChild(colElement);
    chatElement.appendChild(rowElement);

    // Agregar el elemento creado al documento o contenedor deseado
    messagesDetailContainer.appendChild(chatElement);
    });
}


function truncateWords(){
    const messagePreview = document.querySelectorAll('.messagePreview');
    messagePreview.forEach(function(item) {
        // body
        const words = item.textContent.trim().split(' ');
        const truncatedText = words.slice(0, 5).join(' ');
        if (words.length < 5) {
            item.textContent = truncatedText;    
        } else {
            item.textContent = truncatedText + '...';
        }
        
    });
    
}

backToMessagesListBtn.addEventListener('click', function (e) {
    listMessagesSection.style.display = 'block'
    listMessagesSection.classList.remove('d-none')
    detailedMessagesSection.style.display = 'none'     
});

let sendMessageBotton = document.getElementById('sendMessageBotton');

sendMessageBotton.addEventListener('click', function (e) {
    sendComment()
});

async function sendComment(){
    let date = new Date() 
    let textBox = document.getElementById('textBox'); 
    if(textBox != ""){
        await addDoc(collection(db, 'listOfleadNotes'), {
            voltioId: voltioId,
            customerComment: textBox.value,
            date: date,
            userName: currentUserName,
            userId: userId,
            leadName: leadName
        }).then( async() => {
            getDetailMessages()
            
        }).catch((error) => {
            Swal.fire({
                position: 'top-end',
                icon: 'warning',
                title: 'An error has occurred, please try again. ' + error,
                showConfirmButton: false,
                timer: 1500
              })
              return
        })       

        textBox.value = ""
    } else{
        return
    }
}

searchLeadText.addEventListener('input', filterListName);

function filterListName(){
    const filterText = searchLeadText.value.toUpperCase()
    const filteredArray = latestLeadNotesArray.filter(item => {
        const leadName = item.customerName.toUpperCase()
        return leadName.includes(filterText)
    })
    createListOfMessages(filteredArray)
}