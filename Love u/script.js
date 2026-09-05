const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
const nameContainer = document.getElementById("nameContainer");

let width = 0;
let height = 0;
let words = [];

const WORD_COUNT = 600;
const FORMATION_TIME = 20000;

const colors = [
    "#5b3a8e",
    "#6843a5",
    "#754bc0",
    "#8055d6",
    "#4d5fa8",
    "#526dcc",
    "#6d61b8"
];

let startTime = performance.now();

let hackerMode = false;
let hackerStart = 0;

let asciiMode = false;
let asciiStart = 0;

let hackerLines = [];


// ==========================================
// TAMAÑO
// ==========================================

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    createHeart();
}

window.addEventListener("resize", resizeCanvas);


// ==========================================
// ECUACIÓN DEL CORAZÓN
// ==========================================

function heartEquation(t) {

    const x = 16 * Math.pow(Math.sin(t), 3);

    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);

    return {
        x: x,
        y: -y
    };
}


// ==========================================
// CREAR CORAZÓN
// ==========================================

function createHeart() {

    words = [];

    const scale = Math.min(width, height) / 40;

    for (let i = 0; i < WORD_COUNT; i++) {

        const progress = i / WORD_COUNT;

        const t = progress * Math.PI * 2;

        const heart = heartEquation(t);

        const inside = 0.72 + Math.random() * 0.28;

        const targetX =
            width / 2 +
            heart.x * scale * inside;

        const targetY =
            height / 2 +
            heart.y * scale * inside;

        words.push({

            text: i % 3 === 0
                ? "Love You"
                : "Love you",

            x: width / 2,
            y: height / 2,

            targetX: targetX,
            targetY: targetY,

            progress: 0,

            delay: progress * FORMATION_TIME,

            size: 8 + Math.random() * 5,

            rotation:
                (Math.random() - 0.5) * 0.20,

            color:
                colors[
                    Math.floor(
                        Math.random() * colors.length
                    )
                ],

            alpha:
                0.55 + Math.random() * 0.35,

            phase:
                Math.random() * Math.PI * 2
        });
    }
}


// ==========================================
// CÓDIGO HACKER
// ==========================================

const hackerCharacters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&<>[]{}";


function randomCode(length) {

    let result = "";

    for (let i = 0; i < length; i++) {

        result +=
            hackerCharacters[
                Math.floor(
                    Math.random() *
                    hackerCharacters.length
                )
            ];
    }

    return result;
}


function createHackerLines() {

    hackerLines = [];

    const count = Math.ceil(height / 22);

    for (let i = 0; i < count; i++) {

        hackerLines.push({

            text: randomCode(
                25 + Math.floor(Math.random() * 50)
            ),

            x: Math.random() * width,

            y: i * 22,

            opacity:
                0.06 +
                Math.random() * 0.15
        });
    }
}


// ==========================================
// PANTALLA HACKER
// ==========================================

function drawHackerScreen(time) {

    ctx.fillStyle = "#000000";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );

    ctx.font =
        '12px "Courier New", monospace';

    ctx.textBaseline = "top";

    hackerLines.forEach((line, index) => {

        if (Math.random() < 0.04) {

            line.text = randomCode(
                25 + Math.floor(Math.random() * 50)
            );
        }

        ctx.globalAlpha = line.opacity;

        ctx.fillStyle =
            index % 2 === 0
                ? "#754bc0"
                : "#526dcc";

        ctx.fillText(
            line.text,
            line.x,
            line.y
        );
    });

    ctx.globalAlpha = 1;


    // PANEL

    const panelWidth =
        Math.min(width * 0.82, 850);

    const panelHeight = 310;

    const panelX =
        width / 2 - panelWidth / 2;

    const panelY =
        height / 2 - panelHeight / 2;


    ctx.strokeStyle =
        "rgba(125, 80, 210, 0.65)";

    ctx.lineWidth = 1;

    ctx.strokeRect(
        panelX,
        panelY,
        panelWidth,
        panelHeight
    );


    ctx.font =
        'bold 14px "Courier New", monospace';

    ctx.fillStyle = "#9a70e8";

    ctx.fillText(
        "SYSTEM // MEMORY TRANSFER",
        panelX + 25,
        panelY + 25
    );


    ctx.font =
        '12px "Courier New", monospace';

    ctx.fillStyle =
        "rgba(190, 190, 190, 0.65)";

    ctx.fillText(
        "connection established...",
        panelX + 25,
        panelY + 55
    );

    ctx.fillText(
        "reading encrypted data...",
        panelX + 25,
        panelY + 78
    );


    const elapsed =
        time - hackerStart;

    const duration = 7500;

    const progress =
        Math.min(elapsed / duration, 1);

    const percentage =
        Math.floor(progress * 100);


    ctx.font =
        'bold 32px "Courier New", monospace';

    ctx.fillStyle = "#a875ff";

    ctx.fillText(
        percentage + "%",
        panelX + 25,
        panelY + 125
    );


    // BARRA

    const barWidth = panelWidth - 50;
    const barHeight = 8;

    ctx.strokeStyle =
        "rgba(130, 90, 210, 0.5)";

    ctx.strokeRect(
        panelX + 25,
        panelY + 175,
        barWidth,
        barHeight
    );

    ctx.fillStyle = "#754bc0";

    ctx.fillRect(
        panelX + 25,
        panelY + 175,
        barWidth * progress,
        barHeight
    );


    // DATOS FALSOS

    ctx.font =
        '11px "Courier New", monospace';

    ctx.fillStyle =
        "rgba(160, 130, 210, 0.55)";

    ctx.fillText(
        "DATA: 0x" + randomCode(12),
        panelX + 25,
        panelY + 215
    );

    ctx.fillText(
        "HASH: " + randomCode(20),
        panelX + 25,
        panelY + 235
    );

    ctx.fillText(
        "KEY: " + randomCode(16),
        panelX + 25,
        panelY + 255
    );


    if (progress >= 1) {

        ctx.font =
            'bold 13px "Courier New", monospace';

        ctx.fillStyle = "#b58aff";

        ctx.fillText(
            "TRANSFER COMPLETE",
            panelX + 25,
            panelY + 285
        );
    }

    return progress;
}


// ==========================================
// ASCII FINAL
// ==========================================

const asciiArt = [
    "____*##########*",
    "__*##############",
    "__################",
    "_##################_________*####*",
    "__##################_____*##########",
    "__##################___*#############",
    "___#################*_###############*",
    "____#################################*",
    "______###############################",
    "_______#############################",
    "________=##########################",
    "__________########################",
    "___________*#####################",
    "____________*##################",
    "_____________*###############",
    "_______________#############",
    "________________##########",
    "________________=#######*",
    "_________________######",
    "__________________####",
    "__________________###",
    "___________________#"
];


function drawAscii(time) {

    // NEGRO TOTAL

    ctx.fillStyle = "#000000";

    ctx.fillRect(
        0,
        0,
        width,
        height
    );


    // FUENTE

    ctx.font =
        'bold 15px "Courier New", monospace';

    ctx.textBaseline = "top";
    ctx.textAlign = "left";


    const lineHeight = 18;
    const charWidth = 9;

    const maxLength =
        Math.max(
            ...asciiArt.map(
                line => line.length
            )
        );

    const artWidth =
        maxLength * charWidth;

    const artHeight =
        asciiArt.length * lineHeight;


    const startX =
        (width - artWidth) / 2;

    const startY =
        (height - artHeight) / 2;


    const elapsed =
        time - asciiStart;


    const lineDelay = 180;

    const visibleLines =
        Math.min(
            Math.floor(
                elapsed / lineDelay
            ) + 1,
            asciiArt.length
        );


    // VERDE

    ctx.fillStyle = "#00ff66";

    ctx.shadowColor = "#00ff66";

    ctx.shadowBlur = 6;


    for (
        let i = 0;
        i < visibleLines;
        i++
    ) {

        ctx.fillText(
            asciiArt[i],
            startX,
            startY + i * lineHeight
        );
    }


    // CURSOR

    if (
        visibleLines >=
        asciiArt.length
    ) {

        const blink =
            Math.floor(time / 500) % 2;

        if (blink === 0) {

            ctx.fillText(
                "_",
                startX,
                startY +
                asciiArt.length *
                lineHeight +
                5
            );
        }
    }

    ctx.shadowBlur = 0;
}


// ==========================================
// ANIMACIÓN
// ==========================================

function animate(time) {

    // ======================================
    // CORAZÓN
    // ======================================

    if (
        !hackerMode &&
        !asciiMode
    ) {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        let completed = 0;


        words.forEach(word => {

            if (
                time - startTime <
                word.delay
            ) {
                return;
            }


            const localTime =
                time -
                startTime -
                word.delay;


            word.progress =
                Math.min(
                    localTime / 1500,
                    1
                );


            const ease =
                1 -
                Math.pow(
                    1 - word.progress,
                    3
                );


            word.x +=
                (
                    word.targetX -
                    word.x
                ) *
                ease *
                0.045;


            word.y +=
                (
                    word.targetY -
                    word.y
                ) *
                ease *
                0.045;


            if (
                word.progress >= 1
            ) {
                completed++;
            }


            const floatingX =
                Math.sin(
                    time * 0.0008 +
                    word.phase
                ) * 0.35;


            const floatingY =
                Math.cos(
                    time * 0.001 +
                    word.phase
                ) * 0.35;


            ctx.save();

            ctx.translate(
                word.x + floatingX,
                word.y + floatingY
            );

            ctx.rotate(
                word.rotation
            );

            ctx.font =
                `${word.size}px Georgia, "Times New Roman", serif`;

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            ctx.globalAlpha =
                word.alpha *
                Math.min(
                    word.progress * 2,
                    1
                );

            ctx.fillStyle =
                word.color;

            ctx.shadowBlur = 5;

            ctx.shadowColor =
                word.color;

            ctx.fillText(
                word.text,
                0,
                0
            );

            ctx.restore();
        });


        ctx.globalAlpha = 1;


        // JESSICA

        if (
            time - startTime >
            FORMATION_TIME + 1800
        ) {

            nameContainer.classList.add(
                "show"
            );
        }


        // MODO HACKER

        if (
            time - startTime >
            FORMATION_TIME + 6500
        ) {

            hackerMode = true;

            hackerStart = time;

            nameContainer.classList.remove(
                "show"
            );

            createHackerLines();
        }
    }


    // ======================================
    // HACKER
    // ======================================

    else if (
        hackerMode &&
        !asciiMode
    ) {

        const progress =
            drawHackerScreen(time);


        if (
            progress >= 1 &&
            time - hackerStart >= 9500
        ) {

            hackerMode = false;

            asciiMode = true;

            asciiStart = time;

            ctx.clearRect(
                0,
                0,
                width,
                height
            );
        }
    }


    // ======================================
    // ASCII
    // ======================================

    else if (asciiMode) {

        drawAscii(time);
    }


    requestAnimationFrame(
        animate
    );
}


// ==========================================
// INICIO
// ==========================================

resizeCanvas();

requestAnimationFrame(
    animate
);