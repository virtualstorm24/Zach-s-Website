
let header = document.querySelector('#intro');
let aim = [
    { t: "{ }", ms: 500 },
    { t: "{_}", ms: 500 },
    { t: "{ }", ms: 500 },
    { t: "{_}", ms: 300 },
    { t: "{Z_}", ms: 300 },
    { t: "{ZA_}", ms: 300 },
    { t: "{ZAC_}", ms: 300 },
    { t: "{ZACH_}", ms: 300 },
    { t: "{ZACH_}", ms: 400 },
    { t: "{ZACH_B_}", ms: 300 },
    { t: "{ZACH_BU_}", ms: 300 },
    { t: "{ZACH_BUS_}", ms: 300 },
    { t: "{ZACH_BUSK_}", ms: 300 },
    { t: "{ZACH_BUSKE_}", ms: 300 },
    { t: "{ZACH_BUSKEY_}", ms: 300 },
    { t: "{ZACH_BUSKEY}", ms: 400 },
    { t: "{ZACH_BUSKEY_}", ms: 500 },
    { t: "{ZACH_BUSKEY}", ms: 600 }
];

let i = 0;
let stepDenominator = window.localStorage.stepDenominator ?? 1;

const update = () => {
    const step = aim[i];
    header.innerText = step.t;
    i++;

    if (i < aim.length) {
        setTimeout(update, step.ms / stepDenominator);
    } else {
        header.classList.add('top');
        setTimeout(() => {
            document.getElementById('main').style.opacity = 1;
            initGlobe();
        }, 500);
        window.localStorage.stepDenominator = 2;
    }
};

update();

/*

let stepDenominator = 1;
if (window.localStorage.stepDenominator)
    stepDenominator = window.localStorage.stepDenominator
let i = 0;
let update = () => {
    let step = aim[i];
    header.innerText = step.t;
    i++;


    if (i < aim.length)
    setTimeout(update, step.ms / stepDenominator);
else {
    header.classList.add('top');
    setTimeout(() => {
        document.getElementById('main').style.opacity = 1;
        initGlobe();
    }, 500);
    window.localStorage.stepDenominator = 2;
}
}
update();

/*
else {
    header.classList.add('top');
    setTimeout(() => {
        document.getElementById('main').style.opacity = 1;
        initGlobe();
    }, 500);
    window.localStorage.stepDenominator = 2;
}
*/