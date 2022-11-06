export class EmployeeModel{
    id: number = 0;
    empName : string ='';
    contact : string ='';
    dept : string ='';
    position : string ='';
    joinDate : string ='';
    salary : string ='';
    qualification !: {
        academy: string;
        faculty: string;
        year: string;
        gpa: string;
    };


}

