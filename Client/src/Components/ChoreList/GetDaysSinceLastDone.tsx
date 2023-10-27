export const getDaysSinceLastDone = (deadline: Date, interval: number) => {
    // Setup lastDone
    const lastDone = new Date(deadline);
    lastDone.setDate(deadline.getDate() - interval);
  
    // Date now
    const dateNow = new Date(); // in the future use this to adjust the date so calender can be supported
  
    // Calculate time difference
    const timeDifference = dateNow.getTime() - lastDone.getTime();
  
    // Calculate days difference by dividing total milliseconds in a day
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
  
    return Math.floor(daysDifference); // Current day progress is not relevant?
  };