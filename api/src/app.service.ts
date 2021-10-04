import { Injectable } from '@nestjs/common';

import * as jsonData from './data.json'

@Injectable()
export class AppService {
  getData(filter?:{search:string, field:string}): any {
    if(filter) {
      return jsonData.results.filter((result) => {
        return result[filter.field].toLowerCase().includes(filter.search.toLowerCase())
      })
    }
    return jsonData.results
  }
}
