import { getFirestore, doc, getDoc, collection, getDocs, query, where, deleteDoc, orderBy, updateDoc, setDoc, addDoc  } from '../firebase/firebaseJs.js'
import { app, auth } from '../firebase/config.js'
import { onAuthStateChanged, updateProfile } from '../firebase/firebaseAuth.js';
const db = getFirestore(app) 

let datos = [
]
    
console.log(datos[0]);

//startMigration()
/*
function migrateLeadData(){
    datos.forEach(async function(item) {
        console.log("start migration");
        await addDoc(collection(db, 'leadData'), {
            customerLanguage: item.customerLanguage,
            customerPhoneNumber: item.customerPhoneNumber,
            customerAddress: item.CustomerAddress,
            inputCity: item.inputCity,
            inputState: item.inputState,
            customerName: item.customerName,
            inputZip: item.inputZip,
            profileBirth: '',
            repName: item.repName,
            profileCloser: item.profileCloser,
            profileSetter: item.profileSetter,
            voltioIdKey: item.voltioIdKey,
            status: item.status,
            creationDate: new Date(),
            project:  'solar',// depende del valor de saveLeadButton
            progress: item.progress,
            systemSize: item.systemSize,
            leadEmail: item.leadEmail

    });
    })
}
*/

let updateBd = document.getElementById('updateBd');
updateBd.addEventListener('click', function (e) {
    //migrateProfileData()
});

function migrateProfileData(){
    datos.forEach(async function(item) {
        console.log(item);
        console.log("start migration");
        //let userEmail = item.userEmail
        //console.log(userEmail);
        
        //const docRef = doc(db, 'listOfCommentsAdmin');
        await addDoc(collection(db, 'listOfCommentsAdmin'), item)
        
    })
}

    

