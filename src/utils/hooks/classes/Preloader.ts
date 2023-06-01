export interface IPreloader {
  handleRequestEnd: (videoUrl: string) => void;
  handleProgress: (progress: number) => void;
}

type Resolve = (videoUrl: string) => void;

class Preloader {
  handleRequestEnd;
  handleProgress;

  constructor({ handleRequestEnd, handleProgress }: IPreloader) {
    this.handleRequestEnd = handleRequestEnd;
    this.handleProgress = handleProgress;
  }

  onLoad = (resolve: Resolve, xhr: XMLHttpRequest) => {
    resolve(URL.createObjectURL(xhr.response));
  };

  onProgress = (event: any) => {
    const progress = event.loaded / event.total;
    this.handleProgress(progress);
  };

  startLoading = () => {
    return new Promise((resolve: Resolve, reject) => {
      const xhr = new XMLHttpRequest();

      xhr.onload = () => this.onLoad(resolve, xhr);
      xhr.onprogress = this.onProgress;

      xhr.open("GET", "/videoplayback.mp4", true);
      xhr.responseType = "blob";
      xhr.send(null);
    });
  };

  getFileUrl = async () => {
    const videoUrl = await this.startLoading();
    this.handleRequestEnd(videoUrl);
  };
}

export default Preloader;
