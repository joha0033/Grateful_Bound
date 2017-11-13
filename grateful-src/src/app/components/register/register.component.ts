import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service'
import { FlashMessagesService } from 'angular2-flash-messages'
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    console.log('onRegisterSubmit')
    console.log(this.name)
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    //required fields
    if(!this.validateService.validateRegister(user)){
      console.log('fill it bro.')
      this.flashMessage.show('Fill it all out... please', {cssClass: 'alert-danger', timeout: 3000})
      return false
    }
    //validate email
    if(!this.validateService.validateEmail(user.email)){
      console.log('valid email, bro.')
      this.flashMessage.show('Valid email... please', {cssClass: 'alert-danger', timeout: 3000})
      return false
    }
    //register user
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('Registered!', {cssClass: 'alert-success', timeout: 3000})
        this.router.navigate(['/login'])
      }else{
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000})
        this.router.navigate(['/register'])
      }
    })
  }
}
