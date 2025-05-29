export const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('mostrar-mensaje');

    localStorage.setItem('mostrar-mensaje', 'true');

    window.location.href = '/auth';
    window.location.reload();
}