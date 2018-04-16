export const elements = {
    'screens':{
        'home': '.home',
        'help': '.help',
        'levels': '.levels',
        'playground': '.playground'
    },
    'buttons':{
        'play':'.play',
        'help':'.help',
        'leaderboard': '.leaderboard',
        'back': '.back',
        'music': '.music',
        'share': '.share'
    },
    'levellist': '.list',
    'playground':{
        'target': '.target span',
        'time': '.time',
        'score': '.score span',
        'entered': '.entered',
        'numberpad': '.numberpad',
        'menuoverlay': '.menuoverlay',
        "menu": ".menubutton",
        "menubox": ".menu",
        "reset": ".reset",
        "hint": ".hint"
    },
    'popup':{
        'wrap':'.overlay',
        'dialog':'.popup',
        'title': '.title',
        'star': '.stars',
        'msg': 'p',
        'next': '.next',
        'playagain':'.retry',
        'menu': '.menu'
    }
    
}

export const values = {
    'screens':{
        'home': 'home',
        'help': 'help',
        'levels': 'levels',
        'playground': 'playground'
    }
}

export const gamedata = {
    levels:[
        {
            id: 1,
            clicks: 3,
            target: 15,
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
        }, {
            id: 2,
            clicks: 2,
            target: 20,
            time: 30,
            hint: '',
            numbers:[
                '+2',
                'x10',
                '+6',
                '+3',
                '+1',
                '-10',
                '+10',
                's2',
                '+4'
            ]
        }, {
            id: 3,
            clicks: 3,
            target: 100,
            time: 30,
            hint: '',
            numbers:[
                'x9',
                '-1',
                '+1',
                '+9',
                's2',
                '/5',
                '+4',
                '+6',
                '+7'
            ]
        },{
            id: 4,
            clicks: 4,
            target: 26,
            time: 80,
            hint: '',
            numbers:[
                '+2',
                '+10',
                'x7',
                '-1',
                's3',
                'x9',
                '-6',
                '/3',
                '+9',
                '-4',
                '-5',
                's2',
                'x4',
                '+7',
                'x1',
                '+1'
            ]
        }, {
            id: 5,
            clicks: 5,
            target: 399,
            time: 120,
            hint: '',
            numbers:[
                '+10',
                '+7',
                '-9',
                'x5',
                'x7',
                'x8',
                'x10',
                '-10',
                '/2',
                '+6',
                '+9',
                '-2',
                'x4',
                's2',
                's3',
                '+8'
            ]
        }, {
            id: 6,
            clicks: 6,
            target: 499,
            time: 160,
            hint: '',
            numbers:[
                'x5',
                '-5',
                '-12',
                '+2',
                '-2',
                '+10',
                '+7',
                'x4',
                '+3',
                '-6',
                '+6',
                '+8',
                's2',
                '-7',
                'x10',
                '+5'
            ]
        }, {
            id: 7,
            clicks: 5,
            target: 576,
            time: 180,
            hint: '',
            numbers:[
                '+2',
                '/2',
                '+3',
                'x4',
                '+1',
                '+5',
                '-4',
                '-1',
                'x7',
                '-3',
                's2',
                's3',
                'x1',
                '-8',
                '-2',
                '/3'
            ]
        }, {
            id: 8,
            clicks: 6,
            target: 2999,
            time: 200,
            hint: '',
            numbers:[
                '+6',
                '+5',
                '+10',
                '+7',
                's2',
                '/2',
                'x9',
                's3',
                '-4',
                'x5',
                's2',
                '-8',
                '-6',
                '/3',
                'x4',
                '/9'
            ]
        }, {
            id: 9,
            clicks: 4,
            target: 150,
            time: 200,
            hint: '',
            numbers:[
                '+7',
                '+4',
                '+1',
                'x2',
                '+6',
                'x10',
                'x3',
                '/2',
                's2'
            ]
        }
    ]
}