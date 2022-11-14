import { MediaService } from '../../../src/services/media/media.service';

describe('MediaService', () => {
  it('should push and get sorted media', () => {
    const mediaService = new MediaService();
    mediaService.pushMedia({
      mediaId: 'aaa',
      mimeType: 'image/png',
      probability: 0.02,
    });
    mediaService.pushMedia({
      mediaId: 'bbb',
      mimeType: 'image/png',
      probability: 0.01,
    });
    mediaService.pushMedia({
      mediaId: 'ccc',
      mimeType: 'image/png',
      probability: 0.3,
    });

    expect(mediaService.getSortedMedia()).toEqual([
      {
        mediaId: 'ccc',
        mimeType: 'image/png',
        probability: 0.3,
      },
      {
        mediaId: 'aaa',
        mimeType: 'image/png',
        probability: 0.02,
      },
      {
        mediaId: 'bbb',
        mimeType: 'image/png',
        probability: 0.01,
      },
    ]);
  });
});
