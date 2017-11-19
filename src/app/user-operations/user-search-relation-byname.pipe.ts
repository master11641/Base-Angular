
import { User } from './Models/User';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'UserRelationByNameSearch' })
export class UserRelationByNameSearchPipe implements PipeTransform {
  transform(items: User[], term?: string): any {
    if (term) {
      return items
      .filter((element) =>element);
       // element.Profile.Relations.some((subElement) => subElement.Name.concat(subElement.Family).indexOf(term) >= 0));
    } else {
      return items;
    }

  }
}
