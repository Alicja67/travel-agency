export const formatTime = (value) => {
  if( value && !isNaN(value) && value >= 0 ){
    const seconds = Math.floor(value % 60);
    const mins = Math.floor(value / 60 % 60);
    const hours = Math.floor(value / 3600);
    const result = [hours, mins, seconds].map(element => `${element + 100}`.substring(1)).join(':');
    return result;
  } else {
    return null;
  }
};
