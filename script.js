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
const linksContainer = document.querySelector(".links-container");
const previewLinks = document.querySelector(".links");
const addForm = document.getElementById('addForm');
const addBtn = document.getElementById('addBtn');
const confirmAddBtn = document.getElementById('confirmAddBtn');
const newLinkName = document.getElementById('newLinkName');
const newLinkUrl = document.getElementById('newLinkUrl');
const cancel=document.getElementById('canceladd');
const blk=document.querySelector(".blk");
const wht=document.querySelector(".wht");


edname.addEventListener("input", () => {
    if (edname.value.trim() === '') {
        prname.textContent = defaultname;
    } else {
        prname.textContent = edname.value;
    }
});


profilePic.addEventListener("change", () => {

    const file = profilePic.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        preview.src = e.target.result;

    };

    reader.readAsDataURL(file);

});




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

document.querySelectorAll('.link-item').forEach(item => {
    const label = item.querySelector('label').textContent;
    const input = item.querySelector('input');

    links.push({
        platform: label,
        url: input.value
    });
});
// console.log(links[0].platform);

    

addBtn.addEventListener("click",()=>{
    addForm.style.display='block';
    addBtn.style.display = 'none';
    newLinkName.focus();
cancel.addEventListener("click",()=>{
    addForm.style.display= 'none';
    addBtn.style.display = 'block';
})
})
confirmAddBtn.addEventListener('click', () => {
    const name = newLinkName.value.trim();
    const url = newLinkUrl.value.trim();

    if (!name || !url) {
        alert('Please fill in both fields');
        return;
    }

    const id = name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now();

    const linkData = { platform: name, url: url };
    links.push(linkData); // uses the SAME links array declared once at the top

    const linkItem = document.createElement('div');
    linkItem.className = 'link-item';
    linkItem.innerHTML = `
        <label for="${id}">${name}</label>
        <input type="url" value="${url}" id="${id}">
        <button type="button" class="delete-btn">Delete</button>
    `;

    linkItem.querySelector('.delete-btn').addEventListener('click', () => {
        linkItem.remove();
        links = links.filter(item => item !== linkData);
    });

    linksContainer.appendChild(linkItem);

    newLinkName.value = '';
    newLinkUrl.value = '';
    addForm.style.display = 'none';
    addBtn.style.display = 'block';
});
blk.addEventListener("click",()=>{
   document.body.style.backgroundColor='#0D1117';
})
wht.addEventListener("click",()=>{
    document.body.style.backgroundColor='white';
})
// ================= SAVE PROFILE =================

const saveBtn = document.querySelector(".save-btn");

const githubPreview = document.querySelector(".github");
const linkedinPreview = document.querySelector(".linkedin");
const instagramPreview = document.querySelector(".portfolio");

githubPreview.target = "_blank";
linkedinPreview.target = "_blank";
instagramPreview.target = "_blank";

saveBtn.addEventListener("click", () => {

    // Validate email
    if (emailInput.value.trim() !== "" && !emailInput.checkValidity()) {
        alert("Please enter a valid email.");
        return;
    }

    // Validate URLs
    const urlFields = [
        { input: ghl, name: "GitHub" },
        { input: inl, name: "LinkedIn" },
        { input: igl, name: "Instagram" }
    ];

    for (let field of urlFields) {
        if (field.input.value.trim() !== "" && !field.input.checkValidity()) {
            alert(field.name + " URL is not valid.");
            return;
        }
    }

    // Update first three links in array
    links[0] = {
        platform: "GitHub",
        url: ghl.value
    };

    links[1] = {
        platform: "LinkedIn",
        url: inl.value
    };

    links[2] = {
        platform: "Instagram",
        url: igl.value
    };

    // Remove old preview links
    previewLinks.innerHTML = "";

    // Create preview links
    links.forEach(item => {

        if (item.url.trim() === "") return;

        const a = document.createElement("a");

        a.className = "link";
        a.textContent = item.platform;
        a.href = item.url;
        a.target = "_blank";

        a.addEventListener("click", (e) => {

            if (
                !item.url.startsWith("https://") &&
                !item.url.startsWith("http://")
            ) {
                e.preventDefault();
                alert("Invalid URL");
            }

        });

        previewLinks.appendChild(a);

    });

    // Save everything
    const profileData = {

        name: prname.textContent,
        bio: prevBio.textContent,
        email: emailInput.value,

        github: ghl.value,
        linkedin: inl.value,
        instagram: igl.value,

        theme: document.body.style.backgroundColor,
        image: preview.src,

        links: links

    };

    localStorage.setItem("devlinksProfile", JSON.stringify(profileData));

    alert("Profile Saved Successfully!");

});
// ================= LOAD PROFILE =================

window.addEventListener("load", () => {

    const saved = JSON.parse(localStorage.getItem("devlinksProfile"));

    if (!saved) return;

    // Restore profile
    prname.textContent = saved.name;
    edname.value = saved.name;

    prevBio.textContent = saved.bio;
    editBio.value = saved.bio;

    emailInput.value = saved.email;

    ghl.value = saved.github;
    inl.value = saved.linkedin;
    igl.value = saved.instagram;

    preview.src = saved.image;

    if (saved.theme) {
        document.body.style.backgroundColor = saved.theme;
    }

    // Restore links array
    if (saved.links) {

        links = saved.links;

        previewLinks.innerHTML = "";

        links.forEach(item => {

            if (item.url.trim() === "") return;

            const a = document.createElement("a");

            a.className = "link";
            a.textContent = item.platform;
            a.href = item.url;
            a.target = "_blank";

            a.addEventListener("click", (e) => {

                if (
                    !item.url.startsWith("https://") &&
                    !item.url.startsWith("http://")
                ) {
                    e.preventDefault();
                    alert("Invalid URL");
                }

            });

            previewLinks.appendChild(a);

        });

    }

});
