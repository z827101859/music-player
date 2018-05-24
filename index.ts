interface MusicDetail {
    id: string,
    name: string,
    url: string
}
function getMusicItem(elem: HTMLElement): HTMLElement | null {
    if (!elem || elem.classList.contains('music-item')) {
        return elem;
    } else {
        return getMusicItem(elem.parentElement);
    }
}
function initDom(): void {
    let html = '';
    for (let detail of MusicDetailList) {
        html = html + `
            <div class="music-item media text-muted pt-3" music-id="${detail.id}">
                <img style="width:32px;height:32px;" class="mr-2 rounded" src="//mailshark-test.nos-jd.163yun.com/document/static/344C59A98FD3693F923FE3E0FBBF0E3D.png"
                />
                <div class="media-body pb-3 border-bottom">
                    <strong class="music-name">${detail.name}</strong>
                </div>
            </div>
        `;
    }
    musicListElem.innerHTML = html;
}
function secondsToMinutes(seconds: number): string {
    if (!seconds) {
        return '00:00';
    }
    let tmp = Math.floor(seconds);
    let m = Math.floor(tmp / 60);
    let s = Math.floor(tmp % 60);
    return `${m > 10 ? m : ('0' + m)}:${s > 10 ? s : ('0' + s)}`;
}
function getMusicDetail(musicId: string): MusicDetail | null {
    for (let detail of MusicDetailList) {
        if (detail.id === musicId) {
            return detail;
        }
    }
    return null;
}
function doPlay(): void {
    currentMedia.musicItemElem.classList.add('playing');
    currentMedia.audioElem.play();
    currentMedia.playing = true;
}
function doPause(): void {
    currentMedia.musicItemElem.classList.remove('playing');
    currentMedia.audioElem.pause();
    currentMedia.playing = false;
}
const MusicDetailList: Array<MusicDetail> = [
    {
        id: 'm1',
        name: '梦里梦外都是你',
        url: '//mailshark-test.nos-jd.163yun.com/document/static/C11B987AC3D230B65491CCFCB967E674.m4a'
    }, {
        id: 'm2',
        name: '我们的时光',
        url: '//mailshark-test.nos-jd.163yun.com/document/static/C58C9F85A602E16983271F86F565F2E4.mp3'
    }, {
        id: 'm3',
        name: '青柠',
        url: '//mailshark-test.nos-jd.163yun.com/document/static/89F944885717FC8951BFFC7B4BB5261C.mp3'
    }, {
        id: 'm4',
        name: '纸短情长',
        url: '//mailshark-test.nos-jd.163yun.com/document/static/8F6BEC7E55A47FB37C343FA551592AB2.mp3'
    }
];
const musicListElem: HTMLElement = document.querySelector('#musicList');
const musicProgressbar: HTMLElement = document.querySelector('#musicProgressbar');
const musicPlayedTime: HTMLElement = document.querySelector('#musicPlayedTime');
const musicTotalTime: HTMLElement = document.querySelector('#musicTotalTime');
const musicName: HTMLElement = document.querySelector('#musicName');
let currentMedia: {
    musicDetail: MusicDetail,
    musicItemElem: HTMLElement,
    audioElem: HTMLAudioElement,
    playing: boolean
} = null; //当前音频是否正在播放
musicListElem.addEventListener('click', function (event: MouseEvent) {
    let target = event.target as HTMLElement;
    let musicItem = getMusicItem(target);
    if (!musicItem) {
        return;
    }
    let musicId = musicItem.getAttribute('music-id');
    if (currentMedia) {
        // 如果当前已经有歌曲
        if (musicId === currentMedia.musicDetail.id) {
            //点击了当前的歌曲，就暂停播放或者继续播放
            if (currentMedia.playing) {
                doPause();
            } else {
                doPlay();
            }
            return;
        } else {
            //如果点击了其他歌曲，就把当前歌曲销毁，重新初始化点击的歌曲
            if (currentMedia.playing) {
                doPause();
            }
            currentMedia.audioElem = null
            currentMedia = null;
        }
    }
    let musicDetail = getMusicDetail(musicId);
    if (musicDetail) {
        //歌曲初始化
        let audio = document.createElement('audio');
        audio.setAttribute('preload', 'true');
        audio.setAttribute('loop', 'true');
        audio.setAttribute('src', musicDetail.url);
        currentMedia = {
            musicDetail: musicDetail,
            musicItemElem: musicItem,
            audioElem: audio,
            playing: false
        };
        currentMedia.musicItemElem.classList.add('playing');
        musicProgressbar.style.width = '0%';
        musicPlayedTime.innerText = secondsToMinutes(0);
        musicTotalTime.innerText = secondsToMinutes(currentMedia.audioElem.duration);
        musicName.innerText = currentMedia.musicDetail.name;
        audio.addEventListener('loadedmetadata', function (event) {
            doPlay();
        });
        audio.addEventListener('timeupdate', function (event) {
            musicProgressbar.style.width = currentMedia.audioElem.currentTime / currentMedia.audioElem.duration * 100 + '%';
            musicPlayedTime.innerText = secondsToMinutes(currentMedia.audioElem.currentTime);
        });
    }
});
initDom();


