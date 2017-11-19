
import { User } from './Models/User';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'UserSearch' })
export class UserSearchPipe implements PipeTransform {
  transform(items: User[], term?: string): any {
    if (term) {
      return items
      .filter((element) =>element);
       // element.Profile.SkillTags.some((subElement) => subElement.Name.indexOf(term) >= 0));
    } else {
      return items;
    }

  }
}


