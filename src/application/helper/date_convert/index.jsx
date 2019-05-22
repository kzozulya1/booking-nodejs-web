//Private:
function _dateConvert(pythonDate){
    if (!pythonDate.match(/.*T.*/)) return pythonDate
    let dateParts = pythonDate.replace(/(T.*)/,'').split('-')
    return dateParts[2] + '.' + dateParts[1] + '.' + dateParts[0]
}

//Export:

/** 
 * Library routine - convert pg dates for human readable
 */
export const  dateConvert = (pythonDate) => {
    return _dateConvert(pythonDate)
}

/**
 * Convert date 2019-01-22T00:00:00 to 22.01.2019
 */
export const applyDateFormatting = (user) => {
    
    user.created_at = _dateConvert(user.created_at)
    user.modified_at = _dateConvert(user.modified_at)

    if (user.reservations.length){
        user.reservations.forEach(function (reservation, index) {
            user.reservations[index].book_from = _dateConvert(user.reservations[index].book_from);
            user.reservations[index].book_to = _dateConvert(user.reservations[index].book_to);
            user.reservations[index].created_at = _dateConvert(user.reservations[index].created_at);
            user.reservations[index].modified_at = _dateConvert(user.reservations[index].modified_at);
        });
    }

    if (user.rooms.length){
        user.rooms.forEach(function (room, i) {
            if (room.reservations.length){
                room.reservations.forEach(function(reservation, j){
                    user.rooms[i].reservations[j].book_from = _dateConvert(reservation.book_from);
                    user.rooms[i].reservations[j].book_to = _dateConvert(reservation.book_to);
                });
            }
        });
    }

    //console.log("formatted user data",user)


    return user
}