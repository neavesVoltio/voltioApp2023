

function load_view(view) {
  try {
    
    if(view === 'messages'){
      document.getElementById("app").innerHTML= '<object type="text/html" data="src/views/'+ view +
                                                '.html" width="100%" height="100%" alt="menu" id='+view+'></object>';
                                                
      
                                                
    } else {
      document.getElementById("app").innerHTML= '<object type="text/html" data="src/views/'+ view + 
                                              '.html" width="100%" height="100%"></object>';  
    }
    
  } catch (error) {
    document.getElementById("app").innerHTML= '<object type="text/html" data="../src/view/'+ view + 
                                              '.html" width="100%" height="100%" class="messagesMenuCliked"></object>';  
  }
}

function onLoadPage(){
  console.log('loadPage');
  document.getElementById("app").innerHTML='<object type="text/html" data="views/login.html" width="100%" height="100%" ></object>';
}
