import { format } from "date-fns";

function formatEventDate(dateString, formatType) {
    if (!dateString) return 'Date TBD';

    // Check if the date string is valid
    const date = new Date(dateString);
    if (Number.isNaN(date.getTime())) return dateString;

    return format(date, formatType)
  }

  export {formatEventDate}; 