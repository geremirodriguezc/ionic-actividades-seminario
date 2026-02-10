import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SentimentService } from '../../services/sentiment';

@Component({
  selector: 'app-media',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './media.page.html',
  styleUrls: ['./media.page.scss']
})
export class MediaPage {

  constructor(private sentimentService: SentimentService) {}

  @ViewChild('video', { static: false }) video!: ElementRef<HTMLVideoElement>;

  // ======================
  // PERMISOS / CÁMARA
  // ======================
  estadoCamara = 'No solicitado';
  estadoMicrofono = 'No solicitado';
  stream!: MediaStream;
  foto: string | null = null;

  async solicitarPermisos() {
  try {
    this.stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true
      }
    });

    this.estadoCamara = 'Concedido';
    this.estadoMicrofono = 'Concedido';

    // Mostrar solo video (sin audio en vivo para evitar eco)
    if (this.video) {
      this.video.nativeElement.srcObject = this.stream;
      this.video.nativeElement.muted = true; // ← evita eco
    }

  } catch (error) {
    this.estadoCamara = 'Denegado';
    this.estadoMicrofono = 'Denegado';
    console.error(error);
  }
}


  tomarFoto() {
    const video = this.video.nativeElement;

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx?.drawImage(video, 0, 0);

    this.foto = canvas.toDataURL('image/png');
  }

  // ======================
  // AUDIO
  // ======================
  mediaRecorder!: MediaRecorder;
  audioChunks: Blob[] = [];
  audioUrl: string | null = null;
  estadoGrabacion = 'Detenido';

  grabarAudio() {
  if (!this.stream) {
    alert('Primero debes solicitar permisos');
    return;
  }

  // Si ya está grabando, no permitir otra grabación
  if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
    return;
  }

  const audioStream = new MediaStream(this.stream.getAudioTracks());

  this.audioChunks = [];
  this.estadoGrabacion = 'Grabando...';
  this.audioUrl = null;

  this.mediaRecorder = new MediaRecorder(audioStream, {
    mimeType: 'audio/webm;codecs=opus'

  });

  this.mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      this.audioChunks.push(event.data);
    }
  };

  this.mediaRecorder.onstop = () => {
    const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
    this.audioUrl = URL.createObjectURL(audioBlob);
    this.estadoGrabacion = 'Grabación completada';
  };

  this.mediaRecorder.start();

  // Detener a los 5 segundos
  setTimeout(() => {
    if (this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.stop();
    }
  }, 5000);
}


  // ======================
  // API - ANÁLISIS DE TEXTO
  // ======================
  textoAnalizar = '';
  resultadoSentimiento: string | null = null;
  confianza: string | null = null;
  cargandoApi = false;

  analizarTexto() {
  if (!this.textoAnalizar) {
    alert('Escribe un texto primero');
    return;
  }

  this.cargandoApi = true;
  this.resultadoSentimiento = null;

  this.sentimentService.analizarTexto(this.textoAnalizar).subscribe({
    next: (res: any) => {
  console.log('Respuesta API:', res);

  this.resultadoSentimiento = res.result.type;
  this.confianza = res.result.polarity.toFixed(2);
  this.cargandoApi = false;
},

    error: (err) => {
      console.error('Error API:', err);
      this.cargandoApi = false;
    }
  });
}

}


