function formatTime(time) {
    return getdateTime(time) + ' ' + printTime(time.getSeconds());
}

function printTime(secs) {
    var sep = ':';
    var hours, minutes, seconds, time;
    var now = new Date();
    hours = now.getHours();
    if (hours < 12) {
        meridiem = 'am';
    } else {
        meridiem = 'pm'
    }
    hours = hours % 12;
    if (hours == 0) {
        hours = 12;
    }

    time = hours;
    minutes = now.getMinutes();
    if (minutes < 10) {
        minutes = '0' + minutes;
    }
    time += sep + minutes;

    if (secs) {
        seconds = now.getSeconds();
        if (seconds < 10) {
            seconds = '0' + seconds;
        }
        time += sep + seconds;
    }
    return time + ' ' + meridiem;
}

function getdateTime(date) {
    var dataVal = (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + '  -  ';
    return dataVal;
} 

module.exports = formatTime;