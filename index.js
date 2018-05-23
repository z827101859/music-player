function addMusicDom(musicDetail) {
    var html = "\n    <div class=\"music-item media text-muted pt-3\" music-id=\"" + musicDetail.id + "\">\n        <img class=\"mr-2 rounded\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADWUlEQVRYR73XecilYxgG8N+kCZnIkj+YUogsEWkwEdn3LYxoGlMzQrLMH4aiKJSEIrIl2ZdsEUMa2XfZ1wiJKGWNsnbpPvV8p/N9n3nfM+5/zvm+87zPdd379c7w/9mq2BezcR3+CPSMlYwf0P1wFA7FrMI7EveuLAKrNaCHNKB/4nusi+Nw+zgJBHT/8jSga5Snf+Fp3Im7cSFOGheB1RvQgxvQv/EC7irgb4vMRrgFu/YhENADytODGtBgvFaACe1XTW1tgisrLYOa65SChDkXr91c/nZ5ehs+q/+vhSPwYxVaPE4hPoyFWNw1ApviY/yAKyqc+Tu2Dg5Dqntv/I5zcelQl13dpwY2w4d4GTtiPRxe6dijiMXL+7EMv41o8V4ENscH+BrvY7f6/kCBPoW02lTWi8AWeK96ORfF01dXcJD1IrAV3sFz2GUFgQfHexHYGqn6Z6uXu3DoRWAbvFmTLfnvYr0IbIs3kGLbvQs6ehHYDq/jSaTtulgvAtvXuF2OPadBz8g+rfb/z9W+V+HMPoNoB7yCJ2raTcYhu+J6bDB04Nca12nnTrtgDl7C4+XZKAI74xmsUuduxS+1NRc1D3QikPH7Ih6r5TKKQEZwZNc1OKW+P1IHT8C19b0TgXj3PB6tlTxMIHn/CREha+KS8jxLLFrg8yriFPOxuCMXjNKEWbfn4OQKZdZsvH6oPuPRgSPcD0jOZlxnamZxJRIp2rRv9OENmI+jcc8oAnuVdGp3/gAruYzUysaLApouApdhAdIFn2BuE4FEM+mcEIGs108xE+fjwaZqw/r0QkwkovtGWdIT8ZFc53y0Qe6NAp5XcjzbdENEuk0gcDYuwnlFIJ834otCurnCF2IRH6Nsp9oVU3XBiU0xTiCQPO+DXJJevbi23sZ4q6Zf2ir7P0JkMos6Tq6H50BSGJV0eftgW4TJSVotSycvEcdjaV0WKZ1BEvCo3WOmIJCf0hGnNkI0DkSSfzP8XEvgpiqaM0pSpeVSjF9iS1xQlw5SNA2H//ZzSyDhTxoSqhRPtF9S8W4V3X11ZbRhqnosNjwHUmCp8Gi7tNtHyBoOuVjyt2QsyHXJMIG04FlIRySPA/uuhlPa69/2GZdN9na8fr1EhEReKNOOedEYu/0DF0rRIULbancAAAAASUVORK5CYII=\"\n        />\n        <div class=\"media-body pb-3 border-bottom\">\n            <strong class=\"music-name\">" + musicDetail.name + "</strong>\n        </div>\n    </div>\n    ";
    musicList.append(html);
}
function initDom() {
    for (var _i = 0, MusicDetailList_1 = MusicDetailList; _i < MusicDetailList_1.length; _i++) {
        var detail = MusicDetailList_1[_i];
        addMusicDom(detail);
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
    $(".music-item[music-id=" + $(currentAudioElem).attr('music-id') + "]").addClass('active');
    currentAudioElem.play();
    isplaying = true;
}
function doPause() {
    $(".music-item[music-id=" + $(currentAudioElem).attr('music-id') + "]").removeClass('active');
    currentAudioElem.pause();
    isplaying = false;
}
function doInit(musicDetail) {
    musicProgressbar.css('width', '0%');
    musicPlayedTime.text(secondsToMinutes(0));
    musicTotalTime.text(secondsToMinutes(currentAudioElem.duration));
    musicName.text(musicDetail.name);
    doPlay();
}
function doDestroy() {
    if (isplaying) {
        doPause();
    }
    $(currentAudioElem).off();
    $(currentAudioElem).remove();
    currentAudioElem = null;
    loading = false;
}
function playMusic(musicDetail) {
    if (loading) {
        doDestroy();
    }
    loading = true;
    var audio = $("<audio music-id=\"" + musicDetail.id + "\" src=\"" + musicDetail.url + "\" preload=\"auto\" loop=\"true\"></audio>");
    currentAudioElem = audio[0];
    $(document.body).append(currentAudioElem);
    audio.on('loadedmetadata', function (event) {
        loading = false;
        doInit(musicDetail);
    });
    audio.on('timeupdate', function (event) {
        musicProgressbar.css('width', currentAudioElem.currentTime / currentAudioElem.duration * 100 + '%');
        musicPlayedTime.text(secondsToMinutes(currentAudioElem.currentTime));
    });
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
    }
];
var globalPlay = $('#globalPlay');
var globalPause = $('#globalPause');
var musicList = $('#musicList');
var musicProgressbar = $('#musicProgressbar');
var musicPlayedTime = $('#musicPlayedTime');
var musicTotalTime = $('#musicTotalTime');
var musicName = $('#musicName');
var addMusicBtn = $('#addMusicBtn');
var addMusicDialogConfrim = $('#addMusicDialogConfrim');
var musicIdIndex = 1000;
var currentAudioElem = null; //当前是否有音频
var isplaying = false; //当前音频是否正在播放
var loading = false; //当前是否有音频正在加载
musicList.on('click', '.music-item', function (event) {
    var musicItem = $(event.currentTarget);
    var musicId = musicItem.attr('music-id');
    if (currentAudioElem) {
        var currentMusicId = $(currentAudioElem).attr('music-id');
        if (musicId === currentMusicId) {
            //点击了正在播放的歌曲，就暂停或者继续播放
            if (isplaying) {
                doPause();
            }
            else {
                doPlay();
            }
            return;
        }
        else {
            //如果点击了正在播放的歌曲，就换首歌播放
            doDestroy();
        }
    }
    var musicDetail = getMusicDetail(musicId);
    if (musicDetail) {
        playMusic(musicDetail);
    }
});
globalPlay.on('click', function () {
    if (currentAudioElem) {
        if (!isplaying) {
            doPlay();
        }
    }
    else {
        var musicDetail = MusicDetailList[0];
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
    var name = $('#addMusicNameLabel').val().toString();
    var url = $('#addMusicUrlLabel').val().toString();
    if (!name) {
        alert('音乐名称不能为空');
        return;
    }
    if (!url) {
        alert('音乐url不能为空');
        return;
    }
    var musicDetail = {
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
