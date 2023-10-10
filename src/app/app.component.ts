import { Component, OnInit } from '@angular/core';
import { Auth } from 'aws-amplify';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'huella-smart-lite';
  nickname: string = "";
  isLoadingNickname: boolean = true;  // añade esta propiedad

  ngOnInit(): void {
    this.loadNickname();
}
async loadNickname() {
  try {
    const user = await Auth.currentAuthenticatedUser();
    this.nickname = user.attributes.nickname;
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
  } finally {
    this.isLoadingNickname = false;
  }
}
constructor(private router: Router) { }

isActive(route: string): boolean {
  return this.router.url.includes(route);
}

}
