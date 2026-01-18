import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api',
});

// Libros
export const getBooks = async (page = 1, limit = 10, search = '', minYear = '', maxYear = '') => {
    const params = { page, limit };
    if (search) params.search = search;
    if (minYear) params.minYear = minYear;
    if (maxYear) params.maxYear = maxYear;
    const response = await api.get('/books', { params });
    return response.data;
};

export const getBookById = async (id) => {
    const response = await api.get(`/books/${id}`);
    return response.data;
};

export const createBook = async (book) => {
    const response = await api.post('/books', book);
    return response.data;
};

export const updateBook = async (id, book) => {
    const response = await api.put(`/books/${id}`, book);
    return response.data;
};

export const deleteBook = async (id) => {
    const response = await api.delete(`/books/${id}`);
    return response.data;
};

// Autores
export const getAuthors = async () => {
    const response = await api.get('/authors');
    return response.data;
};

export const createAuthor = async (author) => {
    const response = await api.post('/authors', author);
    return response.data;
};

export const updateAuthor = async (id, author) => {
    const response = await api.put(`/authors/${id}`, author);
    return response.data;
};

export const deleteAuthor = async (id) => {
    const response = await api.delete(`/authors/${id}`);
    return response.data;
};

// Filtered endpoints
export const getAuthorsByYear = async (minYear) => {
    const response = await api.get('/authors/filter/by-birth-year', {
        params: { minYear }
    });
    return response.data;
};

export const getBooksByPages = async (minPages) => {
    const response = await api.get('/books/filter/by-pages', {
        params: { minPages }
    });
    return response.data;
};

export default api;
