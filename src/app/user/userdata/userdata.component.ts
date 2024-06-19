import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NotificationsService } from '../../services/notifications.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {

  constructor(public _notiServ: NotificationsService, private _router: Router) {
    this.getDataUser();
  }

  @ViewChild('toastElement', { static: false }) toastElement!: ElementRef;

  ngOnInit() {
    document.getElementById('toggleNewPassword')?.addEventListener('click', this.togglePasswordVisibility.bind(this, 'new_password', 'iconNewPassword'));
    document.getElementById('toggleConfirmPassword')?.addEventListener('click', this.togglePasswordVisibility.bind(this, 'confirm_password', 'iconConfirmPassword'));
  }

  showToast() {
    const toast = new bootstrap.Toast(this.toastElement.nativeElement, {
      autohide: true,
      delay: 2000
    });
    toast.show();
  }

  urlAPI: any;
  changePass: boolean = false;
  urlPass: any;

  userPass = {
    new_password: '',
    confirm_password: '',
    phone_number: ''
  };

  avatar: string = '';
  name: string = '';
  email: string = '';
  last_name: string = '';
  phone: any;
  fullname: string = '';

  getDataUser() {
    this._notiServ.noti().subscribe(resp => {
      this.urlAPI = resp;
      this.changePass = this.urlAPI.change_password;
      this.avatar = this.urlAPI.data.avatar;
      this.name = this.urlAPI.data.first_name;
      this.last_name = this.urlAPI.data.last_name;
      this.email = this.urlAPI.data.email;
      this.phone = this.urlAPI.data.phone_number;
      this.fullname = this.name + ' ' + this.last_name;
    });
  }

  isPhoneNumberPresent() {
    return !!this.userPass.phone_number && /^\d{9}$/.test(this.userPass.phone_number);
  }

  onSubmit(passwordForm: NgForm) {
    if (this.userPass.new_password && this.userPass.new_password !== this.userPass.confirm_password) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    const formattedPhoneNumber = `593${this.userPass.phone_number}`;

    this._notiServ.changePass(this.userPass.new_password, this.userPass.confirm_password, formattedPhoneNumber)
      .subscribe(resp => {
        this.urlPass = resp;
        if (this.urlPass.status === 'OK') {
          this.showToast();

          const toastEl = this.toastElement.nativeElement;
          toastEl.addEventListener('hidden.bs.toast', () => {
            window.location.reload();
          });
        }
      });
  }

  togglePasswordVisibility(inputId: string, iconId: string) {
    const input = document.getElementById(inputId) as HTMLInputElement;
    const icon = document.getElementById(iconId) as HTMLElement;
    if (input.type === 'password') {
      input.type = 'text';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      input.type = 'password';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  }

  validateNumber(event: KeyboardEvent) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }
}
