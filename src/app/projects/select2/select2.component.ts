import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-select2',
  templateUrl: './select2.component.html',
  styleUrls: ['./select2.component.css']
})
export class Select2Component implements OnInit, OnDestroy {
  @Input() options: any[] = [];
  @Input() placeholder: string = 'Select an option';
  @Output() selectionChange = new EventEmitter<any>();

  public filteredOptions: any[] = [];
  public selectedOption: any;
  public isOpen: boolean = false;
  public searchTerm: string = '';

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.filteredOptions = this.options;
    document.addEventListener('click', this.handleOutsideClick.bind(this));
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.handleOutsideClick.bind(this));
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  filterOptions() {
    if (this.searchTerm === '') {
      this.filteredOptions = this.options;
    } else {
      this.filteredOptions = this.options.filter(option =>
        option.first_name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }

  selectOption(option: any) {
    this.selectedOption = option;
    this.isOpen = false;
    this.searchTerm = '';
    this.filteredOptions = this.options;
    this.selectionChange.emit(option);
  }

  handleOutsideClick(event: MouseEvent) {
    if (!this.el.nativeElement.contains(event.target)) {
      this.isOpen = false;
    }
  }
}