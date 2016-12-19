import { Component, OnInit } from '@angular/core';

import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    public angularFire: AngularFire
  ) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    console.log('Setup Authentication Logic');
  }

}
