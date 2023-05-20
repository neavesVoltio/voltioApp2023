import { getFirestore, doc, getDoc, collection, getDocs, query, where, deleteDoc, orderBy, updateDoc, setDoc  } from '../firebase/firebaseJs.js'
import { app, auth } from '../firebase/config.js'
import { onAuthStateChanged, updateProfile } from '../firebase/firebaseAuth.js';
const db = getFirestore(app) 
truncateWords()
function truncateWords(){
    const messagePreview = document.querySelectorAll('.messagePreview');
    messagePreview.forEach(function(item) {
        // body
        const words = item.textContent.trim().split(' ');
        const truncatedText = words.slice(0, 5).join(' ');
        console.log();
        if (words.length < 5) {
            item.textContent = truncatedText;    
        } else {
            item.textContent = truncatedText + '...';    
        }
        
    });
    
}

let messageRow = document.querySelectorAll('.messageRow');
messageRow.forEach(function(item) {
    
    item.addEventListener('click', function (e) {
        if (e.target.closest('.messageRow')) {
            console.log(item.dataset.id);
          }
    });
});