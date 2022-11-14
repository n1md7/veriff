import { UUID } from '../../types/response.type';
import { VeriffAPI } from '../../http-clients/veriff/http.client';
import { ContextMediaResponse } from './responses/context-media.response';
import { SessionMediaResponse } from './responses/session-media.response';
import { SessionDetailResponse } from './responses/session-detail.response';
import { MediaService } from '../media/media.service';

export class SessionService {
  private contextMedia: ContextMediaResponse[] = [];
  private sessionMedia: SessionMediaResponse[] = [];
  private sessionDetail: SessionDetailResponse | null = null;

  private media = {
    front: new MediaService(),
    back: new MediaService(),
  };

  private indexedSessionMedia: Map<UUID, SessionMediaResponse> = new Map();

  public constructor(private readonly httpClient: VeriffAPI, private readonly requestID: string) {}

  public async run() {
    return this.fetchAndValidate().then(() => {
      this.indexSessionMedia();
      this.processMediaData();
    });
  }

  public getSessionDetails() {
    return this.sessionDetail;
  }

  public getProcessedMedia() {
    return this.media;
  }

  private fetchData() {
    const sessionDetails = this.httpClient.fetchSessionDetails(this.requestID);
    const sessionMedia = this.httpClient.fetchSessionMedia(this.requestID);
    const mediaContext = this.httpClient.fetchMediaContext(this.requestID);

    return Promise.all([sessionDetails, sessionMedia, mediaContext]);
  }

  private async fetchAndValidate() {
    const [sessionDetails, sessionMedia, mediaContext] = await this.fetchData();

    SessionMediaResponse.validate(sessionMedia);
    ContextMediaResponse.validate(mediaContext);
    SessionDetailResponse.validate(sessionDetails);

    this.contextMedia = mediaContext.map(ContextMediaResponse.from);
    this.sessionMedia = sessionMedia.map(SessionMediaResponse.from);
    this.sessionDetail = SessionDetailResponse.from(sessionDetails);
  }

  // Works in O(n) Time
  private indexSessionMedia() {
    for (const media of this.sessionMedia) {
      this.indexedSessionMedia.set(media.id, media);
    }
  }

  // Works in O(n) Time
  private processMediaData() {
    for (const contextMedia of this.contextMedia) {
      const sessionMedia = this.indexedSessionMedia.get(contextMedia.mediaId);
      if (sessionMedia) {
        if (contextMedia.isValidContext(contextMedia.context)) {
          this.media[contextMedia.context].pushMedia({
            mediaId: contextMedia.mediaId,
            mimeType: sessionMedia.mimeType,
            probability: contextMedia.probability,
          });
        }
      }
    }
  }
}
