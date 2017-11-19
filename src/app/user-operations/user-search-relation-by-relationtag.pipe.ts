import { element } from 'protractor';
import { ValueText } from './../CommonModels/value-text';

import { User } from './Models/User';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'UserRelationByRelationTagNameSearch' })
export class UserRelationByRelationTagNamePipe implements PipeTransform {
  transform(items: User[], terms?: ValueText[]): any {
    if (terms && terms.length > 0) {
      const tempArray: Array<number> = new Array<number>();
      terms.forEach(element => {
        tempArray.push(element.value);
      });
      console.log(tempArray);
      return items
        .filter((element) =>element);
          // element.Profile.Relations.some((subElement) => tempArray.indexOf(subElement.RelationTagID) >= 0));
        //  element.Profile.Relations.some((subElement) => subElement.RelationTagID === tempArray[0]));
    } else {
      return items;
    }

  }
}


