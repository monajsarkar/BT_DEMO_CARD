import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'picturecard'
})
export class MockPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value === 11){
      return 'J';
     }
      else if(value === 12){
        return 'Q';
      }
       else if(value === 13){
         return 'K';
      } 
      else if(value === 14){
        return 'A';
      }else{
        return value;
      }
    }
  

}
