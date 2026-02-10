import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

export interface Articulo {
  nombre: string;
  precio: number;
  categoria: string;
  fecha: string;
  confirmar: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ArticulosService {

  private storageReady = false;
  private readonly KEY = 'articulos';

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    if (this.storageReady) return;
    await this.storage.create();
    this.storageReady = true;
  }

  async guardarArticulo(data: Omit<Articulo, 'createdAt'>): Promise<void> {
    if (!this.storageReady) return;

    const articulos = (await this.storage.get(this.KEY)) as Articulo[] | null;

    const nuevo: Articulo = {
      ...data,
      createdAt: new Date().toISOString()
    };

    const actualizados = articulos ? [nuevo, ...articulos] : [nuevo];
    await this.storage.set(this.KEY, actualizados);
  }

  async obtenerArticulos(): Promise<Articulo[]> {
    if (!this.storageReady) return [];
    return ((await this.storage.get(this.KEY)) as Articulo[] | null) ?? [];
  }

  async borrarArticulos(): Promise<void> {
    if (!this.storageReady) return;
    await this.storage.remove(this.KEY);
  }


  async clearArticulos() {
  if (!this.storageReady) return;
  await this.storage.remove('articulos');
}

}

