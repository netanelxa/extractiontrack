const navDiv = document.querySelector('#nav');
const addBtnBlue = document.querySelector('#blue');
const totalPipElement = document.querySelector('#total_pippete');
const clrBtn = document.querySelector('#clrbtn');
const stpBtn = document.querySelector('#stpbtn');

var targetnumber = prompt("Insert the target number of plates");
if (targetnumber == null) {
    targetnumber = 65;
}
var champaudio = new Audio('../' + 'champ.mp3');

let total_pip = 0;
let total_qpcr = 0;
var targetflag = 0;


navDiv.innerHTML = Tamplates.navbar([{
        path: '../index.html',
        content: 'Morning Shift'
    },
    {
        path: '../evening/index_evening.html',
        content: 'Evening Shift'
    },
    {
        path: '../night/index_night.html',
        content: 'Night Shift'
    }
])


function showSnackbar(number) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    if (number == 1) {
        x.innerHTML = number + " Plate Added"
    } else if (number >= 1) {
        x.innerHTML = number + " Plates Added"
    } else {
        x.innerHTML = Math.abs(number) + " Plates Removed"
    }
    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 2000);
}

function timeFormat() {
    // let day =new Date().getDate()
    let currentTime = new Date().toTimeString().split(':')
    let hour = currentTime[0].length === 1 ? '0' + currentTime[0] : currentTime[0]
    let minutes = currentTime[1].length === 1 ? '0' + currentTime[1] : currentTime[1]
    return [Number(hour), Number(minutes)]
}

function countTotal(total, flag) {
    if (flag == 1) {
        totalPipElement.innerHTML = total_pip;
    } else if (flag == 2) {
        totalPipElement.innerHTML = total_qpcr
    } else if (flag == 3) {
        totalPipElement.innerHTML = ''
    }
}

function checkOption() {
    if (document.getElementById("plateselect").value == "Add Pippeted Plates") {
        console.log("pip")
        document.getElementById("totalplates").innerHTML = "Total Pippeted Plates"
        document.querySelector('#total_pippete').innerHTML = total_pip
        document.querySelector('#total_pippete').style.color = "darkblue"

    } else {
        console.log("qpcr")
        document.getElementById("totalplates").innerHTML = "    Total QPCR Plates"
        document.querySelector('#total_pippete').innerHTML = total_qpcr
        document.querySelector('#total_pippete').style.color = "darkred"

    }
}

function getOption() {
    if (document.getElementById("plateselect").value == "Add Pippeted Plates") {
        return 1;
    } else return 2;
}

function errorSnackbar(number) {
    // Get the snackbar DIV
    var x = document.getElementById("snackbar");
    // Add the "show" class to DIV
    if (number == 1) {
        x.innerHTML = "Please add less than 50 plates"
    } else {
        x.innerHTML = "Max amount of plates is 100"

    }
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function () {
        x.className = x.className.replace("show", "");
    }, 2000);
}

window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        backgroundColor: "#F5F5F5	",
        title: {
            text: "Motivation "
        },
        axisX: {
            valueFormatString: "HH:mm",
            interval: 30,
            intervalType: "minute",
            viewportMinimum: new Date(2020, 11, 12, 14, 50, 00),
            viewportMaximum: new Date(2020, 11, 12, 23, 10, 00)
        },
        axisY: {
            title: "Plates Number",
            minimum: 0,
            maximum: 100,
            interval: 5
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
                        x: new Date(2020, 11, 12, 15, 00, 00),
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
                        x: new Date(2020, 11, 12, 15, 00, 00),
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
                        x: new Date(2020, 11, 12, 23, 00, 00),
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



    const lineInput = document.querySelector('#insertinput')

    addBtnBlue.addEventListener('click', () => {
        const [hour, minutes] = timeFormat()
        if (Number(lineInput.value) < 50) {
            if (getOption() == 1) {
                if (total_pip + Number(lineInput.value) < 101) {

                    total_pip += Number(lineInput.value)
                    countTotal(total_pip, 1)
                    if (total_pip == targetnumber - 5) {
                        var audio = new Audio('advavoice.aac');
                        audio.play();
                    }
                    if (total_pip >= targetnumber && targetflag == 0) {
                        confetti.start();
                        champaudio.play();
                        targetflag = 1
                    }

                    chart.data[0].dataPoints.push({
                        x: graphDateItem(hour, minutes),
                        y: total_pip
                    })
                    showSnackbar(Number(lineInput.value))
                    chart.render()
                } else {
                    errorSnackbar(2)
                }
            } else {
                total_qpcr += Number(lineInput.value)
                countTotal(total_qpcr, 2)

                chart.data[1].dataPoints.push({
                    x: graphDateItem(hour, minutes),
                    y: Number(total_qpcr)
                })
                showSnackbar(Number(lineInput.value))
                chart.render()
            }
        } else {
            errorSnackbar(1)
        }
    })



    document.querySelector('#insertinput').addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            const [hour, minutes] = timeFormat()
            if (Number(lineInput.value) < 50) {
                if (getOption() == 1) {
                    if (total_pip + Number(lineInput.value) < 101) {
                        total_pip += Number(lineInput.value)
                        countTotal(total_pip, 1)
                        if (total_pip == targetnumber - 5) {
                            var audio = new Audio('advavoice.aac');
                            audio.play();
                        }
                        if (total_pip >= targetnumber && targetflag == 0) {
                            confetti.start();
                            champaudio.play();
                            targetflag = 1
                        }

                        chart.data[0].dataPoints.push({
                            x: graphDateItem(hour, minutes),
                            y: total_pip
                        })
                        showSnackbar(Number(lineInput.value))
                        chart.render()
                    } else {
                        errorSnackbar(2)
                    }
                } else {
                    total_qpcr += Number(lineInput.value)
                    countTotal(total_qpcr, 2)

                    chart.data[1].dataPoints.push({
                        x: graphDateItem(hour, minutes),
                        y: total_qpcr
                    })
                    showSnackbar(Number(lineInput.value))
                    chart.render()
                }
            } else {
                errorSnackbar(1)
            }
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
            targetflag = 0;
            countTotal(0, 3)
            confetti.stop()
            chart.render()
        }
    })


    stpBtn.addEventListener('click', () => {
        if (confetti.isRunning()) {
            confetti.remove()
        }
        champaudio.pause();
    })

}