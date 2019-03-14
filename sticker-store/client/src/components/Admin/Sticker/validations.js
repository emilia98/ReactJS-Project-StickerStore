const imgExt = [
    "image/png", 
    "image/jpeg"
];

export function hasOnlyImageFiles(files) {
    for(let file of files) {
        if(imgExt.indexOf(file.type) === -1) {
            return false;
        }
        console.log(file);
    }

    return true;
}