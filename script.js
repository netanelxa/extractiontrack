import { timeFormat, graphDateItem } from "./utils.js";
import { morningCanvas } from "./morning-canvas.js";
import { evningCanvas } from "./evning-canvas.js";
import { nightCanvas } from "./night-canvas.js";
import { saveData, getData } from "./local-store.js";


const addBtnBlue = document.querySelector('#blue');
const addBtnRed = document.querySelector('#red');
const totalPipElement = document.querySelector('#total_pippete');
const totalQPCRElement = document.querySelector('#total_qpcr');
const clrBtn = document.querySelector('#clrbtn');
const blueLineInput = document.querySelector('#hours-bule-line')
const redLineInput = document.querySelector('#hours-red-line')

const targetnumber = 65;
let total_pip = 0;
let total_qpcr = 0;


const routes = {
    "/": morningCanvas,
    "/evning": evningCanvas,
    "/night": nightCanvas
}




function countTotal(total, flag) {
    if (flag == 1) {
        totalPipElement.innerHTML = `Total Pippeted Plates: ${total}`
    } else if (flag == 2) {
        totalQPCRElement.innerHTML = `Total In QPCR Machine: ${total}`
    } else if (flag == 3) {
        totalPipElement.innerHTML = `Total Pippeted Plates: `
        totalQPCRElement.innerHTML = `Total In QPCR Machine: `

    }
}




function displayCanvas() {
    let chart
    let url = document.location.hash.toLowerCase().split('#')

    let { Red, Blue } = routes[url[1]]().storeKeys
    chart = routes[url[1]]().chart

    chart.render()

    addBtnBlue.addEventListener('click', () => {
        const [hour, minutes] = timeFormat()

        total_pip += Number(blueLineInput.value)
        countTotal(total_pip, 1)
        if (total_pip == targetnumber - 5) {
            var audio = new Audio('advavoice.aac');
            audio.play();
        }
        if (total_pip >= targetnumber) {
            confetti.start(5000);
        }

        chart.data[0].dataPoints.push({
            x: graphDateItem(hour, minutes),
            y: total_pip
        })

        console.log(chart.data[0].dataPoints)

        saveData(Blue, chart.data[0].dataPoints)

        chart.render()
    })


    addBtnRed.addEventListener('click', () => {
        const [hour, minutes] = timeFormat()

        total_qpcr += Number(redLineInput.value)
        countTotal(total_qpcr, 2)

        chart.data[1].dataPoints.push({
            x: graphDateItem(hour, minutes),
            y: total_qpcr
        })



        saveData(Red, chart.data[1].dataPoints)

        chart.render()
    })


    document.querySelector('#hours-bule-line').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const [hour, minutes] = timeFormat()

            total_pip += Number(blueLineInput.value)
            countTotal(total_pip, 1)
            if (total_pip == targetnumber - 5) {
                var audio = new Audio('advavoice.aac');
                audio.play();
            }
            if (total_pip >= targetnumber) {
                confetti.start(5000);
            }

            chart.data[0].dataPoints.push({
                x: graphDateItem(hour, minutes),
                y: total_pip
            })

            saveData(Blue, chart.data[0].dataPoints)

            chart.render()
        }
    })
    document.querySelector('#hours-red-line').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const [hour, minutes] = timeFormat()

            total_qpcr += Number(redLineInput.value)
            countTotal(total_qpcr, 2)

            chart.data[1].dataPoints.push({
                x: graphDateItem(hour, minutes),
                y: total_qpcr
            })

            saveData(Red, chart.data[1].dataPoints)

            chart.render()
        }
    })


    clrBtn.addEventListener('click', () => {
        if (total_pip > 0 || total_qpcr > 0) {
            while (chart.data[0].dataPoints.length > 1) {
                chart.data[0].dataPoints.pop()
            }
            while (chart.data[1].dataPoints.length > 1) {
                chart.data[1].dataPoints.pop()
            }
            // removeData(key)
            total_pip = 0;
            total_qpcr = 0;
            countTotal(0, 3)
            chart.render()
        }
    })

}

window.onload = function () {
    displayCanvas()

}

window.addEventListener('hashchange', () => {
    location.reload()
    displayCanvas()
})