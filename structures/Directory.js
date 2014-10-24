/**
 * Created by Sarah on 10/22/2014.
 */
exports.Directory  = function (name1) {
    this.name = name1;
    this.kind = "dir";
    this.folders = {};

    function updateFolders(folder) {
        this.folders.push(folder)
    }

    return this;
}