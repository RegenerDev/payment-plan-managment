export const getUsers = () => {
    return JSON.parse(localStorage.getItem('users')) || []
}

export const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users))
}

export const login = (email, password) => {
    const users = getUsers()
    const user = users.find((u) => u.email === email && u.password === password)
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user))
        return user
    }
    return null
}

export function register(email, password, role = 'user') {
    let users = JSON.parse(localStorage.getItem('users')) || []

    if (users.find((u) => u.email === email)) {
        return false
    }

    users.push({ email, password, role, subscription: null })
    localStorage.setItem('users', JSON.stringify(users))
    return true
}

export const logout = () => {
    localStorage.removeItem('currentUser')
}

export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'))
}

export function updateUser(email, updatedFields) {
    let users = JSON.parse(localStorage.getItem('users')) || []
    users = users.map((user) => {
        if (user.email === email) {
            return { ...user, ...updatedFields }
        }
        return user
    })
    localStorage.setItem('users', JSON.stringify(users))

    const currentUser = JSON.parse(localStorage.getItem('currentUser'))
    if (currentUser?.email === email) {
        const updatedUser = { ...currentUser, ...updatedFields }
        localStorage.setItem('currentUser', JSON.stringify(updatedUser))
    }
}
