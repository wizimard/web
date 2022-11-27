import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '@/_services';


declare var google: any;

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit, AfterViewInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    // convenience getter for easy access to form fields
    get form() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.form.email.value, this.form.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    console.log(error);
                    this.alertService.error(error.message);
                    this.loading = false;
                });
    }
    ngAfterViewInit(): void {
        google.accounts.id.initialize({
            client_id: "232835462397-e9fc0b13nbt790n26740cpf9cdpr7atv.apps.googleusercontent.com",
            callback: (response: any) => this.handleGoogleSignIn(response)
        });
        google.accounts.id.renderButton(
            document.getElementById("google-login"),
            { type: "text", shape: "pill" }  // customization attributes
        );
    }

    handleGoogleSignIn(response: any) {
        console.log(response);
        const token = response.credential;
        // This next is for decoding the idToken to an object if you want to see the details.
        let base64Url = response.credential.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        const email = JSON.parse(jsonPayload).email;
        this.onGmailAuth(email, token);
    }
    onGmailAuth(email, token) {
        this.loading = true;
        this.authenticationService.loginByGmail(email, token)
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data);
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    console.log(error);
                    this.alertService.error(error.message);
                    this.loading = false;
                }
            )
    }
}
