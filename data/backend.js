let reqHeader = new XMLHttpRequest();

reqHeader.addEventListener('load',()=>{
    console.log(reqHeader.response);
})

reqHeader.open('GET', 'https://supersimplebackend.dev/images/apple.jpg');
reqHeader.send();

