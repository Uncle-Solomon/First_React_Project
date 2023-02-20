import jwtDecode from 'jwt-decode'


const fetchUser= () => {

    const userInfo = JSON.parse(localStorage.getItem('user'))
    const decoded = jwtDecode(userInfo)

    return decoded
}
export default fetchUser