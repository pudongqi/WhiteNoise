function isWeixinBrowser() {
    var ua = navigator.userAgent.toLowerCase();
    return (/micromessenger/.test(ua)) ? true : false;
}

$(document).ready(function () {
    if (isWeixinBrowser()) {
        $("#wechat_hint").show().animate({
            opacity: 1,
            top: 0
        }, 300, function () {
            $(this).css("-webkit-filter", "blur(0)");
        });
    }
});

var rainAudio = document.createElement("audio");
rainAudio.setAttribute("src", "audio/rain.mp3");
rainAudio.volume = .5;
rainAudio.loop = true;

var windAudio = document.createElement("audio");
windAudio.setAttribute("src", "audio/wind.mp3");
windAudio.volume = .5;
windAudio.loop = true;

var tideAudio = document.createElement("audio");
tideAudio.setAttribute("src", "audio/tide.mp3");
tideAudio.volume = .5;
tideAudio.loop = true;

var nightAudio = document.createElement("audio");
nightAudio.setAttribute("src", "audio/night.mp3");
nightAudio.volume = .5;
nightAudio.loop = true;

var morningAudio = document.createElement("audio");
morningAudio.setAttribute("src", "audio/morning.mp3");
morningAudio.volume = .5;
morningAudio.loop = true;

var bellAudio = document.createElement("audio");
bellAudio.setAttribute("src", "audio/bell.mp3");
bellAudio.volume = .5;
bellAudio.loop = true;

var farmAudio = document.createElement("audio");
farmAudio.setAttribute("src", "audio/farm.mp3");
farmAudio.volume = .5;
farmAudio.loop = true;

var fireAudio = document.createElement("audio");
fireAudio.setAttribute("src", "audio/fire.mp3");
fireAudio.volume = .5;
fireAudio.loop = true;

var spaceAudio = document.createElement("audio");
spaceAudio.setAttribute("src", "audio/space.mp3");
spaceAudio.volume = .5;
spaceAudio.loop = true;

$(".audio-wrapper").click(function (e) {
    e.preventDefault();
    var targetClass = e.target.classList;

    if (!targetClass.contains("slider-container") && !targetClass.contains("slider-wrapper") && !targetClass.contains("slider-container") && !targetClass.contains("slider-loaded") && !targetClass.contains("slider-handler") && !targetClass.contains("slider-range")) {

        $(this).toggleClass("active");
        switch (this.id) {
            case "rain":
                $(this).hasClass("active") ? rainAudio.play() : rainAudio.pause();
                break;
            case "wind":
                $(this).hasClass("active") ? windAudio.play() : windAudio.pause();
                break;
            case "tide":
                $(this).hasClass("active") ? tideAudio.play() : tideAudio.pause();
                break;
            case "night":
                $(this).hasClass("active") ? nightAudio.play() : nightAudio.pause();
                break;
            case "morning":
                $(this).hasClass("active") ? morningAudio.play() : morningAudio.pause();
                break;
            case "bell":
                $(this).hasClass("active") ? bellAudio.play() : bellAudio.pause();
                break;
            case "farm":
                $(this).hasClass("active") ? farmAudio.play() : farmAudio.pause();
                break;
            case "fire":
                $(this).hasClass("active") ? fireAudio.play() : fireAudio.pause();
                break;
            case "space":
                $(this).hasClass("active") ? spaceAudio.play() : spaceAudio.pause();
                break;
        }
    }
});

$("#rain_vol_ctrl").volumeSlider();
$("#wind_vol_ctrl").volumeSlider();
$("#tide_vol_ctrl").volumeSlider();
$("#night_vol_ctrl").volumeSlider();
$("#morning_vol_ctrl").volumeSlider();
$("#bell_vol_ctrl").volumeSlider();
$("#farm_vol_ctrl").volumeSlider();
$("#fire_vol_ctrl").volumeSlider();
$("#space_vol_ctrl").volumeSlider();

$(".slider-container").click(function (e) {
    var progress = new Number(e.offsetX * 100 / $(this).width()).toFixed(2);
    $($(this)[0].firstChild.nextSibling).css("width", progress + "%");
    $($(this)[0].lastChild).css("left", progress + "%");
    switch ($(this).parent().parent()[0].id) {
        case"rain_vol_ctrl":
            rainAudio.volume = progress / 100;
            break;
        case"wind_vol_ctrl":
            windAudio.volume = progress / 100;
            break;
        case"tide_vol_ctrl":
            tideAudio.volume = progress / 100;
            break;
        case"night_vol_ctrl":
            nightAudio.volume = progress / 100;
            break;
        case"morning_vol_ctrl":
            morningAudio.volume = progress / 100;
            break;
        case"bell_vol_ctrl":
            bellAudio.volume = progress / 100;
            break;
        case"farm_vol_ctrl":
            farmAudio.volume = progress / 100;
            break;
        case"fire_vol_ctrl":
            fireAudio.volume = progress / 100;
            break;
        case"space_vol_ctrl":
            spaceAudio.volume = progress / 100;
            break;

    }
});

var CloseAllAudio = function () {
    rainAudio.pause();
    windAudio.pause();
    tideAudio.pause();
    nightAudio.pause();
    morningAudio.pause();
    bellAudio.pause();
    farmAudio.pause();
    fireAudio.pause();
    spaceAudio.pause();
};

var setAudioVolume = function (id, vol) {
    var loadedStr = id + " .slider-loaded";
    var handlerStr = id + " .slider-handler";

    switch (id.split("#")[1] + "Audio") {
        case "rainAudio":
            rainAudio.play();
            rainAudio.volume = vol;
            break;
        case "windAudio":
            windAudio.play();
            windAudio.volume = vol;
            break;
        case "tideAudio":
            tideAudio.play();
            tideAudio.volume = vol;
            break;
        case "nightAudio":
            nightAudio.play();
            nightAudio.volume = vol;
            break;
        case "morningAudio":
            morningAudio.play();
            morningAudio.volume = vol;
            break;
        case "bellAudio":
            bellAudio.play();
            bellAudio.volume = vol;
            break;
        case "farmAudio":
            farmAudio.play();
            farmAudio.volume = vol;
            break;
        case "fireAudio":
            fireAudio.play();
            fireAudio.volume = vol;
            break;
        case "spaceAudio":
            spaceAudio.play();
            spaceAudio.volume = vol;
            break;
    }
    $(loadedStr).css("width", vol * 100 + "%");
    $(handlerStr).css("left", vol * 100 + "%");
}

$("#preset").change(function () {
    CloseAllAudio();
    $(".audio-wrapper").removeClass("active");

    $.ajax({
        url: "preset/preset.json",
        dataType: "json",
        success: function (data) {
            preset(data.presets[$("option:selected").val() - 1]);
        }, error: function (msg) {
            console.log("error" + msg);
        }
    })
});

var preset = function (data) {
    for (var i = 0; i < data.activeModel.length; i++) {
        var id = data.activeModel[i];
        var vol = data.activeVolume[i];
        $(id).addClass("active");
        setAudioVolume(id, vol);
    }
}