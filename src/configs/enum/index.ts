interface UserType {
    매니저 : object,
    영업자회원 : object,
    고객 : object,
    파트너회원 : object,
}
export const userType : UserType = {
    매니저 : { name : '매니저', value: 'm', color:"black"},
    영업자회원 : { name : '매니저', value: 'r', color:"black"},
    고객 : { name : '매니저', value: 'c', color:"black"},
    파트너회원 : { name : '매니저', value: 'p', color:"black"},
}
