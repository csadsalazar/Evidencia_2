import { LitElement, html } from 'lit-element';
import adminstyle from "./dashboard-admin-styles";

export class AdminDashboard extends LitElement {
  constructor() {
    super();
    this.activeTab = 'pacientes';
    this.showModal = false;
    this.showRegistrationForm = true;
  }

  static get properties() {
    return {
      activeTab: { type: String },
      showModal: { type: Boolean },
      showRegistrationForm: { type: Boolean },
    };
  }

  static get styles() {
    return [adminstyle];
  }


  newPaciente() {
    // Obtén los valores de los campos del paciente
    const documentoPac = this.shadowRoot.getElementById("documentoPac").value;
    const nombrePac = this.shadowRoot.getElementById("nombrePac").value;
    const apePac = this.shadowRoot.getElementById("apePac").value;
    const celularPac = this.shadowRoot.getElementById("celularPac").value;
    const emailPac = this.shadowRoot.getElementById("emailPac").value;
    const password = this.shadowRoot.getElementById("password").value;

    // Obtén la lista actual de pacientes
    const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

    if (this.pacienteEditando) {
      // Si se está editando, actualiza los datos del paciente
      const index = pacientes.findIndex((item) => item.documentoPac === this.pacienteEditando.documentoPac);
      if (index !== -1) {
        pacientes[index] = {
          documentoPac,
          nombrePac,
          apePac,
          celularPac,
          emailPac,
          password,
        };
      }
    } else {
      // Si no se está editando, agrega un nuevo paciente
      pacientes.push({
        documentoPac,
        nombrePac,
        apePac,
        celularPac,
        emailPac,
        password,
      });
    }

    // Almacena la lista actualizada de pacientes en el almacenamiento local
    localStorage.setItem('pacientes', JSON.stringify(pacientes));

    // Limpia los campos y el estado de edición
    this.resetModalFields();

    // Recarga la vista
    this.requestUpdate();
  }

  // Actualiza la función para editar pacientes
  editarPaciente(paciente) {
    // Abre el modal de edición con los datos del paciente
    this.showModal = true;
    this.modalTitle = "Editar Paciente";

    // Establece los campos del modal con los datos del paciente
    this.documentoPac = paciente.documentoPac;
    this.nombrePac = paciente.nombrePac;
    this.apePac = paciente.apePac;
    this.celularPac = paciente.celularPac;
    this.emailPac = paciente.emailPac;
    this.password = paciente.password;

    // Almacena el paciente que se está editando
    this.pacienteEditando = paciente;
  }

  eliminarPaciente(paciente) {
    let pacientes = JSON.parse(localStorage.getItem('pacientes'));

    // Encuentra el índice del paciente que se va a eliminar
    const index = pacientes.findIndex(item => item.documentoPac === paciente.documentoPac);

    if (index !== -1) {
      // Elimina el paciente del arreglo
      pacientes.splice(index, 1);

      // Actualiza los datos en el almacenamiento local
      localStorage.setItem('pacientes', JSON.stringify(pacientes));

      // Actualiza la vista
      this.requestUpdate();
    }
  }

  newDoctor() {
    const documentoDocs = this.shadowRoot.getElementById("documentoDoc").value;
    const nombreDocs = this.shadowRoot.getElementById("nombreDoc").value;
    const apeDocs = this.shadowRoot.getElementById("apeDoc").value;
    const especialidads = this.shadowRoot.getElementById("especialidad").value;
    const estadoDocs = this.shadowRoot.getElementById("estadoDoc").value;

    const forDataMedico = JSON.parse(localStorage.getItem('medicos')) || [];

    if (this.medicoEditando) {
      // Si se está editando, actualiza los datos del médico
      const index = forDataMedico.findIndex(item => item.documentoDoc === this.medicoEditando.documentoDoc);
      if (index !== -1) {
        forDataMedico[index] = {
          documentoDoc: documentoDocs,
          nombreDoc: nombreDocs,
          apeDoc: apeDocs,
          especialidad: especialidads,
          estadoDoc: estadoDocs,
        };
      }
    } else {
      // Si no se está editando, agrega un nuevo médico
      forDataMedico.push({
        documentoDoc: documentoDocs,
        nombreDoc: nombreDocs,
        apeDoc: apeDocs,
        especialidad: especialidads,
        estadoDoc: estadoDocs,
      });
    }

    localStorage.setItem('medicos', JSON.stringify(forDataMedico));

    this.msg = "Médico Creado o Actualizado";
    Swal.fire({
      title: this.msg,
      icon: "success"
    });

    // Restablece los campos y el estado de edición
    this.resetModalFields();
  }

  resetModalFields() {
    this.showModal = false;
    this.modalTitle = "Agregar Nuevo Registro";
    this.documentoDocs = "";
    this.nombreDocs = "";
    this.apeDocs = "";
    this.especialidads = "";
    this.estadoDocs = "";
    this.medicoEditando = null;
  }


  editarMedico(medico) {
    // Abre el modal de edición con los datos del médico
    this.showModal = true;
    this.modalTitle = "Editar Médico";

    // Establece los campos del modal con los datos del médico
    this.documentoDocs = medico.documentoDoc;
    this.nombreDocs = medico.nombreDoc;
    this.apeDocs = medico.apeDoc;
    this.especialidads = medico.especialidad;
    this.estadoDocs = medico.estadoDoc;

    // Almacena el médico que se está editando
    this.medicoEditando = medico;
  }


  eliminarMedico(medico) {
    let medico_record = JSON.parse(localStorage.getItem('medicos'));

    // Encuentra el índice del médico que se va a eliminar
    const index = medico_record.findIndex(item => item.documentoDoc === medico.documentoDoc);

    if (index !== -1) {
      // Elimina el médico del arreglo
      medico_record.splice(index, 1);

      // Actualiza los datos en el almacenamiento local
      localStorage.setItem('medicos', JSON.stringify(medico_record));

      // Actualiza la vista
      this.requestUpdate();
    }
  }


    render() {
        return html`
      <div class="sidebar">
        <a href="#" class="menu-item" @click=${() => this.changeTab('medicos')}>Médicos</a>
        <a href="#" class="menu-item" @click=${() => this.changeTab('pacientes')}>Pacientes</a>
      </div>

      <div class="main-content">
        <h1>Panel de Administración</h1>
        <div class="table-container">
        ${this.activeTab === 'medicos' ? this.renderContentDoc() : ''}
        ${this.activeTab === 'pacientes' ? this.renderContentPacientes() : ''}
        <br>
        <button @click=${this.openModal}>Agregar</button>
    </div>
    </div>
    ${this.showModal ? this.renderModal() : ''}
`;
}

  changeTab(tab) {
    this.activeTab = tab;
  }

  renderContentPacientes() {
    let pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];

    return html`
        <h2>${this.activeTab.charAt(0).toUpperCase() + this.activeTab.slice(1)}</h2>
        <table>
          <tr>
            <th>Documento</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Celular</th>
            <th>E-mail</th>
            <th>Password</th>
            <th>Acciones</th>
          </tr>
          ${pacientes.map(
      (paciente) => html`
              <tr>
                <td>${paciente.documentoPac}</td>
                <td>${paciente.nombrePac}</td>
                <td>${paciente.apePac}</td>
                <td>${paciente.celularPac}</td>
                <td>${paciente.emailPac}</td>
                <td>${paciente.password}</td>
                <td>
                  <button @click=${() => this.editarPaciente(paciente)}>Editar</button>
                  <button @click=${() => this.eliminarPaciente(paciente)}>Eliminar</button>
                </td>
              </tr>
            `
    )}
        </table>
      `;
  }


  renderContentDoc() {
    let medico_record = JSON.parse(localStorage.getItem('medicos'))  || [];
    return html`
      <h2>${this.activeTab.charAt(0).toUpperCase() + this.activeTab.slice(1)}</h2>
      <table>
        <tr>
          ${this.activeTab === 'medicos' ? html`
            <th>Documento</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Especialidad</th>
            <th>Estado</th>
            <th>Acciones</th>` : ''}
        </tr>
        ${medico_record.map(
          medico_record => html`
            <tr>
            
              <td>${medico_record.documentoDoc}</td>
              <td>${medico_record.nombreDoc}</td>
              <td>${medico_record.apeDoc}</td>
              <td>${medico_record.especialidad}</td>
              <td>${medico_record.estadoDoc}</td>
              <td>
                <button @click=${() => this.editarMedico(medico_record)}>Editar</button>
                <button @click=${() => this.eliminarMedico(medico_record)}>Eliminar</button>
              </td>
            </tr>
          `
        )}
      </table>
    `;
  }



  renderModal() {

    let teamData=JSON.parse(localStorage.getItem("medicos"))

    let modalTitle = "Agregar Nuevo Registro";

   if (this.activeTab === 'medicos') {
        modalTitle = "Agregar Nuevo Médico";
    } else if (this.activeTab === 'pacientes') {
        modalTitle = "Agregar Nuevo Paciente";
    }

    return html`
  <div class="modal">
    <div class="modal-content">
      <span @click=${this.closeModal} class="close">&times;</span>
      <h2>${modalTitle}</h2>
      <form @submit=${this.onSubmit}>

                  
      ${this.activeTab === 'pacientes' ? html`
      <label for="documentoPac">Documento:</label>
      <input
        type="text"
        id="documentoPac"
         value=${this.documentoPac}
      >
      <!-- Agrega otros campos del paciente (nombre, apellido, celular, email) aquí -->
      <label for="nombrePac">Nombre:</label>
      <input type="text" id="nombrePac" value=${this.nombrePac}>
      <label for="apePac">Apellido:</label>
      <input type="text" id="apePac" value=${this.apePac}>
      <label for="celularPac">Celular:</label>
      <input type="text" id="celularPac" value=${this.celularPac}>
      <label for="emailPac">Email:</label>
      <input type="text" id="emailPac" value=${this.emailPac}>
      <label for="password">Password:</label>
      <input type="text" id="password" value=${this.password}>
      <button @click="${this.newPaciente}" class="btn btn-block btn-success">
        Agregar
      </button>
      ` : ''}

        ${this.activeTab === 'medicos' ? html`
        <label for="documentoDoc">Documento:</label>
        <input 
        type="text"
        id="documentoDoc"
        value=${this.documentoDocs}
      >
        <label for="nombreDoc">Nombre:</label>
        <input type="text" id="nombreDoc" value=${this.nombreDocs}>

        <label for="apeDoc">Apellido:</label>
        <input type="text" id="apeDoc" value=${this.apeDocs}>
          <label for="especialidad">Especialidad:</label>
          <input 
          type="text" 
          id="especialidad" 
          value=${this.especialidads} 
        >
          <label for="estadoDoc">Estado:</label>
          <input type="text" id="estadoDoc" value=${this.estadoDocs}>

          <button @click="${this.newDoctor}" class="btn btn-block btn-success">
          Agendar
        </button>
          ` : ''}

          ${this.showRegistrationForm ? html`<registro-component></registro-component>` : html``}
      </form>
    </div>
  </div>
`;
}





  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}

customElements.define('admin-dashboard', AdminDashboard);