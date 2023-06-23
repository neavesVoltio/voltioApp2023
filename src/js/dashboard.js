import { getFirestore, doc, getDoc, collection, getDocs, query, where, deleteDoc, orderBy, updateDoc, setDoc, addDoc, Timestamp  } from '../firebase/firebaseJs.js'
import { app, auth } from '../firebase/config.js'
import { onAuthStateChanged, updateProfile } from '../firebase/firebaseAuth.js';
const db = getFirestore(app) 
let taskTitleInput = document.getElementById('taskTitleInput');
let taskSubtitleInput = document.getElementById('taskSubtitleInput');
let taskDueDateInput = document.getElementById('taskDueDateInput');
let saveTaskModal = document.getElementById('saveTaskModal');
let taskVoltioIdInput = document.getElementById('taskVoltioIdInput');
let taskDescriptionInput = document.getElementById('taskDescriptionInput');
let taskAssignedTo = document.getElementById('taskAssignedTo');
let taskStatus = document.getElementById('taskStatus');
let userLogged

onAuthStateChanged(auth, async(user)=>{
    if(user){
      userLogged = user.email
      fetchAssignedTasks(userLogged)
    }else{
        'no user logged'
    }
})

async function fetchAssignedTasks(userEmail) {
  const projectTasksRef = collection(db, "projectTasks");
  const q = query(projectTasksRef, where("data-assignedTo", "==", userEmail));

  try {
    const querySnapshot = await getDocs(q);
    const assignedTasks = [];
    let toDoAdminData = document.getElementById('toDoAdminData');
    toDoAdminData.innerHTML = ''
    querySnapshot.forEach((doc) => {
      assignedTasks.push(doc.data());
      createMessageRow(doc.data(), doc.id)
    });

    assignedTasks.forEach(function(item) {
      //createMessageRow(item)
    })

  } catch (error) {
    console.error("Error fetching assigned tasks: ", error);
    return [];
  }
}

// crea row de las tareas
function createMessageRow(data, docId) {
    const messageRow = document.createElement("div");
    messageRow.classList.add("row", "align-items-center", "border-bottom", "py-2", "custom-button", "mb-2", "border-info", "messageRow");
    messageRow.setAttribute("data-bs-toggle", "modal");
    messageRow.setAttribute("data-bs-target", "#addNewTaskModal");
    messageRow.setAttribute("data-id", data["data-id"]);
    messageRow.setAttribute("data-name", data["data-name"]);
    messageRow.setAttribute("data-subtitle", data["data-subtitle"]);
    messageRow.setAttribute("data-description", data["data-description"]);
    messageRow.setAttribute("data-duedate", data["data-duedate"]);
    messageRow.setAttribute("data-assignedto", data["data-assignedTo"]);
    messageRow.setAttribute("data-creationDate", data["data-creationDate"]);
    messageRow.setAttribute("data-taskstatus", data["data-taskStatus"]);
    messageRow.setAttribute("data-taskid", docId);
  
    const col4 = document.createElement("div");
    col4.classList.add("col-4");
    const idParagraph = document.createElement("p");
    idParagraph.textContent = data["data-id"];
    col4.appendChild(idParagraph);
  
    const col8 = document.createElement("div");
    col8.classList.add("col-8");
    const nameParagraph = document.createElement("p");
    nameParagraph.textContent = data["data-name"];
    col8.appendChild(nameParagraph);
  
    messageRow.appendChild(col4);
    messageRow.appendChild(col8);
    toDoAdminData.appendChild(messageRow)

    let messageRowSet = document.querySelectorAll('.messageRow');
    messageRowSet.forEach(function(item) {
        item.addEventListener('click', function (e) {
            if (e.target.closest('.messageRow')) {
              const text = item.dataset.duedate
              const regex = /\(([^)]+)\)/;
              const matches = text.match(regex);
              let values = {}
              values = matches[1].split(", ");
              let seconds = values[0]
              const numbers = seconds.replace(/\D/g, "");
              const date = new Date(numbers * 1000);
              const formattedDate = date.toISOString().slice(0, 10);
                taskTitleInput.value = item.dataset.name
                taskVoltioIdInput.value = item.dataset.id
                taskSubtitleInput.value = item.dataset.subtitle
                taskDescriptionInput.value = item.dataset.description
                taskDueDateInput.value = formattedDate
                taskAssignedTo.value = item.dataset.assignedto
                taskStatus.value = item.dataset.taskstatus
                saveTaskModal.dataset.taskid = item.dataset.taskid
              }
        });
    });
    
}
  
// SAVE TASKS

async function addProjectTask() {
  const projectTasksRef = collection(db, "projectTasks");

  const taskData = {
    "data-id": "V-11",
    "data-name": "JAVIER NEAVES",
    "data-subtitle": "Pending taks",
    "data-description": "This is a pending task description",
    "data-duedate": new Date("05/25/2023 00:28:21"),
    "data-assignedTo": "neaves@voltio.us",
    "data-creationDate": new Date("06/07/2023"),
    "data-taskStatus": "To Do",
    "data-createdBy": "neaves@voltio.us",

  };

  try {
    const docRef = await addDoc(projectTasksRef, taskData);
    console.log("Document added with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

  saveTaskModal.addEventListener('click', function (e) {
    console.log(e.target.dataset.taskid);
    let taskId = e.target.dataset.taskid
    editProjectTask(taskId)
  });

  async function editProjectTask(taskId){
    const fecha = new Date(taskDueDateInput.value);
    let realDate = fecha.setDate(fecha.getDate() + 1);
    const taskRef = doc(db, 'projectTasks', taskId);
    try {
      await updateDoc(taskRef, {
        "data-name" :taskTitleInput.value,
        "data-id" : taskVoltioIdInput.value,
        "data-subtitle" : taskSubtitleInput.value,
        "data-description": taskDescriptionInput.value,
        "data-duedate": realDate,
        "data-assignedTo":taskAssignedTo.value,
        "data-taskStatus":taskStatus.value
      }).then((result) => {
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Task updated!',
          showConfirmButton: false,
          timer: 1500
        })
        fetchAssignedTasks(userLogged)
      }).catch((err) => {
        console.log(err);
      });
      console.log("task edited");  
    } catch (error) {
      console.log(error);
    }
    
  }

  // error al guardar fecha despues de editar, ya que se guarda con un valor distinto.
  