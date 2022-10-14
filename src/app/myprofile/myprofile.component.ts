import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Customer } from '../models/Customer.model';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {

  constructor(private fb:FormBuilder,private httpClient: HttpClient,private cdr: ChangeDetectorRef) { }

  ngAfterViewChecked(){
   this.cdr.detectChanges();
}
   currentCustomer = new Customer();

  ngOnInit(): void {
     this.httpClient.get<any>("http://localhost:8080/customer/Bawa", this.myForm.value)
      .subscribe((data:any) => {
        this.currentCustomer.customerName=data.customerName;
        this.currentCustomer.email=data.email;
        this.currentCustomer.password=data.password;
        this.currentCustomer.address=data.address;
        this.currentCustomer.mobile=data.mobile;
        this.currentCustomer.id=data.id;
        // console.log(data)
      })
  }

   get customerName() {
    return this.myForm.controls.customerName;
  }

  get email() {
    return this.myForm.controls.email;
  }

  get mobile() {
    return this.myForm.controls.mobile;
  }
  
  myForm = this.fb.group({
    customerName:['',[Validators.required]],
    email:['',[Validators.required,Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')]],
    password:[''],
    oldpassword:[''],
    mobile:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    address:['']
  })

  // set a cookie in sessionstorage for username
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  
  onSubmit(){
    this.myForm.value.id = this.currentCustomer.id;
    // console.log(this.myForm.value);
    this.httpClient.put<any>("http://localhost:8080/customer/updatecustomer", this.myForm.value, this.httpOptions)
      .subscribe((data) => {
        // console.log(data);
        Swal.fire(
        'Successful!',
        'Your profile has been updated.',
        'success'
      )
      },
      (err)=>{
        console.log(err);
        Swal.fire(
        'Cancelled',
        'Some error occured, please try again!!!)',
        'error'
      )
      })
  }
}
