function getMusicItem(elem) {
    if (!elem || elem.classList.contains('music-item')) {
        return elem;
    }
    else {
        return getMusicItem(elem.parentElement);
    }
}
function initDom() {
    var html = '';
    for (var _i = 0, MusicDetailList_1 = MusicDetailList; _i < MusicDetailList_1.length; _i++) {
        var detail = MusicDetailList_1[_i];
        html = html + ("\n            <div class=\"music-item media text-muted pt-3\" music-id=\"" + detail.id + "\">\n                <img class=\"mr-2 rounded\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADWUlEQVRYR73XecilYxgG8N+kCZnIkj+YUogsEWkwEdn3LYxoGlMzQrLMH4aiKJSEIrIl2ZdsEUMa2XfZ1wiJKGWNsnbpPvV8p/N9n3nfM+5/zvm+87zPdd379c7w/9mq2BezcR3+CPSMlYwf0P1wFA7FrMI7EveuLAKrNaCHNKB/4nusi+Nw+zgJBHT/8jSga5Snf+Fp3Im7cSFOGheB1RvQgxvQv/EC7irgb4vMRrgFu/YhENADytODGtBgvFaACe1XTW1tgisrLYOa65SChDkXr91c/nZ5ehs+q/+vhSPwYxVaPE4hPoyFWNw1ApviY/yAKyqc+Tu2Dg5Dqntv/I5zcelQl13dpwY2w4d4GTtiPRxe6dijiMXL+7EMv41o8V4ENscH+BrvY7f6/kCBPoW02lTWi8AWeK96ORfF01dXcJD1IrAV3sFz2GUFgQfHexHYGqn6Z6uXu3DoRWAbvFmTLfnvYr0IbIs3kGLbvQs6ehHYDq/jSaTtulgvAtvXuF2OPadBz8g+rfb/z9W+V+HMPoNoB7yCJ2raTcYhu+J6bDB04Nca12nnTrtgDl7C4+XZKAI74xmsUuduxS+1NRc1D3QikPH7Ih6r5TKKQEZwZNc1OKW+P1IHT8C19b0TgXj3PB6tlTxMIHn/CREha+KS8jxLLFrg8yriFPOxuCMXjNKEWbfn4OQKZdZsvH6oPuPRgSPcD0jOZlxnamZxJRIp2rRv9OENmI+jcc8oAnuVdGp3/gAruYzUysaLApouApdhAdIFn2BuE4FEM+mcEIGs108xE+fjwaZqw/r0QkwkovtGWdIT8ZFc53y0Qe6NAp5XcjzbdENEuk0gcDYuwnlFIJ834otCurnCF2IRH6Nsp9oVU3XBiU0xTiCQPO+DXJJevbi23sZ4q6Zf2ir7P0JkMos6Tq6H50BSGJV0eftgW4TJSVotSycvEcdjaV0WKZ1BEvCo3WOmIJCf0hGnNkI0DkSSfzP8XEvgpiqaM0pSpeVSjF9iS1xQlw5SNA2H//ZzSyDhTxoSqhRPtF9S8W4V3X11ZbRhqnosNjwHUmCp8Gi7tNtHyBoOuVjyt2QsyHXJMIG04FlIRySPA/uuhlPa69/2GZdN9na8fr1EhEReKNOOedEYu/0DF0rRIULbancAAAAASUVORK5CYII=\"\n                />\n                <div class=\"media-body pb-3 border-bottom\">\n                    <strong class=\"music-name\">" + detail.name + "</strong>\n                </div>\n            </div>\n        ");
    }
    musicListElem.innerHTML = html;
}
function secondsToMinutes(seconds) {
    if (!seconds) {
        return '00:00';
    }
    var tmp = Math.floor(seconds);
    var m = Math.floor(tmp / 60);
    var s = Math.floor(tmp % 60);
    return (m > 10 ? m : ('0' + m)) + ":" + (s > 10 ? s : ('0' + s));
}
function getMusicDetail(musicId) {
    for (var _i = 0, MusicDetailList_2 = MusicDetailList; _i < MusicDetailList_2.length; _i++) {
        var detail = MusicDetailList_2[_i];
        if (detail.id === musicId) {
            return detail;
        }
    }
    return null;
}
function doPlay() {
    currentMedia.musicItemElem.classList.add('playing');
    currentMedia.audioElem.play();
    currentMedia.playing = true;
}
function doPause() {
    currentMedia.musicItemElem.classList.remove('playing');
    currentMedia.audioElem.pause();
    currentMedia.playing = false;
}
var MusicDetailList = [
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
var musicListElem = document.querySelector('#musicList');
var musicProgressbar = document.querySelector('#musicProgressbar');
var musicPlayedTime = document.querySelector('#musicPlayedTime');
var musicTotalTime = document.querySelector('#musicTotalTime');
var musicName = document.querySelector('#musicName');
var currentMedia = null; //当前音频是否正在播放
musicListElem.addEventListener('click', function (event) {
    var target = event.target;
    var musicItem = getMusicItem(target);
    if (!musicItem) {
        return;
    }
    var musicId = musicItem.getAttribute('music-id');
    if (currentMedia) {
        // 如果当前已经有歌曲
        if (musicId === currentMedia.musicDetail.id) {
            //点击了当前的歌曲，就暂停播放或者继续播放
            if (currentMedia.playing) {
                doPause();
            }
            else {
                doPlay();
            }
            return;
        }
        else {
            //如果点击了其他歌曲，就把当前歌曲销毁，重新初始化点击的歌曲
            if (currentMedia.playing) {
                doPause();
            }
            currentMedia.audioElem = null;
            currentMedia = null;
        }
    }
    var musicDetail = getMusicDetail(musicId);
    if (musicDetail) {
        //歌曲初始化
        var audio = document.createElement('audio');
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
