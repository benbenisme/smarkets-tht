export function CalculateDateTimeDifferenceInMinutes(firstDateTimeVariant, secondDateTimeVariant) {
    // Use current date time as the second arg
    const differenceInMinutes = (Date.parse(firstDateTimeVariant) - Date.parse(secondDateTimeVariant)) / 60000;   
    return differenceInMinutes;
}
