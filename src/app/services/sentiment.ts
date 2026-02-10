import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SentimentService {

  analizarTexto(texto: string) {

    let resultado = 'neutral';
    let confianza = 0.50;

    const t = texto.toLowerCase();

    if (t.includes('feliz') || t.includes('bueno') || t.includes('excelente') || t.includes('genial')) {
      resultado = 'positivo';
      confianza = 0.90;
    } else if (t.includes('mal') || t.includes('triste') || t.includes('horrible') || t.includes('odio')) {
      resultado = 'negativo';
      confianza = 0.90;
    }

    // Simula llamada a API (1.5 segundos)
    return of({
      result: {
        type: resultado,
        polarity: confianza
      }
    }).pipe(delay(1500));
  }
}

