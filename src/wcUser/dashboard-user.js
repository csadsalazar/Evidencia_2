
import { LitElement, html } from 'lit-element';
import userstyle from "./dashboard-user-styles";

export class UserDashboard extends LitElement {
  constructor() {
    super();
    this.msg = ""
    this.activeTab = 'citas';
    this.showModal = false;
    this.showCitaModal = false;
    this.showRecetaModal = false;
    this.medicamentoRecetado = '';
    this.tableData = {
      citas: JSON.parse(localStorage.getItem('citas')) || [],
      medicos: JSON.parse(localStorage.getItem('medicos')) || [], // Cargar desde el almacenamiento local
    };
  }

  static get properties() {
    return {
      activeTab: { type: String },
      showModal: { type: Boolean },
      tableData: { type: Object },
      showRecetaModal: { type: Boolean },
      medicamentoRecetado: { type: String },
    };
  }

  static get styles() {
    return [userstyle];
  }


  render() {
    return html`
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
      <script src="https://kit.fontawesome.com/8232721784.js" crossorigin="anonymous"></script>  
      <div class="sidebar">
        <a href="#" class="menu-item " @click=${() => this.changeTab('citas')}>Agendar Citas</a>
      </div>

      <div class="main-content">
        <h1>Panel de Usuario</h1>
        <div class="table-container">
          ${this.renderContent()}
          <br>
          <button class="btn btn-primary" @click=${this.openModal}>Agregar Cita</button>
          <button class="btn btn-success" @click=${this.generateReceta}>Ver mi receta médica</button>
        </div>
      </div>

      ${this.showModal ? this.renderModal() : ''}
      ${this.showRecetaModal ? this.renderRecetaModal() : ''}
    `;
  }

  changeTab(tab) {
    this.activeTab = tab;
  }

  checkDuplicateDate(newDate) {
    return this.tableData[this.activeTab].some(data => data.horaCita === newDate);
  }

  citas() {
    const nombre = this.shadowRoot.querySelector('#nombre').value;
    const fechaCita = this.shadowRoot.querySelector('#fechaCita').value;
    const horaCita = this.shadowRoot.querySelector('#horaCita').value;
    const doctorSelect = this.shadowRoot.querySelector("#forDataMedico");
    const doctorSelect2 = this.shadowRoot.querySelector("#especialidad");
    const detalles = this.shadowRoot.querySelector('#detalles').value;
    const selectedDoctor = doctorSelect.value;
    const selectedDoctor2 = doctorSelect2.value;
  
    const registroCita = JSON.parse(localStorage.getItem('citas')) || [];
  
    registroCita.push({
      id: registroCita.length + 1, // Generate a unique ID
      nombre: nombre,
      fechaCita: fechaCita,
      horaCita: horaCita,
      detalles: detalles,
      doctorNombre: selectedDoctor,
      especialidad: selectedDoctor2, // Assuming you want the same value for doctor and speciality
    });
  
    localStorage.setItem('citas', JSON.stringify(registroCita));
  
    this.msg = "Cita Agendada";
    Swal.fire({
      title: this.msg,
      icon: "success",
    });
  
    // Trigger a re-render
    this.requestUpdate();
  }
  


renderContent() {
  return html`
    <h2>Citas</h2>
    <table>
      <tr>
        <th>Id</th>
        <th>Nombre</th>
        <th>Fecha de cita</th>
        <th>Hora de cita</th>
        <th>Médico</th>
        <th>Especialidad</th>
        <th>Detalles de la cita</th>
        <th>Cancelar</th>
      </tr>
      ${this.tableData[this.activeTab].map(data => {
        return html`
          <tr>
            <td>${data.id}</td>
            <td>${data.nombre}</td>
            <td>${data.fechaCita}</td>
            <td>${data.horaCita}</td>
            <td>${data.doctorNombre}</td>
            <td>${data.especialidad}</td>
            <td>${data.detalles}</td>
            <td>
              <button class="btn btn-danger" @click=${() => this.deleteCita(data.id)}>Eliminar</button>
            </td>
          </tr>
        `;
      })}
    </table>
  `;
}

generateReceta() {
  const medicamentos = ['Paracetamol 20mg', 'Ibuprofeno 15mg', 'Aspirina 12mg', 'Amoxicilina 30mg'];
  const medicamentoAleatorio = medicamentos[Math.floor(Math.random() * medicamentos.length)];

  this.showRecetaModal = true;
  this.medicamentoRecetado = medicamentoAleatorio;
}
  

  renderModal() {
    const forDataMedico = JSON.parse(localStorage.getItem('medicos')) || [];
  
    const modalTitle = 'Agregar Nueva Cita';

    return html`
      <div class="modal">
        <div class="modal-content">
          <span @click=${this.closeModal} class="close">&times;</span>
          <h2>${modalTitle}</h2>
        
            <label for="nombre">Nombre:</label>
            <input type text" id="nombre" value=${this.nombre} @input=${this.updateFormData}>
            <label for="fechaCita">Fecha de cita:</label>
            <input type="date" id="fechaCita" value=${this.fechaCita} @input=${this.updateFormData}>
            <label for="horaCita">Hora cita:</label>
            <input type="time" id="horaCita" value=${this.horaCita} @input=${this.updateFormData}>
            
            <label htmlFor="selectOption">Médico:</label>
<select id="forDataMedico" name="forDataMedico">
  ${forDataMedico.map(
    (forDataMedico) => html`
      <option value="${forDataMedico.nombreDoc} ${forDataMedico.apeDoc}">
        ${forDataMedico.nombreDoc} ${forDataMedico.apeDoc}
      </option>
    `
  )}
</select>

<label htmlFor="selectOption">Especialidad:</label>
<select id="especialidad" name="especialidad">
  ${forDataMedico.map(
    (forDataMedico) => html`
      <option value="${forDataMedico.especialidad}">
        ${forDataMedico.especialidad}
      </option>
    `
  )}
</select>


            <label for="detalles">Detalles de la cita:</label>
            <input type="text" id="detalles" value=${this.detalles} @input=${this.updateFormData}>
            <button @click="${this.onSubmit}" class="btn btn-primary">Agregar</button>
          
        </div>
      </div>
    `;
  }

  renderRecetaModal() {
    return html`
      <div class="modal fade show" ?hidden="${!this.showRecetaModal}" tabindex="-1" role="dialog">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Medicamento Recetado</h5>
              <button type="button" class="btn-close" @click=${this.closeRecetaModal}></button>
            </div>
            <div class="modal-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Medicamento</th>
                    <th scope="col">Sugerencias</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>${this.medicamentoRecetado}</td>
                    <td>Recuerda descansar lo suficiente.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click=${this.closeRecetaModal}>Cerrar</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  openModal() {
    this.showModal = true;
    this.showRecetaModal = false;
  }

  openRecetaModal() {
    this.showRecetaModal = true;
    this.showCitaModal = false;
  }

  closeModal() {
    this.showModal = false;
  }
  closeRecetaModal(){
    this.showRecetaModal = false;
  }

  updateFormData(event) {
    const field = event.target.id;
    const value = event.target.value;
    this.registroCita = {
      ...this.registroCita,
      [field]: value,
    };
  }

  deleteCita(id) {
    const cita = this.tableData[this.activeTab];
    const index = cita.findIndex(cita => cita.id === id);

    if (index !== -1) {
      cita.splice(index, 1);
      // Actualizar el almacenamiento local después de eliminar la cita
      localStorage.setItem('citas', JSON.stringify(cita));
      this.requestUpdate();
    }
  }

 

  

  onSubmit() {
    const newDate = this.registroCita.horaCita;

    if (this.checkDuplicateDate(newDate)) {
      // Muestra una alerta de error si la fecha ya existe en una cita anterior
      alert('Error: La hora seleccionada ya se encuentra ocupada.');
      return;
    }
    const newRecord = {
      id: this.tableData[this.activeTab].length + 1,
      ...this.registroCita,
    };

    this.tableData[this.activeTab] = [...this.tableData[this.activeTab], newRecord];
    this.showModal = false;

    this.citas()
    window.location.reload()
  }
}

customElements.define('user-dashboard', UserDashboard);
