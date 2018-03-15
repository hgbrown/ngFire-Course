import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore'
import { Observable } from 'rxjs/Observable';

import { Post } from './post.model'

@Injectable()
export class PostService {
  postsCollection: AngularFirestoreCollection<Post>

  constructor(private afs: AngularFirestore) {
    this.postsCollection = this.afs.collection('posts', ref =>
      ref.orderBy('claps', 'desc').limit(10)
    )
  }

  getPosts(): Observable<Post[]> {
    return this.postsCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  create(data: Post) {
    this.postsCollection.add(data)
  }


}
