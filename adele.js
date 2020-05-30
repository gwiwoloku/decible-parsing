// // import * as soundLibrary from './p5.sound';
// let song, analyzer;
// var rmsHistory=[];
//
// var asc=0;
// var ord=0;
//
// var p5Sound = new p5Sound();
//
// // function preload() {
// //     song = loadSound('luna.mpeg');
// // }
// //
// // function setup() {
// //     // createCanvas(610, 400);
// //     song.play();
// //
// //     // create a new Amplitude analyzer
// //     analyzer = new p5.Amplitude();
// //
// //     // Patch the input to an volume analyzer
// //     analyzer.setInput(song);
// //     //var asc=50;
// //     //var ord=50;
// //
// // }
// //
// // preload();
// // setup();
//
// function setup() {
//
// }
//
// function draw() {
//
// }
//
//



/**
 * @name Measuring Amplitude
 * @description <p>Analyze the amplitude of sound with
 * p5.Amplitude.</p>
 *
 *  <p><b>Amplitude</b> is the magnitude of vibration. Sound is vibration,
 *  so its amplitude is is closely related to volume / loudness.</p>
 *
 * <p>The <code>getLevel()</code> method takes an array
 * of amplitude values collected over a small period of time (1024 samples).
 * Then it returns the <b>Root Mean Square (RMS)</b> of these values.</p>
 *
 * <p>The original amplitude values for digital audio are between -1.0 and 1.0.
 * But the RMS will always be positive, because it is squared.
 * And, rather than use instantanous amplitude readings that are sampled at a rate
 * of 44,100 times per second, the RMS is an average over time (1024 samples, in this case),
 * which better represents how we hear amplitude.
 * </p>
 * <p><em><span class="small"> To run this example locally, you will need the
 * <a href="http://p5js.org/reference/#/libraries/p5.sound">p5.sound library</a>
 * a sound file, and a running <a href="https://github.com/processing/p5.js/wiki/Local-server">local server</a>.</span></em></p>
 */
let song, analyzer;
var rmsHistory=[];

var asc=0;
var ord=0;

function preload() {
    song = loadSound('luna_1min.mp3');
}

function setup() {
    createCanvas(610, 400);
    // song.start();
    // song.stop(60);
    // create a new Amplitude analyzer
    analyzer = new p5.Amplitude();

    // Patch the input to an volume analyzer
    analyzer.setInput(song);
    //var asc=50;
    //var ord=50;

}

function draw() {
    //background(255);

    // Get the average (root mean square) amplitude
    var rms = analyzer.getLevel()*1000;
    console.log("rms=",rms);
    // console.log("rmsHistory=",rmsHistory);

    var l=0;
    var s=0;


    // console.log("rmsHistory length=",rmsHistory.length);

    if(rms > 0 ) {
        rmsHistory.push(rms);
        if(rms > 0.12){
            console.log('Pianta Attiva');
            s++;
        } else {
            console.log('Pianta Non Attiva');
            l++;
        }
    }

    console.log('current rmsArray', rmsHistory.length);


//   for(i=0;i<=100;i++)
//     {
//       console.log("i=",i);
//       console.log("rmsHistory[i]=",rmsHistory[i]);

//       //var rms = analyzer.getLevel()*1000;

//       if(rmsHistory[i]<0.12) l++;
//       else if(rmsHistory[i]>=0.12) s++;
//       console.log("l=",l);
//       console.log("s=",s);
//     }

    if(ord<height)
    {
        ord= ord+10;

        if(l>50)
        {

            console.log("disegno LUNA");
            ellipse(width / 2, (height / 2)+ord, 100, 100);
            polygon(10+asc, 10+ord, 10, 6);
            console.log("ord",ord);
            console.log("asc",asc);
            console.log("disegno un esagono");
            fill(200,250,0);
            stroke(0);
        }

        if(s>0)
        {
            console.log("disegno SOLE");
            ellipse((width / 5)+asc, height / 5, 200, 200);
            polygon(10+asc, 10+ord, 30, 6);
            fill(255,250,30);
            stroke(0);
        }
    }

    else
    {
        asc= asc+5;
        ord=0+(l/5)+s;
    }
    // Draw an ellipse with size based on volume
    //ellipse(width / 2, height / 2, 1 + rms * 500, 1 + rms * 500);
}


function polygon(x, y, radius, npoints) {
    let angle = (TWO_PI / npoints);
    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        vertex(sx, sy);
    }
    endShape(CLOSE);
}


