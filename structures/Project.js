/**
 * Created by Sarah on 10/20/2014.
 */
exports.Project = function (name1, date1, version1, summary1) {
    this.name = name1;
    this.date = date1;
    this.version = version1;
    this.summary = summary1;
    this.folders = {};

    function updateFolders(folder) {
        this.folders.push(folder)
    }

    return this;
}