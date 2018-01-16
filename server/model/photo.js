class Photo {
    constructor(id, relativeURI, name, thumbnail, fileName) {
        this.id = id
        this.relativeURI = relativeURI
        this.thumbnail = thumbnail
        this.name = name
        this.fileName = fileName
    }
}

module.exports = Photo