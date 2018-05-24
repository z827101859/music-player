interface MusicDetail {
    id: string,
    name: string,
    url: string
}
function getMusicList(): Promise<Array<MusicDetail>> {
    return fetch('getMusicList.json').then((response) => {
        return response.json();
    }).then((result) => {
        return result.data;
    });
}
function getMusicItemElem(elem: HTMLElement): HTMLElement | null {
    if (!elem || elem.classList.contains('music-item')) {
        return elem;
    } else {
        return getMusicItemElem(elem.parentElement);
    }
}
function secondsToMinutes(seconds: number): string {
    if (!seconds) {
        return '00:00';
    }
    let tmp = Math.floor(seconds);
    let m = Math.floor(tmp / 60);
    let s = Math.floor(tmp % 60);
    return `${m >= 10 ? m : ('0' + m)}:${s >= 10 ? s : ('0' + s)}`;
}
function doPlay(): void {
    currentAudio.musicItemElem.classList.add('playing');
    currentAudio.audioElem.play();
    currentAudio.playing = true;
}
function doPause(): void {
    currentAudio.musicItemElem.classList.remove('playing');
    currentAudio.audioElem.pause();
    currentAudio.playing = false;
}
const musicListElem: HTMLElement = document.querySelector('#musicList');
const musicProgressbar: HTMLElement = document.querySelector('#musicProgressbar');
const musicPlayedTime: HTMLElement = document.querySelector('#musicPlayedTime');
const musicTotalTime: HTMLElement = document.querySelector('#musicTotalTime');
const musicName: HTMLElement = document.querySelector('#musicName');
const MusicCache: Map<string, MusicDetail> = new Map();
let currentAudio: {
    musicDetail: MusicDetail,
    musicItemElem: HTMLElement,
    audioElem: HTMLAudioElement,
    inited: boolean,
    playing: boolean
} = null; //当前已经选中的歌曲
musicListElem.addEventListener(/Mobile/.test(navigator.userAgent) ? 'touchstart' : 'click', function (event: MouseEvent) {
    let musicItemElem = getMusicItemElem((event.target as HTMLElement));
    let musicId = musicItemElem.getAttribute('music-id');
    if (currentAudio) {// 如果当前已经有选中的歌曲
        if (musicId === currentAudio.musicDetail.id) {//点击了当前的歌曲，就暂停播放或者继续播放
            if (currentAudio.playing) {
                doPause();
            } else {
                doPlay();
            }
            return;
        } else {//如果点击了其他歌曲，就把当前歌曲销毁，重新初始化点击的歌曲
            doPause();
            currentAudio.audioElem = null;
            currentAudio = null;
        }
    }
    let musicDetail = MusicCache.get(musicId);
    let audio = document.createElement('audio');
    audio.setAttribute('preload', 'true');
    audio.setAttribute('loop', 'true');
    audio.setAttribute('src', musicDetail.url);
    currentAudio = {
        musicDetail: musicDetail,
        musicItemElem: musicItemElem,
        audioElem: audio,
        inited: false,
        playing: false
    };
    currentAudio.musicItemElem.classList.add('playing');
    musicProgressbar.style.width = '0%';
    musicPlayedTime.innerText = secondsToMinutes(0);
    musicTotalTime.innerText = secondsToMinutes(0);
    musicName.innerText = '加载中...';
    audio.addEventListener('loadedmetadata', function (event) {
        doPlay();
    });
    audio.addEventListener('timeupdate', function (event) {
        if (currentAudio.audioElem.currentTime > 0.1 && !currentAudio.inited) {
            musicName.innerText = currentAudio.musicDetail.name;
            musicTotalTime.innerText = secondsToMinutes(currentAudio.audioElem.duration);
            currentAudio.inited = true;
        }
        musicProgressbar.style.width = currentAudio.audioElem.currentTime / currentAudio.audioElem.duration * 100 + '%';
        musicPlayedTime.innerText = secondsToMinutes(currentAudio.audioElem.currentTime);
    });
});
getMusicList().then((data) => {
    let html = '';
    for (let detail of data) {
        MusicCache.set(detail.id, detail);
        html = html + `
            <div class="music-item media text-muted pt-3" music-id="${detail.id}">
                <img style="width:32px;height:32px;" class="mr-2 rounded" src="//mailshark-test.nos-jd.163yun.com/document/static/344C59A98FD3693F923FE3E0FBBF0E3D.png"/>
                <div class="media-body pb-3 border-bottom">
                    <strong class="music-name">${detail.name}</strong>
                </div>
            </div>
        `;
    }
    musicListElem.innerHTML = html;
});