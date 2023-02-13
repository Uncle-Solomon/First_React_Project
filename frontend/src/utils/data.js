export const UserQuery = (userId) => {
    const query = `*[_type == "user" && _id == '${userId}']`
    return query
}

export default UserQuery