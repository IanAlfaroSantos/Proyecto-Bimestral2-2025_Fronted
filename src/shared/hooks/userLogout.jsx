export const logout = () => {
    // Limpiar todos los datos relevantes
    localStorage.removeItem('user');
    localStorage.removeItem('token'); // Si usas token
    localStorage.removeItem('mostrar-mensaje'); // Limpiar por si acaso
    
    // Establecer el mensaje para mostrar después del redirect
    localStorage.setItem('mostrar-mensaje', 'true');
    
    // Forzar recarga completa para limpiar estados
    window.location.href = '/auth'; // Redirigir directamente a auth
    window.location.reload(); // Asegurar recarga
}