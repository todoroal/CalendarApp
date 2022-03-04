
const save_btn = document.querySelector('.saveButton');

//we get the Username of current User
const currentUser = localStorage["currentUser"]; 




function save(){
    console.log("Save button has been pressed");
    console.log("Name of current User: "+currentUser);
    console.log("Content of textarea: "+document.getElementById("storageInput").value);
    localStorage.setItem(currentUser, document.getElementById("storageInput").value);
    console.log("textcontent has been saved to localstorage");
}

document.addEventListener('DOMContentLoaded', function() {
    console.log("---Page has loaded and storage gets read----");
    
    //the textarea gets filled with the content from the storage 
    document.getElementById("storageInput").value = localStorage.getItem(currentUser);
}, false);
