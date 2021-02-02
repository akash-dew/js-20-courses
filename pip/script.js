const videoEle = document.getElementById('video');
const videoBtn = document.getElementById('btn');

async function stream(){
    try{
        const response = await navigator.mediaDevices.getDisplayMedia();
        videoEle.srcObject = response;
        videoEle.onloadedmetadata = () => {
            videoEle.play()
        }
    }
    catch(error){
        console.log('rerr'+ error)
    }
}


videoBtn.addEventListener('click', async () => {
    videoBtn.disabled = true;

    await videoEle.requestPictureInPicture()
    videoBtn.disabled = false;


})

stream();