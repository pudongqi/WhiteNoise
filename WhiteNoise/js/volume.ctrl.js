$.fn.volumeSlider = function () {
    $(this).empty();

    var sliderWrapper = document.createElement("div");
    $(sliderWrapper).addClass("slider-wrapper");

    $(this).append(sliderWrapper);

    var sliderContainer = document.createElement("div");
    $(sliderContainer).addClass("slider-container");

    $(sliderWrapper).append(sliderContainer);

    var sliderRange = document.createElement("div");
    $(sliderRange).addClass("slider-range");

    var sliderLoaded = document.createElement("div");
    $(sliderLoaded).addClass("slider-loaded").css("width", "50%");

    $(sliderContainer).append(sliderRange);
    $(sliderContainer).append(sliderLoaded);

    var sliderHandler = document.createElement("span");
    $(sliderHandler).addClass("slider-handler").css("left", "50%");

    $(sliderContainer).append(sliderHandler);

};