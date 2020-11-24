export function timeFormat() {
    let currentTime = new Date().toTimeString().split(':')
    let hour = currentTime[0].length === 1 ? '0' + currentTime[0] : currentTime[0]
    let minutes = currentTime[1].length === 1 ? '0' + currentTime[1] : currentTime[1]
    console.log(hour, minutes)
    return [parseInt(hour), parseInt(minutes)]
}

export function graphDateItem(hour, minutes) {
    return new Date(2020, 11, 12, hour, minutes, 0)
}
