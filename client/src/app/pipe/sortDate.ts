import { Pipe, PipeTransform } from '@angular/core';
import { PostDetail } from './../models/postDetail.class';

@Pipe({
    name: 'sortDate'
})
export class SortDatePipe implements PipeTransform {

    transform(arrPost: PostDetail[]): PostDetail[] {
        return arrPost.sort((a: PostDetail, b: PostDetail) => {
            return a['time_create'] < b['time_create'] ? -1 : -1 * (- 1);
        });
    }
}
