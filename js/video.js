// IIFE
(function(){
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        video = document.getElementById('video'),
        // URL API within Browser to inject into video element
        vendorUrl = window.URL || window.webkitURL

    // Taking audio stream from user
    navigator.getMedia = navigator.getUserMedia || 
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia
                         // cross-broswer compatibilty

    // capture video
    navigator.getMedia({
        video: true,
        audio: false
    }, function(stream){
        video.src = vendorUrl.createObjectURL(stream)
        video.play()
    }, function(error){
        console.log(error)
    })

})()