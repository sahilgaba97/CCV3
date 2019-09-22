import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringLength'
})
export class StringLengthPipe implements PipeTransform {

  transform(value: any, limit: number): any {
    if(value.length>limit)
    {
      return value.substr(0,limit-3)+"...";
    }
    else
      return value;
  }

}
