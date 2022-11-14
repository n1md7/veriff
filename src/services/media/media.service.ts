import { MediaType } from '../../types/response.type';

export class MediaService {
  private readonly media: MediaType[] = [];

  public pushMedia(media: MediaType) {
    this.media.push(media);
  }

  public getSortedMedia() {
    this.sortByDesc();

    return this.media;
  }

  // Works in O(nLogN) Time
  private sortByDesc() {
    this.media.sort((current, next) => {
      return next.probability - current.probability;
    });
  }
}
