const db = require('../config/db');

const createCourse = (titre, contenu, description) => {
    const query = 'INSERT INTO courgratuits (titre, contenu, description) VALUES (?, ?, ?)';
    return db.query(query, [titre, contenu, description]);
};

const getAllCourses = () => {
    const query = 'SELECT * FROM courgratuits';
    return db.query(query);
};

const getCourseById = (courseId) => {
    const query = 'SELECT * FROM courgratuits WHERE id = ?';
    return db.query(query, [courseId]);
};

const updateCourse = (courseId, titre, contenu, description) => {
    const query = 'UPDATE courgratuits SET titre = ?, contenu = ?, description = ? WHERE id = ?';
    return db.query(query, [titre, contenu, description, courseId]);
};

const deleteCourse = (courseId) => {
    const query = 'DELETE FROM courgratuits WHERE id = ?';
    return db.query(query, [courseId]);
};

const searchCourses = (searchTerm) => {
    const query = `
        SELECT *
        FROM courgratuits
        WHERE titre LIKE ? OR contenu LIKE ? OR description LIKE ?
    `;
    const searchPattern = `%${searchTerm}%`;
    return db.query(query, [searchPattern, searchPattern, searchPattern, searchPattern, searchPattern]);
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse,
    searchCourses,
};
