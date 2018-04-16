
import {elements, values, gamedata} from './constants';
import {$} from './helpers';
import shuffle from 'lodash/shuffle';
import findIndex from 'lodash/findIndex';


export default class Game{
 
    constructor(){
        this.homeScreen = null;
        this.levelsScreen = null;
        this.helpScreen = null;
        this.playgroundScreen = null;
        this.ishomeScreenInt = false;
        this.islevelScreenInt = false;
        this.playgroundScreenInt = false;
        this.isInTransition = false;
        this.musicEnable = true;
        this.userinfo = null;
        this.helpinit = false;
        this.helpscreenno = 1;

        //playgorund
        this.currentLevel = 0;
        this.currentLevelId = 0;
        this.totalCalculation = 0;
        this.totalClicks = 0;
        this.totalClicked = 0;
        this.target = 0;
        this.leveltime = 0;
        this.timer = null;
        this.popup = false;

        this.clickMusic = new Audio('music/click.mp3');
        this.timerMusic = new Audio('music/timer.mp3');
        this.winMusic = new Audio('music/won.mp3');
        this.loseMusic = new Audio('music/lose.mp3');
        this.backgroundMusic = new Audio('music/background.ogg');
        this.playSound('background');
        
    }

    create(){
        this.homeScreen = $(elements.screens.home);
        this.levelsScreen = $(elements.screens.levels);
        this.helpScreen = $(elements.screens.help);
        this.playgroundScreen = $(elements.screens.playground);
        this.initScreens(values.screens.home);
        // this.initScreens(values.screens.levels);
    }

    initScreens(name){
        switch (name) {
            case values.screens.home:
                if(!this.ishomeScreenInt){
                    this.ishomeScreenInt = true;
                    const playbutton = $(elements.buttons.play);
                    const help = $(elements.buttons.help);
                    const leaderboard = $(elements.buttons.leaderboard);
                    const music = $(elements.buttons.music);
                    const share = $(elements.buttons.share);

                    share.addEventListener('click', ()=>{
                        if(!!window.kapow){
                            window.kapow.social.share('Play Brain Booster game on Kapow.', null, ()=>{
                                console.log('shared');
                            },()=>{
                                console.log('error share');
                            });
                        }
                    });

                    playbutton.addEventListener('click', () =>{
                        this.playSound('click');

                        const tutorial = localStorage.getItem("tutorial");
                        if(tutorial == "yes"){
                            this.toggleScreens('levels', 'left');
                        }else{
                            help.click();
                        }

                        
                    });

                    help.addEventListener('click', () =>{
                        this.playSound('click');

                        setTimeout(()=>{
                            $('.howtooverlay').style.display = 'block';
                        }, 600);

                        this.toggleScreens(values.screens.playground, 'left');
                        this.createPlayground({
                            id: 1,
                            clicks: 5,
                            target: 299,
                            time: 60,
                            hint: '',
                            numbers:[
                                '+10',
                                's2',
                                '+4',
                                '+2',
                                'x10',
                                '+6',
                                '+3',
                                '+1',
                                '-10'
                            ]
                        }, true); 
                    });

                    leaderboard.addEventListener('click', () =>{
                        if(!!window.kapow){
                            window.kapow.boards.displayScoreboard({
                                'metric': 'stars',
                                'interval': 'alltime'
                            });
                        }else{
                            console.log('kapow not found..', kapow);
                        }
                        
                    });

                    music.addEventListener('click', (e) => {
                        if(this.musicEnable){
                            this.musicEnable = false;
                            e.target.classList.add('off');
                            this.playSound();
                        }else{
                            this.musicEnable = true;
                            e.target.classList.remove('off');
                            this.backgroundMusic.play(); 
                        }
                    });

                    this.getUserInfo(); //get user info

                }

                break;
            
            case values.screens.help:
                
                break;
        
            case values.screens.levels:
                if(!this.islevelScreenInt){
                    this.islevelScreenInt = true;
                    const listwrapp = $(`${elements.screens.levels} ${elements.levellist}`);
                    gamedata.levels.forEach((level, i) => {
                        const wrap = document.createElement('span');
                        wrap.className = 'box';
                        wrap.setAttribute('data-level', level.id);
                        // wrap.classList.add('inactive');
                        listwrapp.appendChild(wrap);
                        const item = document.createElement('button');
                        item.textContent = level.id;
                        // item.className = 'done';
                        item.addEventListener('click', (e) => {
                            if(!e.target.parentNode.classList.contains('inactive')){
                                this.playSound('click');
                                this.toggleScreens(values.screens.playground, 'left');
                                this.createPlayground(level);
                            }
                        });
                        wrap.appendChild(item);

                        const star = document.createElement('span');
                        star.className = "star";
                        star.textContent = 0;
                        wrap.appendChild(star);
                    });

                    $(`${elements.buttons.back}`).addEventListener('click', ()=>{
                        this.toggleScreens(values.screens.home, 'right');
                    });

                }
                break;

            case values.screens.playground:
                if(!this.playgroundScreenInt){
                    this.playgroundScreenInt = true;
                    $(`${elements.popup.wrap} ${elements.popup.next}`).addEventListener('click', ()=>{
                        $(elements.popup.dialog).classList.remove('showPopup');
                        $(elements.popup.wrap).classList.add('hidePopup');
                        setTimeout(()=>{
                            $(elements.popup.wrap).style.display = 'none';
                            $(elements.popup.wrap).classList.remove('hidePopup');
                        }, 700);
                         
                        if(gamedata.levels.length != this.currentLevelId){
                            const nextlevel = gamedata.levels[this.currentLevelId];
                            this.createPlayground(nextlevel);
                        }else{
                            this.toggleScreens(values.screens.levels, 'left');
                        }
                    });

                    $(`${elements.popup.wrap} ${elements.popup.playagain}`).addEventListener('click', ()=>{
                        $(elements.popup.dialog).classList.remove('showPopup');
                        $(elements.popup.wrap).classList.add('hidePopup');
                        setTimeout(()=>{
                            $(elements.popup.wrap).style.display = 'none';
                            $(elements.popup.wrap).classList.remove('hidePopup');
                        }, 700);
                        this.createPlayground(this.currentLevel);
                    });

                    $(`${elements.popup.wrap} ${elements.popup.menu}`).addEventListener('click', ()=>{
                        $(elements.popup.wrap).style.display = 'none';
                        this.toggleScreens(values.screens.levels, 'right');
                    });

                    $(elements.playground.menu).addEventListener('click', ()=>{
                        $(elements.playground.menuoverlay).style.display = 'block';
                        this.toggleMenuBox('openMenu');
                    });

                    $(elements.playground.reset).addEventListener('click', ()=>{
                        this.createPlayground(this.currentLevel);
                        this.toggleMenuBox('hideMenu');
                        setTimeout(()=>{
                            $(elements.playground.menuoverlay).style.display = 'none';    
                        }, 200);
                    });

                    $(elements.playground.hint).addEventListener('click', ()=>{
                        this.toggleScreens(values.screens.levels, 'right');
                        $(elements.playground.menuoverlay).style.display = 'none';
                    });

                    $(elements.playground.menuoverlay).addEventListener('click', (e)=>{
                        if(e.target.classList.contains('menuoverlay')){
                            this.toggleMenuBox('hideMenu');
                            setTimeout(()=>{
                                $(elements.playground.menuoverlay).style.display = 'none';
                            }, 200);
                        }
                    });

                }    
            
            default:
                break;
        }
    }

    toggleMenuBox(modeclass){
        $(elements.playground.menubox).classList.add(modeclass);
        setTimeout(()=>{
            $(elements.playground.menubox).classList.remove(modeclass);
        }, 620);
    }
      
    toggleScreens(screen, direction){
        if(!this.isInTransition){
            this.isInTransition =  true;
            const activeScreen = $('.wrapper .openscreen');
            const screenToOpen = $('.'+screen);
            const interval = 600;

            if(direction == 'left'){
                activeScreen.classList.add('screen-moveToLeft');
                screenToOpen.classList.add('openscreen');
                screenToOpen.classList.add('screen-moveFromRight');
                setTimeout(()=>{
                    activeScreen.classList.remove('openscreen');
                    activeScreen.classList.remove('screen-moveToLeft');
                    screenToOpen.classList.remove('screen-moveFromRight');
                    this.isInTransition =  false;
                }, interval);
            }else if(direction == 'right'){
                activeScreen.classList.add('screen-moveToRight');
                screenToOpen.classList.add('openscreen');
                screenToOpen.classList.add('screen-moveFromLeft');
                setTimeout(()=>{
                    activeScreen.classList.remove('openscreen');
                    activeScreen.classList.remove('screen-moveToRight');
                    screenToOpen.classList.remove('screen-moveFromLeft');
                    this.isInTransition =  false;
                }, interval);
            }

            switch (screen) {
                case values.screens.home:
                    if(!this.ishomeScreenInt){
                        this.initScreens(screen);
                    }
                    
                    break;

                case values.screens.levels:
                    if(!this.islevelScreenInt){
                        this.initScreens(screen);
                    }
                    
                    this.updateLevelScreen();
                    break;
            
                case values.screens.playground:
                    if(!this.playgroundScreenInt){
                        this.initScreens(screen);
                    }

                default:
                    break;
            }

            this.clearTimer();
        }else{
            console.log('wait... transition..');
        }
    }

    createPlayground(level, isTutorial = false){
        const target = $(elements.playground.target);
        const time = $(elements.playground.time);
        const score = $(elements.playground.score);
        const entered = $(elements.playground.entered);
        const numberpad = $(elements.playground.numberpad);

        //reset
        target.textContent = 0;
        time.textContent = 0;
        score.textContent = 0;
        entered.innerHTML = "";
        numberpad.innerHTML = "";

        this.totalCalculation = 0;
        this.totalClicks = 0;
        this.totalClicked = 0;
        this.target = 0;
        this.clearTimer();
        this.currentLevel = null;
        numberpad.className = "numberpad";
        this.leveltime = 0;
        //reset game end

        this.currentLevel = level;
        this.currentLevelId = level.id; 
        this.totalClicks = level.clicks;
        this.target = level.target;
        this.leveltime = level.time;

        target.textContent = level.target;
        time.textContent = level.time;
        score.textContent = 0;

        //create enter box
        for (let i = 0; i < level.clicks; i++) {
            const box = document.createElement('span');
            box.innerHTML = "0";
            entered.appendChild(box);
        }

        //create number pad
        const totalNumbers = level.numbers.length;
        let gridClass = "three";
        if(totalNumbers%3 == 0)
        {
            gridClass = "three"   
        }else if(totalNumbers%4 == 0){
            gridClass = "four"   
        }
        numberpad.classList.add(gridClass);
        // const numberList = _.shuffle(level.numbers);
        const numberList = shuffle(level.numbers);
        numberList.forEach((number, index) => {
            const item = document.createElement('button');
            let entertext = "";
            if(number == 's2'){
                item.innerHTML = 'x<sup>2</sup>';
                entertext = 'x<sup>2</sup>';
            }else if(number == 's3'){
                item.innerHTML = 'x<sup>3</sup>';
                entertext = 'x<sup>3</sup>';
            }else{
                item.textContent = number;
                entertext = number;
            }
            item.className = this.getNumberPadClass(number);
            item.classList.add('numberpadShuffle');
            // item.classList.add('zoomIn');
            const randomShuffleClass = this.getButtonInAnimClass();
            item.classList.add(randomShuffleClass);
            setTimeout(()=>{
                item.classList.remove(randomShuffleClass);
                item.classList.remove('numberpadShuffle');
            }, 1000);
            item.addEventListener('click', () => {
                this.playSound('click');
                if(this.totalClicks != this.totalClicked){
                    this.calculate(number);
                    item.classList.add(this.getButtonAnimClass());
                    score.textContent = this.totalCalculation;
                    entered.querySelectorAll('span')[this.totalClicked-1].innerHTML = entertext;
                }
            });
            numberpad.appendChild(item);
        });
        
        if(!isTutorial){
            let i=level.time;
            this.timer = setInterval(()=>{
                time.textContent = i; 
                i = i - 1; 
                if(i == (parseInt(this.leveltime)/2)){
                    this.playSound('timer');
                }
                if(i < 0){
                    this.checkWinLose();
                    this.clearTimer();
                }
            }, 1000);
        }else{
            //how to play
            if(!this.helpinit){
                const helplabel = ['Here is the Target, Timer & Current score.', 'These are the no. of steps you have.', 'Use the numbers above to reach the target in specified steps or less.'];
                const popposition = ['100px', '155px', '260px'];
                this.helpinit = true;
                let extraOverlay = $('.extraoverlay');

                $('.nexthelp').addEventListener('click', ()=>{
                    this.playSound('click');
                    this.helpscreenno += 1;
                    if(this.helpscreenno == 4){
                        $('.howtooverlay').style.display = "none";
                        this.toggleScreens('levels','left');
                        this.helpscreenno = 1;
                        extraOverlay.style.display = 'none';
                        extraOverlay.style.height = "100px";
                        $('.howtooverlay').style.top = "100px";
                        $('.howtooverlay p').textContent = helplabel[0];
                        localStorage.setItem("tutorial", 'yes');
                    }else{
                        $('.howtooverlay p').textContent = helplabel[this.helpscreenno-1];
                        $('.howtooverlay').style.top = popposition[this.helpscreenno-1];
                        if(this.helpscreenno==2){
                            extraOverlay.style.display = 'block';
                        }else if(this.helpscreenno==3){
                            extraOverlay.style.height = '170px';
                        }
                    }
                });

                $('.backhelp').addEventListener('click', ()=>{
                    this.playSound('click');
                    this.helpscreenno -= 1;
                    if(this.helpscreenno == 0){
                        $('.howtooverlay').style.display = "none";
                        this.toggleScreens('home','right');
                        this.helpscreenno = 1;
                        extraOverlay.style.display = 'none';
                        extraOverlay.style.height = "100px";
                        $('.howtooverlay').style.top = "100px";
                        $('.howtooverlay p').textContent = helplabel[0];
                    }else{
                        $('.howtooverlay p').textContent = helplabel[this.helpscreenno-1];
                        $('.howtooverlay').style.top = popposition[this.helpscreenno-1];
                        if(this.helpscreenno==2){
                            extraOverlay.style.height = '100px';
                        }else{
                            extraOverlay.style.display = 'none';
                            // extraOverlay.style.height = '170px';
                        }
                    }
                    
                });
            }
            
            
            
        }
        

    }

    calculate(number){
        this.totalClicked += 1;

        const numberType = this.getNumberType(number);
        if(numberType == 'normal'){
            this.totalCalculation = eval(this.totalCalculation+number);
        }if(numberType == 'muliply'){
            this.totalCalculation = eval(this.totalCalculation+number.replace('x','*'));
        }else if(numberType == 'square'){
            this.totalCalculation = Math.pow(this.totalCalculation, 2);
        }else if(numberType == 'cube'){
            this.totalCalculation = Math.pow(this.totalCalculation, 3);
        }
        
        const dd = this.totalCalculation.toString();
        if(dd.indexOf('.') != -1){
            this.totalCalculation = this.totalCalculation.toFixed(2);
        }
         
        if(this.totalClicks == this.totalClicked || this.target == this.totalCalculation){
            this.checkWinLose();
        }
    }

    getNumberType(number){
        const muliplyRegx =  /^x/;  
        const squareRex =  /^s/; 
        let type = "normal";

        if(muliplyRegx.test(number)){
            type = 'muliply';
        }else if (squareRex.test(number)){
            number = number.replace('s', '');
            if(number == 2){
                type = 'square';
            }else if(number == 3){
                type = 'cube';
            }
        }

        return type;
    }

    checkWinLose(){
        let popupType = null; 
        if(this.target == this.totalCalculation){
            popupType = 'success';
        }else{
            popupType = 'fail';
        }
        this.showPopup(popupType);
    }

    clearTimer(){
        if(this.timer){
            clearInterval(this.timer);
            this.timer = null;    
            this.timerMusic.pause();
            this.timerMusic.currentTime = 0;
        }
    }



    showPopup(type){
        this.popup = $(elements.popup.wrap);
        const popdialog = $(elements.popup.dialog);
        const title = $(`${elements.popup.dialog} ${elements.popup.title}`); 
        const msg = $(`${elements.popup.dialog} ${elements.popup.msg}`); 

        this.clearTimer();

        switch (type) {
            case 'success':
                popdialog.classList.remove('lose');
                title.textContent = 'You win smarty!';
                msg.textContent = 'Can’t pass the next one, bet?';
                
                //Stars
                let totalStar = 0;
                const playedTime = parseInt(document.querySelector(elements.playground.time).textContent);
                if(playedTime >= parseInt(this.leveltime/2)){
                    totalStar = 5;
                }else if(playedTime > parseInt(this.leveltime/3)){
                    totalStar = 3;
                }else{
                    totalStar = 1;
                }
                this.storeLevels(this.currentLevelId, totalStar);

                const starArray = document.querySelectorAll(`${elements.popup.dialog} ${elements.popup.star} span`);
                for (let s = 0; s < totalStar; s++) {
                    starArray[s].classList.add('active');
                }

                setTimeout(()=>{
                    this.playSound('win');
                }, 200);

                const totaltimeTaken = parseInt(this.leveltime) - parseInt($(elements.playground.time).textContent);

                this.saveToLeaderboard(totalStar, totaltimeTaken);


                break;
            
            case 'fail':
                popdialog.classList.add('lose');
                title.textContent = 'Ah! You lose.';
                msg.textContent = 'Dare to try it again?';
                
                setTimeout(()=>{
                    this.playSound('lose');
                }, 600);
                break;    
        
            default:
                break;
        }

        setTimeout(()=>{
            popdialog.classList.add('showPopup'); 
            this.popup.style.display = 'block';
        }, 500);
        
        
        
    }

    getNumberPadClass(number){
        const muliplyRegx =  /^x/;  
        const squareRex =  /^s/; 
        const addRegx =  /^\+/;  
        const subRex =  /^-/; 
        const divRex =  /^\//; 

        if(muliplyRegx.test(number)){
            return 'multiply';
        }else if(squareRex.test(number)){
            return 'pow';
        }else if(addRegx.test(number)){
            return 'add';
        }else if(subRex.test(number)){
            return 'sub';
        }else if(divRex.test(number)){
            return 'divide';
        }
    }

    storeLevels(number, star){
        number = number.toString();
        const levels = localStorage.getItem("levels");
        let levelarr;
        if(!!levels){
            levelarr = JSON.parse(levels);
        }else{
            levelarr = [];
        }
        // const index = _.findIndex(levelarr, function(o) { return o.id == number; });
        const index = findIndex(levelarr, function(o) { return o.id == number; });
        const scoreobj = {
            id: number,
            star: star
        };
        if(index == -1){
            levelarr.push(scoreobj);
        }else{
            levelarr[index] = scoreobj;
        }
        localStorage.setItem("levels", JSON.stringify(levelarr));
    }

    updateLevelScreen(){
        let activelevel = 0;
        const levels = localStorage.getItem("levels");
        let levelarr = [];
        if(!!levels){
            levelarr = JSON.parse(levels);
        }
        const totalLevelElm = document.querySelectorAll('.box');
        totalLevelElm.forEach(element => {
            // const index = _.findIndex(levelarr, function(o) { return o.id == element.dataset.level; });
            const index = findIndex(levelarr, function(o) { return o.id == element.dataset.level; });
            if(index > -1){
                element.classList.remove('inactive');
                element.querySelector('button').classList.add('done');
                element.querySelector('.star').textContent = levelarr[index].star;
                element.querySelector('.star').style.visibility = 'visible';
                activelevel += 1; 
            }else{
                element.classList.add('inactive');
                element.querySelector('.star').style.visibility = 'hidden';
                element.querySelector('button').classList.remove('done');
            }
        });

        totalLevelElm[activelevel].classList.remove('inactive');
    }

    getButtonAnimClass(){
        // const btcls = ['bounceOutDown', 'zoomOutDown', 'zoomOut', 'fadeOutDownBig'];
        // const max = btcls.length - 1;
        // const min = 0;
        // const randomnum = Math.floor(Math.random()*(max-min+1)+min);
        return 'zoomOutDown';
    }

    getButtonInAnimClass(){
        const btcls = ['bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp'];
        const max = btcls.length - 1;
        const min = 0;
        const randomnum = Math.floor(Math.random()*(max-min+1)+min);
        return btcls[randomnum];
    }


    playSound(type){
        if(this.musicEnable){
            switch (type) {
                case 'click':
                    this.clickMusic.play();
                    break;
                
                case 'timer':
                    this.timerMusic.play();
                    this.timerMusic.addEventListener('ended', function() {
                        this.currentTime = 0;
                        this.play();
                    }, false);
                    break;
    
                case 'background':
                    this.backgroundMusic.play();
                    // this.backgroundMusic.volume = 0.2;
                    this.backgroundMusic.addEventListener('ended', function() {
                        this.currentTime = 0;
                        this.play();
                    }, false);
                    break;
                    
                case 'win':
                    this.winMusic.play();
                    break;    
                    
                case 'lose':
                    this.loseMusic.play();
                    break;

                default:
                    break;
            }
        }else{
            this.clickMusic.pause();
            this.backgroundMusic.pause();
            this.timerMusic.pause();
        }
        
    }

    toggleBackgroundMusic(stop){
        if(stop){
            this.backgroundMusic.pause();
            this.backgroundMusic.currentTime = 0;
        }else{
            if(this.musicEnable){
                this.backgroundMusic.play();
            }
        }
        
    }
    
    getUserInfo(){
        if(!!window.kapow){
            window.kapow.getUserInfo(
                (response)=>{
                    this.userinfo =  response;   
                }, 
                (e)=>{
                    console.log('error in geeting user info');
                }
            );    
        }else{
            console.log('kapow not found');
        }
    }

    saveToLeaderboard(stars, time){
        console.log(stars, time);
        if(!!window.kapow && !!this.userinfo){
            const playerid =  this.userinfo.player.id;
            window.kapow.invokeRPC('showlead',{
                'playerId': playerid,
                'scores': {
                    'time': stars,
                    'stars': time 
                }
            }, function(response) {
                console.log(response, 'leaderboard stored');
            },function(error) { 
                 console.log(error, 'leaderboard error');
            });
        }else{
            console.log('user or kapow not found');
        }
    }

}
