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


}
