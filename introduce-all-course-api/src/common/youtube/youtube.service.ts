import { YoutubeLectureDataDto } from "@admin/free-lectures/dtos/youtube-lecture-data.dto";
import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

@Injectable()
export class YoutubeService {
  private readonly youtubeApiUrl =
    "https://www.googleapis.com/youtube/v3/videos";
  private readonly apiKey = process.env.YOUTUBE_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async getVideoViewCounts(
    lectureData: { free_lecture_id: number; free_lecture_url: string }[],
  ): Promise<YoutubeLectureDataDto[]> {
    const videoIds = lectureData
      .map((item) => this.extractVideoIdFromUrl(item.free_lecture_url))
      .filter((id) => id !== null);

    if (videoIds.length === 0) {
      console.error("No valid YouTube video URL provided");
    }

    const params = new URLSearchParams({
      id: videoIds.join(","),
      part: "statistics",
      key: this.apiKey,
    }).toString();

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.youtubeApiUrl}?${params}`),
      );

      const updates = response.data.items
        .map((video, index) => {
          const viewCount = parseInt(video.statistics.viewCount, 10);

          return {
            ...lectureData[index],
            free_lecture_view_count: viewCount,
          };
        })
        .filter((update) => update !== null);

      return updates;
    } catch (error) {
      console.error("Failed to fetch video details from YouTube API");
    }
  }

  private extractVideoIdFromUrl(url: string): string | null {
    const regex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const matches = url.match(regex);
    return matches ? matches[1] : null;
  }
}
