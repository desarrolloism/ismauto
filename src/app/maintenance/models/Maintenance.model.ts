export class MaintenanceModel{
    public id                : number = 0;
    public case_id           : number = 0;
    public date_estimated_delivery : string = '';
    public type_incident     : string = '';
    public site              : string = '';
    public description_incident : string = '';
    public solution             : string = '';
    public priority          : string = '';
    public has_risk             : boolean = false;
    public score             : number = 0;
    public institute_id      : number = 0;
    //capturar el nombre del usuario
    // public createdBy: string = '';
}