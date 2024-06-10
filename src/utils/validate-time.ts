function validateTime(value){
    const regex = /^(Sun|Mon|Tue|Wed|Thu|Fri|Sat) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) \d{2} \d{4} \d{2}:\d{2}:\d{2} GMT[+-]\d{4} \([A-Za-z ]+\)$/;
    const date = new Date(value);
    return !isNaN(date.getTime()) && !isNaN(date.getDay()) && !isNaN(date.getFullYear()) && !isNaN(date.getHours()) && !isNaN(date.getMinutes()) && regex.test(value);
}

export const validate = {
    validator: (value)=> validateTime(value),
    message: props => `${props.value} is not a valid date!`
}