import { CategoryDTO } from '../../Category/models/category.dto';

export class PostCardDTO {
  postId: string;
  userAlias: string;
  title: string;
  description: string;
  num_likes: number;
  num_dislikes: number;
  publication_date: Date;
  categories: CategoryDTO[];

  constructor(
    postId: string,
    userAlias: string,
    title: string,
    description: string,
    numLikes: number,
    numDislikes: number,
    categories: CategoryDTO[],
    publicationDate: Date
  ) {
    this.postId = postId;
    this.userAlias = userAlias;
    this.title = title;
    this.description = description;
    this.categories = categories;
    this.num_likes = numLikes;
    this.num_dislikes = numDislikes;
    this.publication_date = publicationDate;
  }
}
