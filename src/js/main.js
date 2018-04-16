import states from './states';
import brainbooster from './game';
import {game} from "./kapow";

let bb = null;
const isLocal = true;

if(!isLocal){
    // production
    window.game.onLoad = () => {
        console.log('kkpoo', window.kapow);
        bb = new brainbooster();
        bb.create();
    }
}else{
    //local
    window.onload = function() {
        window.kapow = null;  //for local dev
        bb = new brainbooster();
        bb.create();
    };
}



//backpress
window.game.onBackButtonPressed = () => {
    const currentScreen = document.querySelector('.openscreen');
    const screenclass = currentScreen.classList;
    let gototScreen = "";
    
    if(screenclass.contains('home')){
        if(!!kapow){
            bb.toggleBackgroundMusic(true);
            kapow.close();
        }
        return true;
    }else if(screenclass.contains('levels')){
        gototScreen = "home";
    }else if(screenclass.contains('playground')){

        //popup
        const popup = document.querySelector('.overlay');
        if(popup.style.display == "block"){
            return true;
        }

        //menu
        const menu = document.querySelector('.menuoverlay');
        if(menu.style.display == "block"){
            bb.toggleMenuBox('hideMenu');
            setTimeout(()=>{
                menu.style.display = 'none';
            }, 200);
            return true;
        }

        if(document.querySelector('.howtooverlay').style.display == "block"){
            return true;
        }

        gototScreen = "levels";
    }

    bb.toggleScreens(gototScreen, 'right');
    return true;
}


window.game.onPause = () => {
    bb.toggleBackgroundMusic(true);
}

window.game.onResume = () => {
    bb.toggleBackgroundMusic(false);
}
