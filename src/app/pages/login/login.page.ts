import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { Usuario } from 'src/app/interfaces/interfaces';
import { UIServiceService } from 'src/app/services/uiservice.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('slideMain') slides: IonSlides;

  loginUser = {
    email: 'Maradiaga@gmail.com',
    password: '13245'
  };

  registerUser: Usuario = {
    email: 'test',
    password: '12345',
    nombre: 'Test',
    avatar: 'av-1.png'
  };

  constructor(private userService: UsuarioService,
              private navCtrl: NavController,
              private uiService: UIServiceService) { }

  ngOnInit() {
    
  }
  /* Si lo haces en el init lanza error ya que cuando se ejecuta 
     el constructor, la instancia del slider todavia no existe.
  */
  ionViewDidEnter(){
    this.slides.lockSwipes(true);
  }

  async login(fLogin: NgForm){

    if( fLogin.invalid ){ return;}

    const valido = await this.userService.login(this.loginUser.email, this.loginUser.password);

    if(valido){
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated: true});
    }else{
      this.uiService.alerta('Usuario y contraseña incorrectas!');
    }
  }

  async registro(fRegistro: NgForm){

    if( fRegistro.invalid ){ return; }

    const valido = await this.userService.registro(this.registerUser);
    if(valido){
      this.navCtrl.navigateRoot('/main/tabs/tab1', {animated:true});
    }else{
      this.uiService.alerta('El correo electrónico ya existe');
    }
  }

  mLogin(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(0)
    this.slides.lockSwipes(true);
  }

  mRegistro(){
    this.slides.lockSwipes(false);
    this.slides.slideTo(1)
    this.slides.lockSwipes(true);
  }

}
