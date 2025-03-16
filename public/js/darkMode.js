isDark = localStorage.getItem("darkModeSetting");

if(isDark == "true"){
    isDark = true;
} else {
    isDark = false;
}

if(isDark == null){
    isDark = true;
}

updateMode();

function setDark(){
    isDark = true;
    localStorage.setItem("darkModeSetting", true);
    updateMode();
    console.log("dark");
}

function setLight(){
    isDark = false;
    localStorage.setItem("darkModeSetting", false);
    updateMode();
    console.log("light");
}

function updateMode(){
    console.log(isDark);
    if(isDark){
        document.documentElement.setAttribute("data-bs-theme", "dark");
        console.log("set to dark");
    } else {
        document.documentElement.setAttribute("data-bs-theme", "light");
        console.log("set to light");
    }    
}