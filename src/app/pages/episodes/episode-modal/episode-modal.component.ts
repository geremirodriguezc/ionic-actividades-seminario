import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { RickService } from '../../../services/rick';

@Component({
  selector: 'app-episode-modal',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './episode-modal.component.html',
})
export class EpisodeModalComponent implements OnInit {

  @Input() episodeId!: string;

  episode: any;
  loading = false;

  constructor(
    private modalCtrl: ModalController,
    private rickService: RickService
  ) {}

  ngOnInit() {
    this.loadDetail();
  }

  loadDetail() {
    this.loading = true;

    this.rickService.getEpisodeDetail(this.episodeId).subscribe({
      next: (res: any) => {
        this.episode = res.data.episode;
        this.loading = false;
      },
      error: (err: any) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}

