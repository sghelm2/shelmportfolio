/**
 * Created by Sarah on 10/20/2014.
 */
var project = require('./structures/Project.js');
var file = require('./structures/File.js');
var directory = require('./structures/Directory.js');
var version = require('./structures/Version.js');

//Create a dictionary of all the log messages to their revision #
exports.createLogDict = function (xml_object) {
    var log_list = xml_object.log.logentry;
    var logDict = {}
    log_list.forEach(function(log, index, array) {
        logDict[log.$.revision] = log.msg;
    });
    return logDict;
}
//Creates a dictionary of all the projects to their name
exports.createProjectDict = function(xml_object, logDict){
    var xml_list = xml_object.lists.list[0];
    //initialize an empty list!
    var projectDict = {};
    var entries = xml_list.entry;
    //create an object for each entry in the xml file
    entries.forEach(function(entry, index, array) {
        var this_path = String(entry.name);
        var this_path_list = this_path.split('/');
        var currDir = null;
        //for all of the names of folders/files in the path, check whether they're created
        //if created, loop through the rest of the folder/file names using that as the currDir
        // else create it and set it to be the currentDir
        this_path_list.forEach(function (element, index, array) {
            //console.log("array: " + array);
            if (currDir != null) {
                //console.log("current index, dir->element: " + index + "," + currDir.name + "->" + element);
            }
            if (index == 0) {
                if (projectDict[element] == null) {
                    var project = createProject(element, entry, logDict);
                    projectDict[element] = project;
                    currDir = project;
                }
                else {
                    currDir = projectDict[element];
                }
            } else if(index == this_path_list.length - 1) {
                if (String(entry.$.kind) == 'file') {
                    var file = createFile(element, entry, logDict);
                    currDir.folders[element] = file;
                } else {
                    var folder = createDir(element);
                    currDir.folders[element] = folder;
                }
            } else {
                if (currDir.folders[element] == null) {
                    //console.log("no directory where should be!" + element);
                }
                //don't need to check for null here because all folders will have already been created up until the last one! (list is ordered with correct heirarchy)
                currDir = currDir.folders[element];
            }
        });

    });
    //console.log(require('util').inspect(projectDict, false, null))
    return projectDict;
    /*var projectName = null;
    var this_entry = xml_list.entry[0];
    if (this_entry.$ == "dir") {
        projectName = this_entry.name;
    }
    //console.log("There are ", entries.length, " entries");
    for(var i = 0; i < entries.length; i++) {
        //console.log(entries[i]);
        if (entries[i].name.indexOf(projectName) == -1) {
            projectName = entries[i].name;
            var newProject = createProject(projectName, xml_list.entry[i]);
            projectDict.push(newProject);
        }
        else if(entries[i].$ == "file") {
            updateProject(projectName, xml_list.entry[i]);
        }
    }
    return projectDict;*/
    //at current entry, check whether project exists
    //for all but last in skip('/') array, check whether directory exists
    //if exists go to it, if not then add it
    //if is entry is file then last value in split list is file, otherwise it's a directory!

};

function createProject(name, entry, logDict) {
    var name = name;
    var date = String(entry.commit[0].date);
    //console.log("Logging project: ", name);
    var version = String(entry.commit[0].$.revision); //more than 1 possibly?
    var summary = String(logDict[version]);
    return new project.Project(name, date, version, summary);

    //set the project name, date, summary, version
        //entry
        //go through this entry.forEach (function(element,index) {} creating the different variables
    //
}       //pass those into the new Project(

function updateProject(name, entry) {
    //update the project with that name by appending the file to it!
    //update project to include newly added elements: files to file list
}

function createDir(name) {
    //console.log("Logging directory: ", name);
    return new directory.Directory(name);
}

function createFile(name, entry, logDict) {
    var path = String(entry.name);
    var size = String(entry.size);
    var version = createVersion(entry, logDict);
    //console.log("Logging file: ", name);
    return new file.File(path, size, version, name);
}

function createVersion(entry, logDict) {
    var revision = String(entry.commit[0].$.revision);
    var author = String(entry.commit[0].author);
    var date = String(entry.commit[0].date);
    var message = String(logDict[revision]);
    return new version.Version(revision, author, date, message);
    //revision, author, date, message
}



exports.updateProjectDict = function(xml_list, projectDict) {var xml_list = xml_object.lists.list[0];
    //initialize an empty list!
    var entries = xml_list.entry;
    //create an object for each entry in the xml file
    entries.forEach(function(entry, index, array) {
        var this_path = String(entry.name);
        var this_path_list = this_path.split('/');
        var currDir = null;
        //for all of the names of folders/files in the path, check whether they're created
        //if created, loop through the rest of the folder/file names using that as the currDir
        // else create it and set it to be the currentDir
        this_path_list.forEach(function (element, index, array) {
            //console.log("array: " + array);
            if (currDir != null) {
                //console.log("current index, dir->element: " + index + "," + currDir.name + "->" + element);
            }
            if (index == 0) {
                if (projectDict[element] == null) {
                    var project = createProject(element, entry, logDict);
                    projectDict[element] = project;
                    currDir = project;
                }
                else {
                    currDir = projectDict[element];
                }
            } else if(index == this_path_list.length - 1) {
                if (String(entry.$.kind) == 'file') {
                    var file = createFile(element, entry, logDict);
                    currDir.folders[element] = file;
                } else {
                    var folder = createDir(element);
                    currDir.folders[element] = folder;
                }
            } else {
                if (currDir.folders[element] == null) {
                    //console.log("no directory where should be!" + element);
                }
                //don't need to check for null here because all folders will have already been created up until the last one! (list is ordered with correct heirarchy)
                currDir = currDir.folders[element];
            }
        });

    });
    console.log(require('util').inspect(projectDict, false, null))
    return projectDict;
}