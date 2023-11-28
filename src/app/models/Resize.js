const sharp = require("sharp");
const path = require("path");

class Resize {
    constructor(folder) {
        this.folder = folder;
    }
    async save(buffer, file_Name) {
        const filename = Resize.filename(file_Name);
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
    static filename(file_Name) {
        // random file name
        return `avartar_${file_Name}.png`;
    }
    filepath(filename) {
        return path.resolve(`${this.folder}/${filename}`);
    }
}
module.exports = Resize;
