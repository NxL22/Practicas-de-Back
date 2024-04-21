function dtoUserCreate(name, email, password) {
    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
        throw new Error('Los tipos de datos son incorrectos');
    }

    // Validar formato de email (puedes usar una expresión regular)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        throw new Error('El formato del correo electrónico es inválido');
    }
}

export { dtoUserCreate };
