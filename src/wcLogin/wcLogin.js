import { LitElement, html } from "lit-element";
import loginStyle from "./wcLoginStyle.js";
import { AdminDashboard } from "../wcAdmin/dashboard-admin.js";
import { Router } from '@vaadin/router';
import { Logins } from '../wcSignUp/registro.js'
import './routes.js'

export class Logines extends LitElement {
  constructor() {
    super();
    this.msg = "";
    this.showError = true
    this.admin = "c@admin.com"
    this.adminPassword = "c"
  }

  static get properties() {
    return {
      msg: {
        type: String,
      },
      lulo: {
        type: String
      },
      showError: {
        type: Boolean
      },
      admin: {
        type: String
      },
      adminPassword: {
        type: String
      }
    };
  }

  static get styles() {
    return [loginStyle];
  }

  static get scopedElements(){
    return{
      "admin-dashboard": AdminDashboard,
      "login-component": Logins,
    }
  }


goToDashboardAdmin(){
  const bSignUp = this.shadowRoot.querySelector(".body")
  Router.go('/Dashboard-Admin')
  bSignUp.style.display = "none"
}

goToDashboardUser(){
  const bSignUp = this.shadowRoot.querySelector(".body")
  Router.go('/Dashboard-User')
  bSignUp.style.display = "none"
}

  checkingData() {

    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

    const email = this.shadowRoot.getElementById("emailPac").value
    const password = this.shadowRoot.getElementById("password").value
    const bLogin = this.shadowRoot.querySelector(".body")

    const admin = this.admin
    const adminPass = this.adminPassword

    if (email == null || email == "" || email == undefined) {
      this.msg = "Atención... Campo E-mail vacío."
      Swal.fire({
          title: "Ingrese el campo",
          text: this.msg,
          icon: "info"
        }); 
      return false;
    } else if (password == null || password == "" || password == undefined) {
      this.msg = "Atención... Campo Password vacío.";
      Swal.fire({
          title: "Ingrese el campo",
          text: this.msg,
          icon: "info"
        }); 
      return false;
    }

    if (email == admin && password == adminPass) {
      alert('You are the admin')
      this.goToDashboardAdmin()
    }
    

    else if(pacientes.some((v) =>{
      return v.emailPac==email && v.password==password
    })){
    alert(`Welcome ${email}`)
    this.goToDashboardUser()
    }
    else{
      this.msg = "Las credenciales NO son correctas";
      Swal.fire({
        title: "ERROR",
        text: this.msg,
        icon: "error"
      }); 
    return false;
    }

    this.shadowRoot.getElementById("emailPac").value = ""
    this.shadowRoot.getElementById("password").value = ""
  }

  mostrarError() {
    return this.showError
      ? html` <div class="error">
      <div class="error__icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          viewBox="0 0 24 24"
          height="24"
          fill="none"
        >
          <path
            fill="#393a37"
            d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
          ></path>
        </svg>
      </div>
      <div class="error__title">${this.msg}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          viewBox="0 0 20 20"
          height="20"
        >
          <path
            fill="#393a37"
            d="m15.8333 5.34166-1.175-1.175-4.6583 4.65834-4.65833-4.65834-1.175 1.175 4.65833 4.65834-4.65833 4.6583 1.175 1.175 4.65833-4.6583 4.6583 4.6583 1.175-1.175-4.6583-4.6583z"
          ></path>
        </svg>
      </div>
    </div>
    `
      : html``;
  }

  

  render() {
    return html`
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossorigin="anonymous"
      />

      <div id="durus"></div>

      <div class="body">
        <div class="container">
          <div class="heading">Sign In</div>
          <div class="form">
            ${this.mostrarError()}
            <input
              class="input"
              type="email"
              name="emailPac"
              id="emailPac"
              placeholder="E-mail"
              autofocus=""
            />
            <input
              class="input"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <span class="forgot-password"
              ><a href="#">Forgot Password ?</a></span
            >
            
            <button class="login-button" @click="${this.checkingData}">
              Submit
            </button>
          </div>
          <div class="social-account-container">
            <span class="title">Or Sign in with      ${this.lulo}</span>
            <div class="social-accounts">
              <button class="social-button google">
                <svg
                  class="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 488 512"
                >
                  <path
                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                  ></path>
                </svg>
              </button>
              <button class="social-button apple">
                <svg
                  class="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 384 512"
                >
                  <path
                    d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                  ></path>
                </svg>
              </button>
              <button class="social-button twitter">
                <svg
                  class="svg"
                  xmlns="http://www.w3.org/2000/svg"
                  height="1em"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
          <span class="agreement"
            ><a href="#">Learn user licence agreement</a></span
          >
  
        </div>
          </div>
      </div>

      <script type="module" src="./routes.js"></script>
    `;
  }
}

customElements.define("login-hola", Logines);
