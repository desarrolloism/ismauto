import { Component, OnInit } from '@angular/core';
import { PoaService } from '../../services/poa.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

declare var bootstrap: any;

@Component({
  selector: 'app-poa-detail',
  templateUrl: './poa-detail.component.html',
  styleUrl: './poa-detail.component.css'
})
export class PoaDetailComponent {
  poaId: number = 0;
  token = localStorage.getItem('token');
  poaDetail: any = {};
  allActivities!: any;
  newActivity: any;
  dataActivity: any;
  dataUpdateActivity: any;
  isEditing: boolean = false;
  editingActivityId: number | null = null;
  editingActivity: any = {};
  dataDeleteActivity: any;
  searchTerm: string = '';
  searchResults: any[] = [];
  avatar: string = '';
  name: string = '';
  email: string = '';
  last_name: string = '';
  fullname: string = '';
  is_admin: boolean = false;
  dni: string = '';
  users: any;
  usersId: any;
  signaturesList: any;
  firstUser: string = '';
  accounting_list: any;
  compers_list: any;
  percetagePerCampus: any;


  signature = {
    coments: '',
    is_accepted: false,
    date_accepted: '',
  }

  upPoa = {
    area: '',
    commission: '',
    department: '',
    ccpf: '',
    student_council: '',
    name: '',
    responsible: '',
    academic_year_id: 19,
    objective: '',
    total_resources: 0,
    total_aproved: 0,
    company: '',
    campus: '',
    priority: '',
    status: '',
    coment_rejected: '',
    user_ci: ''
  }


  selectedStatus: string = '';
  taskStates = ['APROBADO', 'RECHAZADO'];
  showRejectComment: boolean = false;

  createPoa = {
    poa_id: 0,
    activity_id: 0,
    area_id: 0,
    responsible_id: 0,
    activity: '',
    start_date: '',
    end_date: '',
    resources_detail: '',
    resources_ammount: 0,
    approved_ammount: 0,
    comments: '',
    accounting_count: '',
    priority: '',
    approved_activity: '',
    responsible: ''
  }
  companies: string[] = ['Company A', 'Company B', 'Company C', 'Company D'];
  activityId: number = 0;
  originalActivities: any[] = [];
  isFilterActive: boolean = false;
  selectedUserId: any = [];
  actualDate: any;

  rejectComment: string = '';

  //genera un pdf de la actividad
  downloadActivityPDF(activity: any) {
    const doc = new jsPDF();

    //Agregar logo
    //se agg la img
    const logoURL = 'assets/images/logo.png';
    const logoWidth = 20;
    const logoHeight = 10;
    doc.addImage(logoURL, 'PNG', 10, 10, logoWidth, logoHeight);

    //Título principal
    doc.setFontSize(14);
    doc.setTextColor(41, 128, 185); // Color azul
    doc.text(`${this.poaDetail.name}`, 105, 25, { align: 'center' });

    //Subtítulo
    doc.setFontSize(10);
    doc.setTextColor(0); // Color negro
    doc.text(`Responsable: ${this.poaDetail.responsible}`, 105, 35, { align: 'center' });


    //Departamento
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128); // Color negro
    doc.text(`Departamento: ${this.poaDetail.department}`, 105, 42, { align: 'center' });

    //Fecha de generación del informe
    const today = new Date().toLocaleDateString();
    doc.setFontSize(10);
    if (this.poaDetail.academic_year_id == 19) {
      doc.text(`Periodo: 2024-2025`, 195, 10, { align: 'right' });
    } else {
      doc.text(`Periodo: No encontrada`, 195, 10, { align: 'right' });
    }

    // Fecha de generación en verde
    const today1 = new Date().toLocaleDateString();
    doc.setFontSize(8);
    doc.setTextColor(0, 128, 0);  // Verde oscuro
    doc.text(`Fecha de generación: ${today1}`, 195, 15, { align: 'right' });

    //Tabla de datos
    const columns = ['Campo', 'Valor'];
    if (activity.approved_amount && activity.accounting_count) {
      const data = [
        ['Actividad', activity.activity],
        ['Fecha de inicio', new Date(activity.start_date).toLocaleDateString()],
        ['Fecha de fin', new Date(activity.end_date).toLocaleDateString()],
        ['Detalle de recursos', activity.resources_detail],
        ['Monto de recursos', activity.resources_amount],
        ['Monto aprobado', activity.approved_amount],
        ['Cuenta contable', activity.accounting_count],
        ['Prioridad', activity.priority],
      ];

      (doc as any).autoTable({
        startY: 45,
        head: [columns],
        body: data,
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        styles: { overflow: 'linebreak', cellWidth: 'wrap' },
        columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 'auto' } }
      });
    } else if (activity.approved_activity === 'RECHAZADO') {

      const data = [
        ['Actividad', activity.activity],
        ['Fecha de inicio', new Date(activity.start_date).toLocaleDateString()],
        ['Fecha de fin', new Date(activity.end_date).toLocaleDateString()],
        ['Detalle de recursos', activity.resources_detail],
        ['Monto de recursos', activity.resources_amount],
        ['Monto aprobado', 'Monto para actividad rechazada.'],
        ['Cuenta contable', 'N/A'],
        ['Prioridad', activity.priority],
      ];

      (doc as any).autoTable({
        startY: 45,
        head: [columns],
        body: data,
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        styles: { overflow: 'linebreak', cellWidth: 'wrap' },
        columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 'auto' } }
      });

    } else {
      const data = [
        ['Actividad', activity.activity],
        ['Fecha de inicio', new Date(activity.start_date).toLocaleDateString()],
        ['Fecha de fin', new Date(activity.end_date).toLocaleDateString()],
        ['Detalle de recursos', activity.resources_detail],
        ['Monto de recursos', activity.resources_amount],
        ['Monto aprobado', 'El monto aún no ha sido aprobado.'],
        ['Cuenta contable', 'N/A'],
        ['Prioridad', activity.priority],
      ];

      (doc as any).autoTable({
        startY: 45,
        head: [columns],
        body: data,
        theme: 'striped',
        headStyles: { fillColor: [41, 128, 185], textColor: 255 },
        styles: { overflow: 'linebreak', cellWidth: 'wrap' },
        columnStyles: { 0: { cellWidth: 50 }, 1: { cellWidth: 'auto' } }
      });
    }

    //Sección de comentarios
    if (activity.comments) {
      const finalY = (doc as any).lastAutoTable.finalY || 45;
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text('Comentarios:', 14, finalY + 10);

      doc.setFontSize(10);
      const splitComments = doc.splitTextToSize(activity.comments, 180);

      let yPosition = finalY + 20;
      const pageHeight = doc.internal.pageSize.height;

      splitComments.forEach((line: string) => {
        if (yPosition + 10 > pageHeight - 20) {
          doc.addPage();
          yPosition = 20; // Reinicia la posición Y en la nueva página
        }
        doc.text(line, 14, yPosition);
        yPosition += 7; // Incrementa la posición Y para la siguiente línea
      });
    } else {

      const finalY = (doc as any).lastAutoTable.finalY || 45;
      doc.setFontSize(12);
      doc.setTextColor(0);
      doc.text('Comentarios:', 14, finalY + 10);

      doc.setFontSize(10);
      const splitComments = doc.splitTextToSize('Esta actividad aún no tiene comentarios.', 180);

      let yPosition = finalY + 20;
      const pageHeight = doc.internal.pageSize.height;

      splitComments.forEach((line: string) => {
        if (yPosition + 10 > pageHeight - 20) {
          doc.addPage();
          yPosition = 20; // Reinicia la posición Y en la nueva página
        }
        doc.text(line, 14, yPosition);
        yPosition += 7; // Incrementa la posición Y para la siguiente línea
      });

    }


    // 7. Pie de página
    // const pageCount = doc.internal.getNumberOfPages();
    // doc.setFontSize(10);
    // for (let i = 1; i <= pageCount; i++) {
    //   doc.setPage(i);
    //   doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: 'center' });
    //   doc.text('Documento generado automáticamente', 105, 295, { align: 'center' });
    // }

    //Guardar el PDF
    doc.save(`actividad_${activity.activity}.pdf`);
  }



  //Función para seleccionar el id del usuario
  onUserSelect(event: any) {
    this.selectedUserId = this.usersId;
    console.log(this.usersId);
  }

  constructor(
    private _poaService: PoaService,
    private _router: Router,
    private _routeActivated: ActivatedRoute,
    private _userServ: UsersService
  ) {
    this.actualDate = this.getFechaActual();
  }

  ngOnInit() {
    this._routeActivated.params.subscribe(params => {
      this.poaId = +params['id'];
      // console.log(this.poaId);
    });
    this.getPoa();
    this.showActivities();
    this.getAvatar();
    this.getAdmin();
    this.userList();
    this.listSignatures();
    this.getAccounting();
    this.getNameCompers();

  }

  //muestra actividades sin aprobar
  filterPendingActivities() {
    if (!this.isFilterActive) {
      this.allActivities = this.originalActivities.filter(activity => activity.approved_amount == '0.00');
      this.isFilterActive = true;
    }
  }

  clearFilter() {
    if (this.isFilterActive) {
      this.allActivities = [...this.originalActivities];
      this.isFilterActive = false;
    }
  }

  //obtiene fecha actual
  getFechaActual(): string {
    const fecha = new Date();
    const dia = fecha.getDate().toString().padStart(2, '0');
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const anio = fecha.getFullYear().toString().slice(-2);

    return `${dia}-${mes}-${anio}`;
  }

  //obtiene datos del poa
  getPoa() {
    this._poaService.detailPoa(this.token, this.poaId).subscribe((resp: any) => {
      this.poaDetail = resp.data;
      this.selectedStatus = this.poaDetail.status;
      console.log('detalle poa1111111', this.poaDetail);
      this.getCampusesSelected();
    });
  }

  //OBTIENE SI EL POA ES APROBADO O NO
  updateStatus(status: string) {
    this.selectedStatus = status;
    console.log(this.selectedStatus);
    if (status === 'RECHAZADO') {
      this.showRejectComment = true;

    } else {
      this.showRejectComment = false;
      this.onUpdate();
    }
  }

  onConfirmReject() {
    if (confirm('¿Está seguro de rechazar el POA?')) {
      this.onUpdate();
    }
  }

  //actualiza poa
  allCompanies: string[] = ['ISM', 'REWA', 'CONSTRUCTEC', 'IMPAK', 'PAXDEM', 'DIGLO']; // Todas las compañías posibles
  selectedCompany: string = '';
  allCampus = ['QUITO', 'NORTH', 'WEST', 'KIDS', 'ONLINE'];
  selectedCampus: string = '';

  campusPercentaje = 0;

  //verifica las empresas disponible
  getAvailableCompanies(): string[] {
    const selectedCompanyNames = this.poaDetail.company.map((c: { name: any; }) => c.name);
    return this.allCompanies.filter(company => !selectedCompanyNames.includes(company));
  }

  //agrega empresas

  addCompany() {
    if (this.selectedCompany && !this.poaDetail.company.some((c: { name: string; }) => c.name === this.selectedCompany)) {
      this.poaDetail.company.push({ name: this.selectedCompany });
      this.selectedCompany = ''; // Reset the select
    }
  }

  //quita empresa
  removeCompany(companyName: string) {
    this.poaDetail.company = this.poaDetail.company.filter((c: { name: string; }) => c.name !== companyName);
  }

  getAvailableCampus(): string[] {
    const selectedCampusNames = this.poaDetail.campus.map((c: { name: any; }) => c.name);
    return this.allCampus.filter(campus => !selectedCampusNames.includes(campus));
  }

  addCampus() {
    if (this.selectedCampus && !this.poaDetail.campus.some((c: { name: string; }) => c.name === this.selectedCampus)) {
      this.poaDetail.campus.push({ name: this.selectedCampus, percentage: 0 });
      this.selectedCampus = '';
    }
  }

  updateCampusPercentage(index: number, percentage: number) {
    if (percentage >= 0 && percentage <= 100) {
      this.poaDetail.campus[index].percentage = percentage;
    }
  }

  //quita campus
  removeCampus(index: number) {
    this.poaDetail.campus.splice(index, 1);
  }

  onUpdate() {
    if (confirm('¿Está seguro de realizar esta operación?')) {
      let updatedStatus = this.poaDetail.status;
      if (this.selectedStatus === 'RECHAZADO') {
        this.selectedStatus = this.poaDetail.creator_info.name;
      }
      if (this.selectedStatus && this.selectedStatus !== this.poaDetail.status) {
        updatedStatus = this.selectedStatus;
      }
      this._poaService.updatePoa(
        this.token,
        this.poaDetail.id,
        this.poaDetail.area,
        this.poaDetail.academic_year_id,
        this.poaDetail.objective,
        this.poaDetail.total_resources,
        this.poaDetail.total_aproved,
        updatedStatus,
        this.rejectComment
      ).subscribe(
        (resp: any) => {
          if (resp.status === 'ok') {
            this.getPoa();
            this.showRejectComment = false;
            this.rejectComment = '';
            alert('POA actualizado con éxito');
            const modal = document.getElementById('staticBackdrop');
            if (modal) {
              const modalInstance = bootstrap.Modal.getInstance(modal);
              modalInstance.hide();
            }
          }
        },
        (error) => {
          console.error('Error updating POA:', error);
          alert('Error al actualizar el POA');
        }
      );
    }
  }

  //cancela actualizacion de poa
  onCancel() {
    if (window.confirm('¿Está seguro de que desea cancelar el proceso? Los datos se perderán')) {
      this._router.navigate(['/home-poa']);
    }
  }

  //muestra lista de actividades
  showActivities() {
    this._poaService.showPoaActivities(this.token, this.poaId).subscribe((resp: any) => {
      this.allActivities = resp.data;
      this.originalActivities = [...this.allActivities];
      // console.log('actividades', this.allActivities);
    });
  }

  //creacion de actividades
  createActivity() {
    this._poaService.createPoaActivity(
      this.token,
      this.createPoa.poa_id = this.poaId,
      this.createPoa.activity,
      this.createPoa.start_date,
      this.createPoa.end_date,
      this.createPoa.resources_detail,
      this.createPoa.resources_ammount,
      this.createPoa.approved_ammount,
      this.createPoa.comments,
      this.createPoa.accounting_count,
      this.createPoa.priority,
      this.createPoa.approved_activity,
      this.createPoa.responsible
    ).subscribe(resp => {
      this.dataActivity = resp;
      if (this.dataActivity.status === 'ok') {
        const modal = document.getElementById('exampleModal');
        if (modal) {
          const modalInstance = bootstrap.Modal.getInstance(modal);
          modalInstance.hide();
        }
        // Vaciar el formulario
        this.resetCreatePoaForm();
        this.showActivities();
        this.getPoa();
      }
    });
  }

  //obtiene los campus seleccionados por el usuario
  getCampusesSelected() {
    this._poaService.getCampuses(this.token, this.poaDetail.id).subscribe((resp: any) => {
      this.percetagePerCampus = resp.data;
      console.log(this.percetagePerCampus);
    })
  }

  //actualizacion de actividades
  updateActivity(activityId: number) {
    if (this.editingActivity.approved_activity === 'RECHAZADO') {
      this.editingActivity.approved_amount = 0;
      this.editingActivity.accounting_count = '';
    }
    this._poaService.updatePoaActivity(
      this.token,
      activityId,
      this.editingActivity.activity,
      this.editingActivity.start_date,
      this.editingActivity.end_date,
      this.editingActivity.resources_detail,
      this.editingActivity.resources_amount,
      this.editingActivity.approved_amount,
      this.editingActivity.comments,
      this.editingActivity.accounting_count,
      this.editingActivity.priority,
      this.editingActivity.approved_activity,
      this.editingActivity.responsible
    ).subscribe(resp => {
      this.dataUpdateActivity = resp;
      // console.log(this.dataUpdateActivity);
      if (this.dataUpdateActivity.status === 'ok') {
        this.showActivities();
        this.getPoa();
        alert('Actividad actualizada con éxito');

      }
    });
  }

  startEditing(activity: any) {
    this.isEditing = true;
    this.editingActivityId = activity.id;
    this.editingActivity = { ...activity };
    if (!this.editingActivity.approved_activity) {
      this.editingActivity.approved_activity = ''; // O un valor por defecto
    }
  }

  cancelEditing() {
    this.isEditing = false;
    this.editingActivityId = null;
    this.editingActivity = {};
  }

  saveChanges(activityId: number) {
    this.updateActivity(activityId);
    this.sendPercentages();
    this.isEditing = false;
    this.editingActivityId = null;
  }

  // Función para resetear el formulario
  resetCreatePoaForm() {
    this.createPoa = {
      poa_id: 0,
      activity_id: 0,
      area_id: 0,
      responsible_id: 0,
      activity: '',
      start_date: '',
      end_date: '',
      resources_detail: '',
      resources_ammount: 0,
      approved_ammount: 0,
      comments: '',
      accounting_count: '',
      priority: '',
      approved_activity: '',
      responsible: ''
    };
  }

  //obtiene el id de la actividad 
  getActivityId(activityId: number) {
    this.activityId = activityId;
    console.log(this.activityId);
    this.getAllCampusPercentage();
  }

  //elimina actividad
  deleteActivity(activityId: number) {
    if (confirm('¿Está seguro de eliminar esta actividad, este proceso no se puede deshacer?')) {
      this._poaService.deletePoaActivity(this.token, activityId).subscribe(resp => {
        this.dataDeleteActivity = resp;
        // console.log(this.dataDeleteActivity);
        if (this.dataDeleteActivity.status === "ok") {
          this.showActivities();
          this.getPoa();
          alert('Actividad eliminada con éxito');
        }
      });
    }
  }


  //busca actividad de poa 
  onSearch() {
    if (!this.searchTerm.trim()) {
      this.allActivities = [...this.originalActivities];
    } else {
      const searchTermLower = this.searchTerm.toLowerCase().trim();
      this.allActivities = this.originalActivities.filter(activity =>
        activity.activity.toLowerCase().includes(searchTermLower) ||
        activity.resources_detail.toLowerCase().includes(searchTermLower) ||
        activity.comments.toLowerCase().includes(searchTermLower) ||
        activity.accounting_count.toLowerCase().includes(searchTermLower)
      );
    }
  }

  getAvatar() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    // console.log(userData);
    this.avatar = userData.avatar;
    this.name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    this.fullname = this.name + ' ' + this.last_name
    this.dni = userData.dni;
    // console.log(this.dni);
    // console.log(this.name);
    // console.log(this.last_name);
    // console.log(this.email);
  }

  getAdmin() {
    this._poaService.getPoaAdmin(this.token, this.dni).subscribe((resp: any) => {
      // console.log('admin',resp.data);
      this.is_admin = resp.data.is_admin;
      // console.log(this.is_admin);
    })
  }

  userList() {
    this._poaService.allUsers(this.token).subscribe((resp: any) => {
      this.users = resp.data;
      console.log('usuarios', this.users);
    })
  }

  //creacion de firmas
  createSignature() {
    // console.log('fecha actual', this.actualDate);
    // console.log(this.usersId);
    // console.log(this.poaId);
    if (confirm('Está seguro de enviar a aprobar el POA? Una vez enviado no se puede deshacer ni modificar.')) {
      this._poaService.createSignatures(
        this.token,
        this.poaId,
        this.usersId,
        this.signature.coments,
        this.signature.is_accepted,
        this.actualDate
      ).subscribe((resp: any) => {
        if (resp.status === 'ok') {
          this.listSignatures();
          // Cerrar la modal
          const modal = document.getElementById('staticBackdrop');
          if (modal) {
            const bootstrapModal = bootstrap.Modal.getInstance(modal);
            if (bootstrapModal) {
              bootstrapModal.hide();
            }
          }
        }
        // console.log(resp);
        this.listSignatures();
      });
    }
  }


  //listado de firmas
  listSignatures() {
    this._poaService.getSignatures(this.token, this.poaId).subscribe((resp: any) => {
      this.signaturesList = resp.data;
      // console.log('firmas', this.signaturesList);
    })
  }

  //deja aprobar o rechazar POA una vez las actividades hayan sido aprobadas 

  allActivitiesHaveApproval(): boolean {
    return this.allActivities.every((activity: { approved_activity: string; }) => activity.approved_activity && activity.approved_activity.trim() !== '');
  }

  //obtiene cuenta contables 

  getAccounting() {
    this._poaService.contableAccounts(this.token).subscribe((resp: any) => {
      this.accounting_list = resp.data;
      // console.log('cuentas contables', this.accounting_list);
    })
  }

  //obtiene usuarios de compers 
  getNameCompers() {
    this._userServ.getCompersUser(this.token).subscribe((resp: any) => {
      this.compers_list = resp.data;
      // console.log('compers', this.compers_list);
    })
  }

  //crea porcentajes para campuses
  // Método en el componente para enviar los datos de cada campus
  sendPercentages() {
    // Asegúrate de tener los datos cargados antes de enviarlos
    this.percetagePerCampus.forEach((campus: {
      id: number; percentage: number; name: any;
    }) => {
      const headerInstId = campus.id;
      const percentage = campus.percentage;
      this._poaService.sendCampusPercentage(this.token, headerInstId, this.activityId, percentage).subscribe(
        (resp: any) => {
          console.log(`Campus ${campus.name} enviado exitosamente`);
          console.log(resp.data);
        },
        error => {
          console.error(`Error al enviar el campus ${campus.name}:`, error);
        }
      );
    });
  }


  //obtiene los porcentajes decampus para actividades 
  SavedPorcetage: any;
  getAllCampusPercentage() {
    this._poaService.getCampusPercentage(this.token, this.activityId).subscribe((resp: any) => {
      this.SavedPorcetage = resp.data;
      console.log('porcentajes por campus', this.SavedPorcetage);
    })
  }



  //valida solo numeros
  validateNum(event: any) {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
}
