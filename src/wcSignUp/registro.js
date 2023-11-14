  import { LitElement, html } from "lit-element";
  import tyleSheet from "../wcSignUp/registros";
  import { Logines } from '../wcLogin/wcLogin.js';
import { Router } from "@vaadin/router";

  export class Logins extends LitElement {
    constructor() {
      super();
    }
    static get styles() {
      return [tyleSheet];
    }

    static get scopedElements(){
      return{
        "login-hola": Logines,
      }
    }

    
    goToLogin(){
      const bLogin = this.shadowRoot.querySelector(".body")
      Router.go('/Login')
      bLogin.style.display = "none";
    }

  guardarDatosEnLocalStorage() {
  // Obtener los valores del formulario
      const nombreInput = this.shadowRoot.getElementById("nombre");
      const apellidoinput = this.shadowRoot.getElementById("apellido");
      const documentoInput = this.shadowRoot.getElementById("documento");
      const celularinput= this.shadowRoot.getElementById("celular");
      const emailInput = this.shadowRoot.getElementById("email");
      const passwordInput = this.shadowRoot.getElementById("password");


  //     // Obtener los datos almacenados previamente en el localStorage
      const Registro = JSON.parse(localStorage.getItem('pacientes')) || [];

      // Crear un objeto con los datos del usuario actual
      const nuevoUsuario = {
          nombrePac: nombreInput.value,
          apePac: apellidoinput.value,
          documentoPac: documentoInput.value,
          celularPac: celularinput.value,
          emailPac: emailInput.value,
          password: passwordInput.value,

      };

      // Agregar el nuevo usuario a la matriz de usuarios
      Registro.push(nuevoUsuario);

      // Guardar la matriz de usuarios en localStorage
      localStorage.setItem('pacientes', JSON.stringify(Registro));

      // Limpiar los campos del formulario
      nombreInput.value = '';
      apellidoinput.value = '';
      documentoInput.value = '';
      celularinput.value = '';
      emailInput.value = '';
      passwordInput.value = '';

      // Puedes mostrar un mensaje o realizar otras acciones después de guardar los datos
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
    }


    render() {
      return html`

      <div class="body">
          <div class="form">
              <p class="title">Register </p>
              <p class="message">Signup now and get full access to our app. </p>
                <div class="flex">
                    <label>
                        <input class="input" type="text" placeholder="Firstname" required="" id="nombre" autofocus="">
                    </label>
            
                    <label>
                        <input class="input" type="text" placeholder="Lastname" required="" id="apellido">
                    </label>
                </div>  
                  <div class="flex">
                    <label>
                        <input class="input" type="number" placeholder="documento" required="" id="documento">
                    </label>

                    <label>
                        <input class="input" type="number" placeholder="Celular" required="" id="celular">
                    </label>
              </div>  
          <label>
              <input class="input" type="email" placeholder="Email" required="" id="email">
          </label> 
              
          <label>
              <input class="input" type="password" placeholder="Password" required="" id="password">
          </label>

          <button class="submit" @click="${this.guardarDatosEnLocalStorage}" >Submit</button>
          <button @click="${this.goToLogin}">Ya tienes una cuenta?</button>

        </div>
        </div>

        `
    }
  }

  customElements.define("login-component", Logins);
