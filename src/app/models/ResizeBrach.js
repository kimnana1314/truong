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
            .resize(200, 100, {
                // size image 200x100
                fit: sharp.fit.inside,
                withoutEnlargement: true,
            })
            .toFile(filepath);

        return filename;
    }
    static filename(User_Id, img) {
        return `brach_${User_Id}.${img}`;
    }
    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`);
    }
}
module.exports = Resize;
