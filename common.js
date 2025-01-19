export  const getRoomId = (userId1 , userId2) =>{  // we sort this ids because no matter then if you are logged in as user1 or user2 , it will always return to the same room
const sortedIds = [userId1 , userId2].sort();
const roomId = sortedIds.join('-');
return roomId
}

export const formatDate = date =>{
    var day = date.getDate();
    var monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep",  "oct", "nov", 'dec'];
    var month = monthNames[date.getMonth()];
    var formattedDate = day + ' ' + month;
    return formattedDate;
}