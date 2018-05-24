interface MusicDetail {
    id: string;
    name: string;
    url: string;
}
declare function getMusicList(): Promise<Array<MusicDetail>>;
declare function getMusicItemElem(elem: HTMLElement): HTMLElement | null;
declare function secondsToMinutes(seconds: number): string;
declare function doPlay(): void;
declare function doPause(): void;
declare const musicListElem: HTMLElement;
declare const musicProgressbar: HTMLElement;
declare const musicPlayedTime: HTMLElement;
declare const musicTotalTime: HTMLElement;
declare const musicName: HTMLElement;
declare const MusicCache: Map<string, MusicDetail>;
declare let currentAudio: {
    musicDetail: MusicDetail;
    musicItemElem: HTMLElement;
    audioElem: HTMLAudioElement;
    playing: boolean;
};
