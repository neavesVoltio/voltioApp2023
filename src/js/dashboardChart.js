import { getFirestore, doc, getDoc, collection, getDocs, query, where, deleteDoc, orderBy, updateDoc, setDoc, addDoc, Timestamp  } from '../firebase/firebaseJs.js'
import { app, auth } from '../firebase/config.js'
import { onAuthStateChanged, updateProfile } from '../firebase/firebaseAuth.js';
 
const db = getFirestore(app) 

onAuthStateChanged(auth, async(user)=>{
  if (user) {
    let currentUserEmail = user.email
    getFilteredLeadData()
    // Función para obtener los datos filtrados
    async function getFilteredLeadData() {
      // seccion para obtener el listado de usaurios depende del manager
      const leadRef = collection(db, "leadData");
      console.log(currentUserEmail);
      const q = query(leadRef, where("profileCloser", "==", currentUserEmail));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data().contractDate);
      });
      
    }


  } else {
    console.log('no user logged');    
  }
})

// Obtén la referencia al elemento <div>
const chartSection = document.getElementById('monthlyChartSection');

// Crea un elemento <canvas> para la gráfica
const canvas = document.createElement('canvas');

// Establece un ancho y alto para el elemento <canvas>
canvas.width = 400;
canvas.height = 400;

// Agrega el elemento <canvas> al elemento <div>
chartSection.appendChild(canvas);

// Obtiene el contexto del lienzo
const ctx = canvas.getContext('2d');

// Datos de ejemplo para la gráfica de dona
const data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Sales',
      data: [10, 20, 15, 25, 30, 10, 20, 15, 25, 30, 15, 25],
      backgroundColor: ['#078C41'],
    },
  ],
};

// Opciones de configuración para la gráfica
let delayed
const options = {
  responsive: true,
  maintainAspectRatio: false,
  animation: {
    onComplete: () => {
      delayed = true;
    },
    delay: (context) => {
      let delay = 0;
      if (context.type === 'data' && context.mode === 'default' && !delayed) {
        delay = context.dataIndex * 300 + context.datasetIndex * 100;
      }
      return delay;
    },
  },
};

// Crea la gráfica de dona
new Chart(ctx, {
  type: 'bar',
  data: data,
  options: options,
  label: 'sales'
});