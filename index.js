function getMusicList() {
    return fetch('getMusicList.json').then(function (response) {
        return response.json();
    }).then(function (result) {
        return result.data;
    });
}
function getMusicItemElem(elem) {
    if (!elem || elem.classList.contains('music-item')) {
        return elem;
    }
    else {
        return getMusicItemElem(elem.parentElement);
    }
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
function doPlay() {
    currentAudio.musicItemElem.classList.add('playing');
    currentAudio.audioElem.play();
    currentAudio.playing = true;
}
function doPause() {
    currentAudio.musicItemElem.classList.remove('playing');
    currentAudio.audioElem.pause();
    currentAudio.playing = false;
}
var musicListElem = document.querySelector('#musicList');
var musicProgressbar = document.querySelector('#musicProgressbar');
var musicPlayedTime = document.querySelector('#musicPlayedTime');
var musicTotalTime = document.querySelector('#musicTotalTime');
var musicName = document.querySelector('#musicName');
var MusicCache = new Map();
var currentAudio = null; //当前音频是否正在播放
musicListElem.addEventListener('click', function (event) {
    var musicItemElem = getMusicItemElem(event.target);
    var musicId = musicItemElem.getAttribute('music-id');
    if (currentAudio) {
        // 如果当前已经有歌曲
        if (musicId === currentAudio.musicDetail.id) {
            //点击了当前的歌曲，就暂停播放或者继续播放
            if (currentAudio.playing) {
                doPause();
            }
            else {
                doPlay();
            }
            return;
        }
        else {
            //如果点击了其他歌曲，就把当前歌曲销毁，重新初始化点击的歌曲
            if (currentAudio.playing) {
                doPause();
            }
            currentAudio = null;
        }
    }
    var musicDetail = MusicCache.get(musicId);
    if (musicDetail) {
        //歌曲初始化
        var audio = document.createElement('audio');
        audio.setAttribute('preload', 'true');
        audio.setAttribute('loop', 'true');
        audio.setAttribute('src', musicDetail.url);
        currentAudio = {
            musicDetail: musicDetail,
            musicItemElem: musicItemElem,
            audioElem: audio,
            playing: false
        };
        currentAudio.musicItemElem.classList.add('playing');
        musicProgressbar.style.width = '0%';
        musicPlayedTime.innerText = secondsToMinutes(0);
        musicTotalTime.innerText = secondsToMinutes(currentAudio.audioElem.duration);
        musicName.innerText = currentAudio.musicDetail.name;
        audio.addEventListener('loadedmetadata', function (event) {
            doPlay();
        });
        audio.addEventListener('timeupdate', function (event) {
            musicProgressbar.style.width = currentAudio.audioElem.currentTime / currentAudio.audioElem.duration * 100 + '%';
            musicPlayedTime.innerText = secondsToMinutes(currentAudio.audioElem.currentTime);
        });
    }
});
getMusicList().then(function (data) {
    var html = '';
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var detail = data_1[_i];
        MusicCache.set(detail.id, detail);
        html = html + ("\n            <div class=\"music-item media text-muted pt-3\" music-id=\"" + detail.id + "\">\n                <img style=\"width:32px;height:32px;\" class=\"mr-2 rounded\" src=\"//mailshark-test.nos-jd.163yun.com/document/static/344C59A98FD3693F923FE3E0FBBF0E3D.png\"/>\n                <div class=\"media-body pb-3 border-bottom\">\n                    <strong class=\"music-name\">" + detail.name + "</strong>\n                </div>\n            </div>\n        ");
    }
    musicListElem.innerHTML = html;
});
