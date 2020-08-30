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
        video.srcObject = stream
        video.play()
    }, function(error){
        console.log(error)
    })

    video.addEventListener('play', function(){
        draw(this, context, 500, 400)
    }, false)

    function draw(video, context, width, height){
        var image, data, i, r, g, b, brightness;

        context.drawImage(video, 0, 0, width, height)

        image = context.getImageData(0, 0, width, height)
        // get image data to manipulate the r, g and b values
        data = image.data
        
        for(i = 0; i < data.length; i = i + 4){
            r = data[i]
            g = data[i + 1]
            b = data[i + 2]
            brightness = (r * 3 + b * 2 + g)/3

            data[i] = data[i + 1] = data[i + 2] = brightness
        }

        image.data = data

        context.putImageData(image, 0, 0)

        setTimeout(draw, 10, video, context, width, height)
    }

})()
