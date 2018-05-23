
function addMusicDom(musicDetail) {
    let html = `
    <div class="music-item media text-muted pt-3" music-id="${musicDetail.id}">
        <img class="mr-2 rounded" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADWUlEQVRYR73XecilYxgG8N+kCZnIkj+YUogsEWkwEdn3LYxoGlMzQrLMH4aiKJSEIrIl2ZdsEUMa2XfZ1wiJKGWNsnbpPvV8p/N9n3nfM+5/zvm+87zPdd379c7w/9mq2BezcR3+CPSMlYwf0P1wFA7FrMI7EveuLAKrNaCHNKB/4nusi+Nw+zgJBHT/8jSga5Snf+Fp3Im7cSFOGheB1RvQgxvQv/EC7irgb4vMRrgFu/YhENADytODGtBgvFaACe1XTW1tgisrLYOa65SChDkXr91c/nZ5ehs+q/+vhSPwYxVaPE4hPoyFWNw1ApviY/yAKyqc+Tu2Dg5Dqntv/I5zcelQl13dpwY2w4d4GTtiPRxe6dijiMXL+7EMv41o8V4ENscH+BrvY7f6/kCBPoW02lTWi8AWeK96ORfF01dXcJD1IrAV3sFz2GUFgQfHexHYGqn6Z6uXu3DoRWAbvFmTLfnvYr0IbIs3kGLbvQs6ehHYDq/jSaTtulgvAtvXuF2OPadBz8g+rfb/z9W+V+HMPoNoB7yCJ2raTcYhu+J6bDB04Nca12nnTrtgDl7C4+XZKAI74xmsUuduxS+1NRc1D3QikPH7Ih6r5TKKQEZwZNc1OKW+P1IHT8C19b0TgXj3PB6tlTxMIHn/CREha+KS8jxLLFrg8yriFPOxuCMXjNKEWbfn4OQKZdZsvH6oPuPRgSPcD0jOZlxnamZxJRIp2rRv9OENmI+jcc8oAnuVdGp3/gAruYzUysaLApouApdhAdIFn2BuE4FEM+mcEIGs108xE+fjwaZqw/r0QkwkovtGWdIT8ZFc53y0Qe6NAp5XcjzbdENEuk0gcDYuwnlFIJ834otCurnCF2IRH6Nsp9oVU3XBiU0xTiCQPO+DXJJevbi23sZ4q6Zf2ir7P0JkMos6Tq6H50BSGJV0eftgW4TJSVotSycvEcdjaV0WKZ1BEvCo3WOmIJCf0hGnNkI0DkSSfzP8XEvgpiqaM0pSpeVSjF9iS1xQlw5SNA2H//ZzSyDhTxoSqhRPtF9S8W4V3X11ZbRhqnosNjwHUmCp8Gi7tNtHyBoOuVjyt2QsyHXJMIG04FlIRySPA/uuhlPa69/2GZdN9na8fr1EhEReKNOOedEYu/0DF0rRIULbancAAAAASUVORK5CYII="
        />
        <div class="media-body pb-3 border-bottom">
            <strong class="music-name">${musicDetail.name}</strong>
        </div>
    </div>
    `;
    musicList.append(html);
}
function initDom() {
    for (let detail of MusicDetailList) {
        addMusicDom(detail);
    }
}
function secondsToMinutes(seconds) {
    if (!seconds) {
        return '00:00';
    }
    let tmp = Math.floor(seconds);
    let m = Math.floor(tmp / 60);
    let s = Math.floor(tmp % 60);
    return `${m > 10 ? m : ('0' + m)}:${s > 10 ? s : ('0' + s)}`;
}
function getMusicDetail(musicId) {
    for (let detail of MusicDetailList) {
        if (detail.id === musicId) {
            return detail;
        }
    }
    return null;
}
function doPlay() {
    currentAudioElem.play();
    isplaying = true;
}
function doPause() {
    currentAudioElem.pause();
    isplaying = false;
}
function doDestroy() {
    if (isplaying) {
        doPause();
    }
    $(currentAudioElem).off();
    $(`.music-item[music-id=${$(currentAudioElem).attr('music-id')}`).removeClass('active');
    currentAudioElem = null;
    loading = false;
}
function playMusic(musicDetail) {
    if (loading) {
        doDestroy();
    }
    loading = true;
    let audio = $(`<audio music-id="${musicDetail.id}" src="${musicDetail.url}" preload="auto"></audio>`);
    currentAudioElem = audio[0];
    audio.on('canplay', function (event) {
        loading = false;
        musicProgressbar.css('width', '0%');
        musicPlayedTime.text(secondsToMinutes(0));
        musicTotalTime.text(secondsToMinutes(currentAudioElem.duration));
        musicName.text(musicDetail.name);
        doPlay();
        $(`.music-item[music-id=${$(currentAudioElem).attr('music-id')}`).addClass('active');
    });
    audio.on('timeupdate', function (event) {
        musicProgressbar.css('width', currentAudioElem.currentTime / currentAudioElem.duration * 100 + '%');
        musicPlayedTime.text(secondsToMinutes(currentAudioElem.currentTime));
    });
}
const MusicDetailList = [
    {
        id: 'm1',
        name: '梦里梦外都是你',
        url: 'http://mailshark-test.nos-jd.163yun.com/document/static/C11B987AC3D230B65491CCFCB967E674.m4a'
    }, {
        id: 'm2',
        name: '我们的时光',
        url: 'http://mailshark-test.nos-jd.163yun.com/document/static/C58C9F85A602E16983271F86F565F2E4.mp3'

    }
];
const globalPlay = $('#globalPlay');
const globalPause = $('#globalPause');
const musicList = $('#musicList');
const musicProgressbar = $('#musicProgressbar');
const musicPlayedTime = $('#musicPlayedTime');
const musicTotalTime = $('#musicTotalTime');
const musicName = $('#musicName');
const addMusicBtn = $('#addMusicBtn');
const addMusicDialogConfrim = $('#addMusicDialogConfrim');
let musicIdIndex = 1000;
let currentAudioElem = null; //当前是否有音频
let isplaying = false; //当前音频是否正在播放
let loading = false; //当前是否有音频正在加载
musicList.on('click', '.music-item', function (event) {
    let musicItem = $(event.currentTarget);
    let musicId = musicItem.attr('music-id');
    if (currentAudioElem) {
        let currentMusicId = $(currentAudioElem).attr('music-id');
        if (musicId === currentMusicId) {
            //点击了正在播放的歌曲，就暂停或者继续播放
            if (isplaying) {
                doPause();
            } else {
                doPlay();
            }
            return;
        } else {
            //如果点击了正在播放的歌曲，就换首歌播放
            doDestroy();
        }
    }
    let musicDetail = getMusicDetail(musicId);
    if (musicDetail) {
        playMusic(musicDetail);
    }
});
globalPlay.on('click', function () {
    if (currentAudioElem) {
        if (!isplaying) {
            doPlay();
        }
    } else {
        let musicDetail = MusicDetailList[0];
        if (musicDetail) {
            playMusic(musicDetail);
        }
    }
});
globalPause.on('click', function () {
    if (currentAudioElem) {
        if (isplaying) {
            doPause();
        }
    }
});
addMusicBtn.on('click', function () {
    $('#addMusicDialog').modal('show');
});
addMusicDialogConfrim.on('click', function () {
    let name = $('#addMusicNameLabel').val();
    let url = $('#addMusicUrlLabel').val();
    if (!name) {
        alert('音乐名称不能为空');
        return;
    }
    if (!url) {
        alert('音乐url不能为空');
        return;
    }
    if (!/^http/.test(url)) {
        alert('音乐url必须是http的路径');
        return;
    }
    let musicDetail = {
        id: 'm' + (++musicIdIndex),
        name: name,
        url: url
    };
    MusicDetailList.push(musicDetail);
    addMusicDom(musicDetail);
    $('#addMusicNameLabel').val('');
    $('#addMusicUrlLabel').val('');
    $('#addMusicDialog').modal('hide');
});
initDom();

// 怎么添加本地文件呢？参考云课堂的audio视频章节
// 这次添加了，下次又没有了怎么办呢？ 本地缓存，服务端持久化