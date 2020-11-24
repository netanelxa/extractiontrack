import { getData } from "./local-store.js";


export function nightCanvas() {
    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title: {
            text: "Motivation "
        },
        axisX: {
            valueFormatString: "HH:mm",
            interval: 30,
            intervalType: "minute",
            viewportMinimum: new Date(2020, 11, 12, 22, 50, parseInt('00')),
            viewportMaximum: new Date(2020, 11, 13, parseInt('07'), 10, parseInt('00'))
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
                x: new Date(2020, 11, 12, 23, parseInt('00'), parseInt('00')),
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
                x: new Date(2020, 11, 12, 23, parseInt('00'), parseInt('00')),
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
                x: new Date(2020, 11, 13, parseInt('07'), parseInt('07'), parseInt('00')),
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

    return {
        chart: chart,
        storeKeys: {
            Red: 'night_red',
            Blue: 'night_blue',
        }
    }

}