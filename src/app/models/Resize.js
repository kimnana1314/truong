// Resize.js

const sharp = require("sharp");
const path = require("path");

class Resize {
    constructor(folder) {
        this.folder = folder;
    }
    async save(buffer, User_Id, img) {
        const filename = Resize.filename(User_Id, img);
        const filepath = this.filepath(filename);

        await sharp(buffer)
            .resize(300, 300, {
                // size image 300x300
                fit: sharp.fit.inside,
                withoutEnlargement: true,
            })
            .toFile(filepath);

        return filename;
    }
    static filename(User_Id, img) {
        return `avartar_${User_Id}.${img}`;
    }
    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`);
    }
}
module.exports = Resize;
