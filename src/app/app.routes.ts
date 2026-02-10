import { Routes } from '@angular/router';

export const routes: Routes = [

  
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component')
        .then(m => m.HomeComponent)
  },


  {
    path: 'usuarios/registro',
    loadComponent: () =>
      import('./pages/usuarios-registro/registro.component')
        .then(m => m.RegistroComponent)
  },
  {
    path: 'usuarios/listado',
    loadComponent: () =>
      import('./pages/usuarios-listado/listado-registros.component')
        .then(m => m.ListadoRegistrosComponent)
  },

  
  {
    path: 'productos/registro',
    loadComponent: () =>
      import('./pages/productos-registro/registro.page')
        .then(m => m.RegistroPage)
  },
  {
    path: 'productos/listado',
    loadComponent: () =>
      import('./pages/productos-listado/listado.page')
        .then(m => m.ListadoPage)
  },

  
  {
    path: 'perfil',
    loadComponent: () =>
      import('./pages/perfil/perfil.component')
        .then(m => m.PerfilComponent)
  },
  {
    path: 'galeria',
    loadComponent: () =>
      import('./pages/galeria/galeria.component')
        .then(m => m.GaleriaComponent)
  },
  
{
  path: 'episodes',
  loadComponent: () =>
    import('./pages/episodes/episodes.page')
      .then(m => m.EpisodesPage)
},


{
  path: 'media',
  loadComponent: () =>
    import('./pages/media/media.page')
      .then(m => m.MediaPage)
},


{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full'
}


];





