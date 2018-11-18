export const formatTime = date => date.format('LTS');
export const hasTimePassed = (currentTime, timeToCompare) => currentTime.isSameOrAfter(timeToCompare);
