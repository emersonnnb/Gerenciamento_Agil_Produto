import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, MatInputModule, MatFormFieldModule, MatIconModule, ReactiveFormsModule, MatIconModule, RouterModule, MatButtonModule],
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  logiIn!: FormGroup;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  constructor(
    private fb: FormBuilder,
  ) { }


  ngOnInit(): void {
    this.logiIn = (this.fb as FormBuilder).group({
      email: [null],
      password: [null]
    });
  }

}
