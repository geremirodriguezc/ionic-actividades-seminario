import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { ArticulosService } from '../../services/articulos';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-listado',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './listado.page.html',
  styleUrls: ['./listado.page.scss']
})
export class ListadoPage implements OnInit {

  articulos: any[] = [];

  constructor(
  private articulosService: ArticulosService,
  private router: Router,
  private alertCtrl: AlertController
) {}

nuevoRegistro() {
  this.router.navigateByUrl('/productos/registro');
}


  async ngOnInit() {
    this.articulos = await this.articulosService.obtenerArticulos();
  }

  async borrarTodo() {
  const alert = await this.alertCtrl.create({
    header: 'Confirmar',
    message: '¿Deseas eliminar todos los productos?',
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel'
      },
      {
        text: 'Eliminar',
        handler: async () => {
          await this.articulosService.clearArticulos();
          this.articulos = [];
        }
      }
    ]
  });

  await alert.present();
}

}
