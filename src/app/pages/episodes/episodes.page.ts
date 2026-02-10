import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RickService } from '../../services/rick';

import { ModalController } from '@ionic/angular';
import { EpisodeModalComponent } from './episode-modal/episode-modal.component';


@Component({
  selector: 'app-episodes',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './episodes.page.html',
})
export class EpisodesPage implements OnInit {

  episodes: any[] = [];
  loading = false;

  constructor(
  private rickService: RickService,
  private modalCtrl: ModalController
) {}


  ngOnInit() {
    this.loadEpisodes();
  }

  loadEpisodes() {
    this.loading = true;

    this.rickService.getEpisodes().subscribe({
      next: (res) => {
        console.log(res); // 👈 revisa esto en consola
        this.episodes = res.data.episodes.results;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  async openEpisode(id: string) {
  const modal = await this.modalCtrl.create({
    component: EpisodeModalComponent,
    componentProps: {
      episodeId: id
    }
  });

  await modal.present();
}

}

