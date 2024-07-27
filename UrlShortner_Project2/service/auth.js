const UserToIdMap = new Map();

function setUser(id,user){
    UserToIdMap.set(id,user)
}

function getUser(id){
    return UserToIdMap.get(id)
}

module.exports = {
    setUser,getUser
}