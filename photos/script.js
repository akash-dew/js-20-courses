// let apiKey = 'gOxUmBcoTkWITWbveUaN4U-4_OXLtDQkwG9GxU49kHA';
let apiKey = 'Y7-o48R4FPa7DmJsbRIbZMWSELHNXMAXRdZzKxP0kzc';
let count = 6;
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&w=400&count=${count}&query=dog`;
let photosArr = [];
let photoContainer = document.querySelector('.box');


function displayMe(i){
       
    let div = document.createElement('div');
    div.classList.add('popup');

    let img = document.createElement('img');
    img.src = i;

    div.appendChild(img)
    document.body.appendChild(div)

    let btn = document.createElement('button');
    btn.innerText = 'Close';
    btn.classList.add('close');
    div.appendChild(btn)
    btn.addEventListener('click', function(){
        btn.parentElement.remove();
        window.document.body.classList.remove('bodyPopup')
    })

    window.document.body.classList.add('bodyPopup')


  
}



function displayPhotos(){
    photosArr.forEach(function(photo){

        let img = document.createElement('img');
        img.src = photo.urls.small;
        let imgBig = photo.urls.full;
        img.addEventListener('click', function(){
            displayMe(imgBig)
        })
    
        photoContainer.appendChild(img);

    })
}
       


async function getPhoto(){
    try{
        let response = await fetch(apiUrl);
        let data = await response.json();
        photosArr = data;
        displayPhotos()
    }
    catch(error){
        console.log('no data error')

    }
}

getPhoto()


window.addEventListener('scroll', function(){
    if((window.pageYOffset + window.innerHeight ) > photoContainer.clientHeight){
        console.log('hurray');
        displayPhotos()
    }else{
        console.log(window.scrollY  + ' === ' + photoContainer.clientHeight)

    }
})
