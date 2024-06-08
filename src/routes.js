const { addNoteHanlder, getAllNotesHandler, getNoteByIdHanlder, updateNoteHandler, deleteNoteHandler } = require("./handler");

const routes = [
    {
        method: 'POST',
        path: '/notes',
        handler: addNoteHanlder,
    },
    {
        method: 'GET',
        path: '/notes',
        handler: getAllNotesHandler,
    },
    {
        method: 'GET',
        path: '/notes/{id}',
        handler: getNoteByIdHanlder,
    },
    {
        method: 'PUT',
        path: '/notes/{id}',
        handler: updateNoteHandler,
    },
    {
        method: 'DELETE',
        path: '/notes/{id}',
        handler: deleteNoteHandler,
    }
];


module.exports = routes;