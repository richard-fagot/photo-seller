class Photo {
    constructor(relativeURI, name, thumbnail, fileName) {
        this.relativeURI = relativeURI
        this.thumbnail = thumbnail
        this.name = name
        this.fileName = fileName
    }
}

module.exports = Photo