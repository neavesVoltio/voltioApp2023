import { getFirestore, doc, getDoc, collection, getDocs, query, where, deleteDoc, orderBy, updateDoc, setDoc, addDoc  } from '../firebase/firebaseJs.js'
import { app, auth } from '../firebase/config.js'
import { onAuthStateChanged, updateProfile } from '../firebase/firebaseAuth.js';
const db = getFirestore(app) 
let taskTitleInputRep = document.getElementById('taskTitleInputRep');
let taskSubtitleInputRep = document.getElementById('taskSubtitleInputRep');
let taskDueDateInputRep = document.getElementById('taskDueDateInputRep');
let saveTaskModalRep = document.getElementById('saveTaskModalRep');

let messageRow = document.querySelectorAll('.messageRow');
    
messageRow.forEach(function(item) {
    item.addEventListener('click', function (e) {
        if (e.target.closest('.messageRow')) {
            taskTitleInputRep.value = item.dataset.id + ' ' + item.dataset.name
          }
    });
});