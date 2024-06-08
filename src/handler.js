const { nanoid } = require("nanoid");
const notes = require("./notes");

const addNoteHanlder = (requeset, h) => {
    const { title, tags, body } = requeset.payload;
    const id = nanoid(16)
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newNote = {
        title, tags, body, id, createdAt, updatedAt,
    };

    notes.push(newNote);

    const isSuccess = notes.filter((note) => note.id == id).length > 0;

    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data: {
                noteId: id,
            },
        });

        response.code(201);
        return response;
    }


    const response = h.response({
        status: 'fail',
        message: 'Catatan gagal ditambahkan',
    });

    response.code(500);
    return response;
}



const getAllNotesHandler = () => ({
    status: 'success',
    data: {
        notes,
    },
})

const getNoteByIdHanlder = (requeset, h) => {
    const { id } = requeset.params;

    const note = notes.filter((n) => n.id === id)[0];

    if (note !== undefined) {
        return {
            status: 'success',
            data: {
                note,
            }
        };
    }

    const response = h.response({
        status: 'fail',
        message: 'Catatan tidak ditemukan',
    });

    response.code(404);
    return response;

}


const updateNoteHandler = (request, h) => {
    const { id } = request.params;
    const { title, tags, body } = request.payload;


    const index = notes.findIndex((n) => n.id === id);


    if (index !== -1) {
        const note = notes[index];
        note.title = title;
        note.tags = tags;
        note.body = body;
        note.updatedAt = new Date().toISOString();
        notes[index] = note;

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil diubah',
            data: {
                noteId: id,
            },
        });

        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: 'failed',
            message: 'Catatan gagal diubah, id tidak ditemukan',
        });

        response.code(404);
        return response;
    }
}

const deleteNoteHandler = (request, h) => {
    const { id } = request.params;

    const index = notes.findIndex((n) => n.id === id);


    if (index !== -1) {
        notes.pop(notes[index])

        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
            data: {
                noteId: id,
            },
        });

        response.code(200);
        return response;
    } else {
        const response = h.response({
            status: 'failed',
            message: 'Catatan gagal dihapus, id tidak ditemukan',
        });

        response.code(404);
        return response;

    }
}

module.exports = { addNoteHanlder, getAllNotesHandler, getNoteByIdHanlder, updateNoteHandler, deleteNoteHandler }