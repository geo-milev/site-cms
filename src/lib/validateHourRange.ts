export const validateDates = (siblingData, startDateName, endDateName, errorString) => {
    if (!siblingData) return true
    const workingHoursStart = new Date(siblingData[startDateName])
    const workingHoursEnd = new Date(siblingData[endDateName])

    const dateFormatOptions: Intl.DateTimeFormatOptions = {hour: '2-digit', minute: '2-digit', hour12: false}

    const workingHoursStartTimeString = workingHoursStart.toLocaleTimeString('en', dateFormatOptions)
    const workingHoursEndTimeString = workingHoursEnd.toLocaleTimeString('en', dateFormatOptions)

    if (workingHoursStartTimeString > workingHoursEndTimeString) {
        return errorString
    }

    return true
}