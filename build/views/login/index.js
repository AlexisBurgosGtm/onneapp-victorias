function getView(){
    let view = {
        login : ()=>{
            return `
        <div class="row">
     
            <div class="col-md-4 col-sm-12 col-lg-4 col-lx-4">
                
            </div>

            <div class="col-md-4 col-sm-12 col-lg-4 col-lx-4">
   
                <div class="card shadow p-2 card-rounded border-primary">

                    <div class="card-header text-center bg-white">
                        <div class="row">
                            <div class="col-4">

                            </div>
                            <div class="col-4">
                                <img src="./favicon.png" width="60" height="60">                            
                            </div>
                            <div class="col-4" align="right">
                                <br>
                                <button class="btn btn-outline-primary btn-lg btn-circle shadow" onclick="funciones.shareAppWhatsapp();">
                                        <i class="fal fa-paper-plane"></i>
                                </button>
                            </div>    
                        </div>
                        
                    </div>
                    <div class="card-body">
                        <form class="" id="frmLogin" autocomplete="off">
                            <div class="form-group">
                                <select class="negrita form-control border-secondary border-top-0 border-right-0 border-left-0" id="cmbSucursal">
                                    
                                </select>
                                
                            </div>
                            <div class="form-group">
                                
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="fal fa-user"></i>
                                        </span>
                                    </div>
                                    <input class="form-control border-secondary border-top-0 border-right-0 border-left-0" type="text" id="txtUser" placeholder="Escriba su usuario" required="true">
                                </div>
                                
                            </div>
                            <div class="form-group">
                                <div class="input-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text">
                                            <i class="fal fa-lock"></i>
                                        </span>
                                    </div>
                                    <input class="form-control border-secondary border-top-0 border-right-0 border-left-0" type="password" id="txtPass" placeholder="Escriba su contraseña" required="true">
                                </div>
                                        
                            </div>
                            <br>
                            <div class="form-group" align="center">
                                <button class="btn btn-primary btn-lg shadow col-12 btn-rounded"  type="submit" id="btnIniciar">
                                    <i class="fal fa-unlock"></i>
                                    Ingresar
                                </button>
                            </div>
                            <div class="form-group" align="right">
                                <small class="">Onne-App - ${versionapp}</small>
                                <br>
                                <small>
                                    <a href="https://apigen.whatsapp.com/send?phone=50257255092&text=Ayudame%20con%20la%20app%20de%20Mercados%20Efectivos...%20">
                                        por Alexis Burgos
                                    </a>
                                </small>
                            </div>
                        </form>
                    </div>

            
    

                </div>
            </div>

            <div class="col-md-4 col-sm-12 col-lg-4 col-lx-4"></div>

       
           
                <div class="footer-banner">   
                    <<!--img src="./img/footer.png" width="600" height="200">-->
                </div> 
                       

       
            `
        }
    };

    root.innerHTML = view.login();
};



function addListeners(){
    
    console.log('iniciando login... ');
    
    let frmLogin = document.getElementById('frmLogin');
    let btnIniciar = document.getElementById('btnIniciar');
    frmLogin.addEventListener('submit',(e)=>{
        e.preventDefault();

        almacenarCredenciales();

        btnIniciar.innerHTML = '<i class="fal fa-unlock fa-spin"></i>';
        btnIniciar.disabled = true;
        apigen.empleadosLogin(frmLogin.cmbSucursal.value,frmLogin.txtUser.value.trim(),frmLogin.txtPass.value.trim())
        .then(()=>{
            //document.body.requestFullscreen();
            //por lo visto se deshabilitan las scroll bars en fullscreen
            selectDateDownload();
        })
        .catch(()=>{
            btnIniciar.disabled = false;
            btnIniciar.innerHTML = '<i class="fal fa-unlock"></i>Ingresar'
        });
    });


    //carga las sucursales directamente desde código
    document.getElementById('cmbSucursal').innerHTML = '<option value="" disabled selected hidden>Selecciona una sede</option>' + funciones.getComboSucursales();

    selectDateDownload() //carga la info inicial
    .then(()=>{
        try {
            document.getElementById('cmbSucursal').value = GlobalCodSucursal;
            console.log(GlobalCodSucursal);
        } catch (error) {
            console.log('error al cargar sucursal')
            console.log(error)
        }
    })
   
  
};


function InicializarVista(){
   getView();
   addListeners();

   //getCredenciales();
 

};


async function almacenarCredenciales(){
    const cred = new PasswordCredential({
        id: document.getElementById('txtUser').value,
        name: document.getElementById('cmbSucursal').value,
        password: document.getElementById('txtPass').value
    })

    await navigator.credentials.store(cred)

};

function getCredenciales(){
   if ('credentials' in navigator) {
  navigator.credentials.get({password: true})
  .then(function(creds) {

      console.log(creds);
    //Do something with the credentials.
    document.getElementById('txtUser').value = creds.id;
    document.getElementById('cmbSucursal').value = creds.name;
    document.getElementById('txtPass').value = creds.password;

  });
    } else {
    //Handle sign-in the way you did before.
    };
}