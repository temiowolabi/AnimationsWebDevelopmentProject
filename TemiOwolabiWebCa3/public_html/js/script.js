   
    let canvas = null;
            let ctx = null;
            let videoToPlay = null;
            let width = null;
            let height = null;
            let doubleBuffer = null;
            let doubleBufferG = null;

            let alphaImage = new Image();
            alphaImage.src = 'images/owl1.png';

            window.onload = onAllAssetsLoaded;
            document.write("<div id='loadingMessage'>Loading...</div>");
            function onAllAssetsLoaded()
            {
                // hide the webpage loading message
                document.getElementById('loadingMessage').style.visibility = "hidden";

                videoToPlay = document.getElementById('videoToPlay');
                canvas = document.getElementById('videoCanvas');
                ctx = canvas.getContext('2d');
                doubleBuffer = document.createElement('canvas');
                doubleBufferG = doubleBuffer.getContext('2d');
                width = videoToPlay.clientWidth;
                height = videoToPlay.clientHeight;
                canvas.width = width;
                canvas.height = height;
                doubleBuffer.width = width;
                doubleBuffer.height = height;

                //play the video 
                videoToPlay.play();

                renderCanvas();
            }


            function renderCanvas()
            {
                requestAnimationFrame(renderCanvas);

                if (videoToPlay.paused || videoToPlay.ended)
                {
                    //      return false;
                }
                // convert the video frame into an image
                doubleBufferG.drawImage(videoToPlay, 0, 0, width, height);

                let dataURL = doubleBuffer.toDataURL();
                let videoFrameImage = new Image();
                videoFrameImage.src = dataURL;

                // 1) define the alpha area   
                ctx.drawImage(alphaImage, 0, 0, width, height);

                // 2) select the alpha composite
                ctx.globalCompositeOperation = 'source-in';
                // 3) draw the original image
                // only the part that overlaps the alpha area will be visible  
                ctx.drawImage(videoFrameImage, 0, 0, width, height);
            }
            
            