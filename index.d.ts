interface MusicDetail {
    id: string;
    name: string;
    url: string;
}
declare function getMusicItem(elem: HTMLElement): HTMLElement | null;
declare function initDom(): void;
declare function secondsToMinutes(seconds: number): string;
declare function getMusicDetail(musicId: string): MusicDetail | null;
declare function doPlay(): void;
declare function doPause(): void;
declare const MusicDetailList: Array<MusicDetail>;
declare const musicListElem: HTMLElement;
declare const musicProgressbar: HTMLElement;
declare const musicPlayedTime: HTMLElement;
declare const musicTotalTime: HTMLElement;
declare const musicName: HTMLElement;
declare let currentMedia: {
    musicDetail: MusicDetail;
    musicItemElem: HTMLElement;
    audioElem: HTMLAudioElement;
    playing: boolean;
};
