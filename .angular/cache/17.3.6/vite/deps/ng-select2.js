import {
  NG_VALUE_ACCESSOR
} from "./chunk-KHQUI5RU.js";
import {
  CommonModule
} from "./chunk-46BW6HYR.js";
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  NgModule,
  NgZone,
  Output,
  Renderer2,
  ViewChild,
  ViewEncapsulation$1,
  forwardRef,
  setClassMetadata,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵloadQuery,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵqueryRefresh,
  ɵɵviewQuery
} from "./chunk-QGVXM6TF.js";
import "./chunk-AFKBMBZT.js";
import "./chunk-J4B6MK7R.js";

// node_modules/ng-select2/fesm2020/ng-select2.mjs
var _c0 = ["selector"];
var _c1 = [[["option"], ["optgroup"]]];
var _c2 = ["option, optgroup"];
var NgSelect2Component = class {
  // private style = `CSS`;
  constructor(renderer, zone, _element) {
    this.renderer = renderer;
    this.zone = zone;
    this._element = _element;
    this.placeholder = "";
    this.dropdownParent = "";
    this.allowClear = false;
    this.disabled = false;
    this.id = null;
    this.class = null;
    this.required = null;
    this.valueChanged = new EventEmitter();
    this.element = void 0;
    this.check = false;
    this.propagateChange = (value) => {
    };
  }
  ngDoCheck() {
    if (!this.element) {
      return;
    }
  }
  ngOnInit() {
  }
  ngOnChanges(changes) {
    if (!this.element) {
      return;
    }
    if (changes["data"] && JSON.stringify(changes["data"].previousValue) !== JSON.stringify(changes["data"].currentValue)) {
      this.initPlugin();
      const newValue = this.value;
      this.setElementValue(newValue);
      this.valueChanged.emit(newValue);
      this.propagateChange(newValue);
    }
    if (changes["value"] && changes["value"].previousValue !== changes["value"].currentValue) {
      const newValue = changes["value"].currentValue;
      this.setElementValue(newValue);
      this.valueChanged.emit(newValue);
      this.propagateChange(newValue);
    }
    if (changes["disabled"] && changes["disabled"].previousValue !== changes["disabled"].currentValue) {
      this.renderer.setProperty(this.selector.nativeElement, "disabled", this.disabled);
    }
    if (changes["placeholder"] && changes["placeholder"].previousValue !== changes["placeholder"].currentValue) {
      this.element.data("select2").$container.find(".select2-selection__placeholder").text(this.placeholder);
    }
    if (changes["dropdownParent"] && changes["dropdownParent"].previousValue !== changes["dropdownParent"].currentValue) {
      this.renderer.setAttribute(this.selector.nativeElement, "data-dropdownParent", "#" + this.dropdownParent);
    }
    if (changes["allowClear"] && changes["allowClear"].previousValue !== changes["allowClear"].currentValue) {
      this.renderer.setAttribute(this.selector.nativeElement, "data-allow-clear", this.allowClear.toString());
    }
  }
  ngAfterViewInit() {
    this.element = jQuery(this.selector.nativeElement);
    this.renderer.setAttribute(this.selector.nativeElement, "data-dropdownParent", "#" + this.dropdownParent);
    this.renderer.setAttribute(this.selector.nativeElement, "data-allow-clear", this.allowClear.toString());
    this.initPlugin();
    if (this.value !== void 0 && this.value !== null) {
      this.setElementValue(this.value);
    }
    this.element.on("select2:select select2:unselect change", (e) => {
      const newValue = this.element.val();
      this.valueChanged.emit(newValue);
      if (e.type !== "change") {
        this.propagateChange(newValue);
      }
    });
  }
  ngOnDestroy() {
    if (this.element) {
      this.element.off("select2:select");
    }
  }
  initPlugin() {
    if (!this.element.select2) {
      if (!this.check) {
        this.check = true;
        console.log("Please add Select2 library (js file) to the project.You can download it from https://github.com/select2/select2/tree/master/dist/js.");
      }
      return;
    }
    if (this.element.hasClass("select2-hidden-accessible") === true) {
      this.element.select2("destroy");
      this.renderer.setProperty(this.selector.nativeElement, "innerHTML", "");
    }
    const options = {
      data: this.data,
      width: this.width ? this.width : "resolve",
      placeholder: this.placeholder
    };
    if (this.dropdownParent) {
      options.dropdownParent = jQuery("#" + this.dropdownParent);
    }
    Object.assign(options, this.options);
    if (options.matcher) {
      jQuery.fn.select2.amd.require(["select2/compat/matcher"], (oldMatcher) => {
        options.matcher = oldMatcher(options.matcher);
        this.element.select2(options);
        if (typeof this.value !== "undefined") {
          this.setElementValue(this.value);
        }
      });
    } else {
      this.element.select2(options);
    }
    this.renderer.setProperty(this.selector.nativeElement, "disabled", this.disabled);
  }
  setElementValue(newValue) {
    if (Array.isArray(newValue)) {
      for (const option of this.selector.nativeElement.options) {
        this.renderer.setProperty(option, "selected", newValue.indexOf(option.value) > -1);
      }
    } else {
      this.renderer.setProperty(this.selector.nativeElement, "value", newValue);
    }
    if (this.element) {
      this.element.trigger("change.select2");
    }
  }
  writeValue(value) {
    if (value !== void 0) {
      this.value = value;
      this.setElementValue(value);
    }
  }
  registerOnChange(fn) {
    this.propagateChange = fn;
  }
  registerOnTouched() {
  }
  setDisabledState(isDisabled) {
    this.disabled = isDisabled;
    this.renderer.setProperty(this.selector.nativeElement, "disabled", this.disabled);
  }
};
NgSelect2Component.ɵfac = function NgSelect2Component_Factory(t) {
  return new (t || NgSelect2Component)(ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(ElementRef));
};
NgSelect2Component.ɵcmp = ɵɵdefineComponent({
  type: NgSelect2Component,
  selectors: [["ng-select2"]],
  viewQuery: function NgSelect2Component_Query(rf, ctx) {
    if (rf & 1) {
      ɵɵviewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      ɵɵqueryRefresh(_t = ɵɵloadQuery()) && (ctx.selector = _t.first);
    }
  },
  inputs: {
    data: "data",
    placeholder: "placeholder",
    dropdownParent: "dropdownParent",
    allowClear: "allowClear",
    value: "value",
    width: "width",
    disabled: "disabled",
    id: "id",
    class: "class",
    required: "required",
    options: "options"
  },
  outputs: {
    valueChanged: "valueChanged"
  },
  features: [ɵɵProvidersFeature([{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NgSelect2Component),
    multi: true
  }]), ɵɵNgOnChangesFeature],
  ngContentSelectors: _c2,
  decls: 3,
  vars: 3,
  consts: [["selector", ""]],
  template: function NgSelect2Component_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵprojectionDef(_c1);
      ɵɵelementStart(0, "select", null, 0);
      ɵɵprojection(2);
      ɵɵelementEnd();
    }
    if (rf & 2) {
      ɵɵattribute("id", ctx.id)("class", ctx.class)("required", ctx.required);
    }
  },
  encapsulation: 2,
  changeDetection: 0
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgSelect2Component, [{
    type: Component,
    args: [{
      selector: "ng-select2",
      encapsulation: ViewEncapsulation$1.None,
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => NgSelect2Component),
        multi: true
      }],
      template: '<select #selector [attr.id]="id" [attr.class]="class" [attr.required]="required">\r\n  <ng-content select="option, optgroup">\r\n  </ng-content>\r\n</select>\r\n'
    }]
  }], function() {
    return [{
      type: Renderer2
    }, {
      type: NgZone
    }, {
      type: ElementRef
    }];
  }, {
    selector: [{
      type: ViewChild,
      args: ["selector", {
        static: true
      }]
    }],
    data: [{
      type: Input
    }],
    placeholder: [{
      type: Input
    }],
    dropdownParent: [{
      type: Input
    }],
    allowClear: [{
      type: Input
    }],
    value: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    id: [{
      type: Input
    }],
    class: [{
      type: Input
    }],
    required: [{
      type: Input
    }],
    options: [{
      type: Input
    }],
    valueChanged: [{
      type: Output
    }]
  });
})();
var NgSelect2Module = class {
};
NgSelect2Module.ɵfac = function NgSelect2Module_Factory(t) {
  return new (t || NgSelect2Module)();
};
NgSelect2Module.ɵmod = ɵɵdefineNgModule({
  type: NgSelect2Module,
  declarations: [NgSelect2Component],
  imports: [CommonModule],
  exports: [NgSelect2Component]
});
NgSelect2Module.ɵinj = ɵɵdefineInjector({
  imports: [[CommonModule]]
});
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgSelect2Module, [{
    type: NgModule,
    args: [{
      imports: [CommonModule],
      declarations: [NgSelect2Component],
      exports: [NgSelect2Component]
    }]
  }], null, null);
})();
export {
  NgSelect2Component,
  NgSelect2Module
};
//# sourceMappingURL=ng-select2.js.map
