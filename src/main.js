

function load_view(view) {
  try {
    document.getElementById("app").innerHTML='<object type="text/html" data="src/views/'+ view + '.html" width="100%" height="100%" ></object>';  
  } catch (error) {
    document.getElementById("app").innerHTML='<object type="text/html" data="../src/views/'+ view + '.html" width="100%" height="100%" ></object>';  
  }
}

function onLoadPage(){
  console.log('loadPage');
  document.getElementById("app").innerHTML='<object type="text/html" data="views/login.html" width="100%" height="100%" ></object>';
}

function clickToAppSection(){
  let app = document.getElementById('app');
  console.log(app);
  app.addEventListener('click', function (e) {
    console.log(e.target.id); 
  });
}


window.addEventListener("click", function(event) {
  console.log(event.target);
    
});
