import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';
@Pipe({
  name: 'relativeTime',
  standalone: true
})
export class RelativeTimePipe implements PipeTransform {
  transform(value: string | Date | undefined): string {
    console.log(value);

    if (!value) return ''; // ou "il y a un instant"
    return formatDistanceToNow(new Date(value), { addSuffix: true, locale: fr });
  }

  // transform(value: string | undefined ): string {
  //   if (!value) return '';
  //
  //   const date = new Date(value);
  //   const now = new Date();
  //   const diffMs = now.getTime() - date.getTime();
  //
  //   const seconds = Math.floor(diffMs / 1000)-2*3600;
  //   const minutes = Math.floor(seconds / 60);
  //   const hours = Math.floor(minutes / 60);
  //   const days = Math.floor(hours / 24);
  //   const months = Math.floor(days / 30);
  //   const years = Math.floor(days / 365);
  //
  //   if (seconds < 30) return "à l'instant";
  //   if (seconds < 60) return `il y a ${seconds} sec`;
  //   if (minutes < 60) return `il y a ${minutes} min`;
  //   if (hours < 24) return `il y a ${hours} h`;
  //   if (days < 30) return `il y a ${days} j`;
  //   if (months < 12) return `il y a ${months} mois`;
  //   return `il y a ${years} an${years > 1 ? 's' : ''}`;
  // }



}
