const navDiv = document.querySelector('#nav');
const addBtnBlue = document.querySelector('#blue');
const addBtnRed = document.querySelector('#red');
const totalPipElement = document.querySelector('#total_pippete');
const totalQPCRElement = document.querySelector('#total_qpcr');
const clrBtn = document.querySelector('#clrbtn');
let total_pip = 0;
let total_qpcr = 0;
var targetflag = 0;



navDiv.innerHTML = Tamplates.navbar([{
        path: 'index.html',
        content: 'Morning Shift'
    },
    {
        path: './evening/index_evening.html',
        content: 'Evening Shift'
    },
    {
        path: './night/index_night.html',
        content: 'Night Shift'
    }
])


function timeFormat() {
    //   let day =new Date().getDate()
    let currentTime = new Date().toTimeString().split(':')
    let hour = currentTime[0].length === 1 ? '0' + currentTime[0] : currentTime[0]
    let minutes = currentTime[1].length === 1 ? '0' + currentTime[1] : currentTime[1]
    return [Number(hour), Number(minutes)]
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

function getTarget() {
    var target = prompt("Insert the target number of plates");
    if (target == null) {
        target = 65;
    }
    return target;
}

window.onload = function () {
    var targetnumber;
    if (Number(new Date().toTimeString().split(':')[0]) >= 15 && Number(new Date().toTimeString().split(':')[0]) < 23) {
        window.location.replace("./evening/index_evening.html");
    } else if ((Number(new Date().toTimeString().split(':')[0]) >= 23 || (Number(new Date().toTimeString().split(':')[0]) < 7 ))) {
        window.location.replace("./night/index_night.html");
    } else {
        targetnumber= getTarget();
    }

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Motivation "
        },
        axisX: {
            valueFormatString: "HH:mm",
            interval: 30,
            intervalType: "minute",
            viewportMinimum: new Date(2020, 11, 12, 06, 50, 00),
            viewportMaximum: new Date(2020, 11, 12, 15, 10, 00)
        },
        axisY: {
            title: "Plates Number",
            minimum: 0,
            maximum: 100
        },
        legend: {
            cursor: "pointer",
            fontSize: 10,
            itemclick: toggleDataSeries
        },
        toolTip: {
            shared: true
        },
        data: [{

                name: "Time of Pipetting",
                type: "spline",
                // yValueFormatString: " ",
                showInLegend: true,
                xValueFormatString: "HH:mm",
                dataPoints: [{
                        x: new Date(2020, 11, 12, 07, 00, 00),
                        y: 0
                    }

                ]
            },
            {
                name: "QPCR",
                type: "spline",
                xValueFormatString: "HH:mm",
                showInLegend: true,
                dataPoints: [{
                        x: new Date(2020, 11, 12, 07, 00, 00),
                        y: 0
                    }

                ]
            },
            {
                name: "maxmium",
                type: "spline",
                color: "white",
                xValueFormatString: "HH:mm",
                dataPoints: [{
                        x: new Date(2020, 11, 12, 15, 07, 00),
                        y: 0
                    }

                ]
            }
        ]
    });

    chart.render();

    function toggleDataSeries(e) {
        if (typeof (e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        } else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }


    function graphDateItem(hour, minutes) {
        return new Date(2020, 11, 12, hour, minutes, 0)
    }


    const blueLineInput = document.querySelector('#hours-bule-line')
    const redLineInput = document.querySelector('#hours-red-line')
    // new Date(  'year','mount','day','hours','minutes','seconds')


    addBtnBlue.addEventListener('click', () => {
        const [hour, minutes] = timeFormat()

        total_pip += Number(blueLineInput.value)
        countTotal(total_pip, 1)
        if (total_pip == targetnumber - 5) {
            var audio = new Audio('advavoice.aac');
            audio.play();
        }
        if (total_pip >= targetnumber && targetflag==0) {
            confetti.start(29000);
            var audio = new Audio('champ.mp3');
            audio.play();
            targetflag=1
        }

        chart.data[0].dataPoints.push({
            x: graphDateItem(hour, minutes),
            y: total_pip
        })

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
            if (total_pip >= targetnumber && targetflag==0) {
                confetti.start(29000);
                var audio = new Audio('champ.mp3');
                audio.play();
                targetflag=1
            }

            chart.data[0].dataPoints.push({
                x: graphDateItem(hour, minutes),
                y: total_pip
            })

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

            total_pip = 0;
            total_qpcr = 0;
            countTotal(0, 3)
            chart.render()
        }
    })
}