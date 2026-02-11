import axios from 'axios';

const api = axios.create({
    baseURL: window.__APP_CONFIG__?.API_URL || 'http://localhost:3000/api',
});

// Libros
/**
 * Obtiene una lista de libros con paginación y filtros.
 * @async
 * @param {number} [page=1] - Número de página.
 * @param {number} [limit=10] - Límite de resultados por página.
 * @param {string} [search=''] - Término de búsqueda.
 * @param {number|string} [minYear=''] - Año mínimo de publicación.
 * @param {number|string} [maxYear=''] - Año máximo de publicación.
 * @returns {Promise<Object>} Datos de los libros y paginación.
 */
export const getBooks = async (page = 1, limit = 10, search = '', minYear = '', maxYear = '') => {
    const params = { page, limit };
    if (search) params.search = search;
    if (minYear) params.minYear = minYear;
    if (maxYear) params.maxYear = maxYear;
    const response = await api.get('/books', { params });
    return response.data;
};

/**
 * Obtiene un libro por su ID.
 * @async
 * @param {number} id - ID del libro.
 * @returns {Promise<Object>} Datos del libro.
 */
export const getBookById = async (id) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
};

/**
 * Crea un nuevo libro.
 * @async
 * @param {Object} book - Datos del libro.
 * @returns {Promise<Object>} El libro creado.
 */
export const createBook = async (book) => {
    const response = await api.post('/books', book);
    return response.data;
};

/**
 * Actualiza un libro existente.
 * @async
 * @param {number} id - ID del libro.
 * @param {Object} book - Nuevos datos del libro.
 * @returns {Promise<Object>} El libro actualizado.
 */
export const updateBook = async (id, book) => {
    const response = await api.put(`/books/${id}`, book);
    return response.data;
};

/**
 * Elimina un libro.
 * @async
 * @param {number} id - ID del libro a eliminar.
 * @returns {Promise<Object>} Respuesta de la eliminación.
 */
export const deleteBook = async (id) => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
};

// Autores
/**
 * Obtiene la lista de todos los autores.
 * @async
 * @returns {Promise<Object>} Lista de autores (envuelta en objeto de respuesta).
 */
export const getAuthors = async () => {
    const response = await api.get('/authors');
    return response.data;
};

/**
 * Crea un nuevo autor.
 * @async
 * @param {Object} author - Datos del autor.
 * @returns {Promise<Object>} El autor creado.
 */
export const createAuthor = async (author) => {
    const response = await api.post('/authors', author);
    return response.data;
};

/**
 * Actualiza un autor existente.
 * @async
 * @param {number} id - ID del autor.
 * @param {Object} author - Nuevos datos del autor.
 * @returns {Promise<Object>} El autor actualizado.
 */
export const updateAuthor = async (id, author) => {
    const response = await api.put(`/authors/${id}`, author);
    return response.data;
};

/**
 * Elimina un autor.
 * @async
 * @param {number} id - ID del autor a eliminar.
 * @returns {Promise<Object>} Respuesta de la eliminación.
 */
export const deleteAuthor = async (id) => {
    const response = await api.delete(`/authors/${id}`);
    return response.data;
};

// Filtered endpoints
/**
 * Obtiene autores filtrados por año de nacimiento.
 * @async
 * @param {number|string} minYear - Año de nacimiento mínimo.
 * @returns {Promise<Object>} Lista de autores filtrada.
 */
export const getAuthorsByYear = async (minYear) => {
    const response = await api.get('/authors/filter/by-birth-year', {
        params: { minYear }
    });
    return response.data;
};

/**
 * Obtiene libros filtrados por número de páginas.
 * @async
 * @param {number|string} minPages - Número mínimo de páginas.
 * @returns {Promise<Object>} Lista de libros filtrada.
 */
export const getBooksByPages = async (minPages) => {
    const response = await api.get('/books/filter/by-pages', {
        params: { minPages }
    });
    return response.data;
};

export default api;
