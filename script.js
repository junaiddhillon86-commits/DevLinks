var prname=document.querySelector("#n");
var edname=document.querySelector(".name");
const profilePic = document.getElementById('profilePic');
const preview = document.querySelector('.img');
const prevBio=document.querySelector(".bio");
const editBio=document.querySelector(".bioo");
const defaultname = prname.textContent; 
const defaultBio=prevBio.textContent;
let prevEmail;
const emailInput = document.querySelector('.em');
let ghUrl;
let inUrl;
let igUrl;
const ghl=document.querySelector("#gh");
const inl=document.querySelector("#in");
const igl = document.querySelector("#ig");



edname.addEventListener("input", () => {
    if (edname.value.trim() === '') {
        prname.textContent = defaultname;
    } else {
        prname.textContent = edname.value;
    }
});


profilePic.addEventListener("change",()=>{
const file=profilePic.files[0];

if(file){
    const imageURL= URL.createObjectURL(file);
    preview.src= imageURL;
}
})



editBio.addEventListener("input",()=>{
if(editBio.value.trim()===''){
    prevBio.textContent=defaultBio;
}
else{
    prevBio.textContent=editBio.value;

}

})
emailInput.addEventListener("input",()=>{
   
   prevEmail = emailInput.value;

// if (emailInput.checkValidity()) {
 
// } else {
//   alert("Invalid:", emailInput.validationMessage);
// }

// console.log(prevEmail);
})
ghl.addEventListener("input",()=>{
ghUrl=ghl.value;
})
inl.addEventListener("input",()=>{
inUrl=inl.value;
})
igl.addEventListener("input",()=>{
igUrl=igl.value;
})

let links = [];

links.push({
    platform: "GitHub",
    url: ghUrl
});

links.push({
    platform: "LinkedIn",
    url: inUrl
});

links.push({
    platform: "Instagram",
    url: igUrl
});
console.log(links[0].platform);
