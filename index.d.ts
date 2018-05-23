/// <reference types="jquery" />
/// <reference types="bootstrap" />
interface MusicDetail {
    id: string;
    name: string;
    url: string;
}
declare function addMusicDom(musicDetail: MusicDetail): void;
declare function initDom(): void;
declare function secondsToMinutes(seconds: any): string;
declare function getMusicDetail(musicId: any): {
    id: string;
    name: string;
    url: string;
};
declare function doPlay(): void;
declare function doPause(): void;
declare function doInit(musicDetail: any): void;
declare function doDestroy(): void;
declare function playMusic(musicDetail: any): void;
declare const MusicDetailList: {
    id: string;
    name: string;
    url: string;
}[];
declare const globalPlay: JQuery<HTMLElement>;
declare const globalPause: JQuery<HTMLElement>;
declare const musicList: JQuery<HTMLElement>;
declare const musicProgressbar: JQuery<HTMLElement>;
declare const musicPlayedTime: JQuery<HTMLElement>;
declare const musicTotalTime: JQuery<HTMLElement>;
declare const musicName: JQuery<HTMLElement>;
declare const addMusicBtn: JQuery<HTMLElement>;
declare const addMusicDialogConfrim: JQuery<HTMLElement>;
declare let musicIdIndex: number;
declare let currentAudioElem: any;
declare let isplaying: boolean;
declare let loading: boolean;
