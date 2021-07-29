import { Component } from '@angular/core'
import { formatDistance } from 'date-fns'

@Component({
  selector: 'kit-antd-comment-example',
  templateUrl: './comment.component.html',
})
export class KitAntdCommentExampleComponent {
  likes = 0
  dislikes = 0
  time = formatDistance(new Date(), new Date())

  data = {
    author: 'Han Solo',
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources' +
      '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    children: [
      {
        author: 'Han Solo',
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources' +
          '(Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      },
    ],
  }

  like(): void {
    this.likes = 1
    this.dislikes = 0
  }

  dislike(): void {
    this.likes = 0
    this.dislikes = 1
  }
}
