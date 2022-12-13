import router from '../router';

export function logout() {
    localStorage.removeItem('jwtToken');
    router.push('/login');
    // window.location.href = '/login';
}