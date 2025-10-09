const  formatDate=(dateString: string): string=> {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
  
    
    return date.toLocaleString("en-US", options).replace(",", "");
  }
  
  export {formatDate}