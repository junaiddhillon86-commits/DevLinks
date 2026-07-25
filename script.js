var prname=document.querySelector("#n");
var edname=document.querySelector(".name");
const profilePic = document.getElementById('profilePic');
const preview = document.querySelector('.img');
const prevBio=document.querySelector(".bio");
const editBio=document.querySelector(".bioo");
const defaultname = prname.textContent; // ✅ captured ONCE, before any typing
const defaultBio=prevBio.textContent;


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
