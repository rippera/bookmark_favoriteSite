document.getElementById('myForm').addEventListener('submit', saveBookmark);

//saveBookmark
function saveBookmark(e) {
    let siteName = document.getElementById('siteName').value;
    let siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    let bookmark = {
        name: siteName,
        url: siteUrl
    }

    if (localStorage.getItem('bookmarks') === null) {
        // init array
        let bookmarks = [];

        // add to array
        bookmarks.push(bookmark);

        // set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    } else {

        // get bookmarks from localStorage 
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // add bookmark to array
        bookmarks.push(bookmark);

        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    // clear form
    document.getElementById('myForm').reset();

    // Re-fetch bookmarks
    fetchBookmarks();

    e.preventDefault();
}

// delete bookmark
function deleteBookmark(url) {
    // Get bookmarks from localstorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // loop throught bookmark
    for (let i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            // remove from array
            bookmarks.splice(i, 1);
        }

    }
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    // Re-fetch bookmarks
    fetchBookmarks();
};

// fetchBookmarks
function fetchBookmarks() {
    // Get bookmarks from localstorage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get output id
    let BookmarkResult = document.getElementById('BookmarkResult');


    // build output
    BookmarkResult.innerHTML = '';

    // lop 
    for (let i = 0; i < bookmarks.length; i++) {

        let name = bookmarks[i].name;
        let url = bookmarks[i].url;

        BookmarkResult.innerHTML += '<div class="bookmarks">' +
                                    '<h3 class="bookmarks-h3">' + name +
            ' <a class="btn-gray" target="_blank" href="' + url + '">Visit</a> ' +
            ' <a onclick="deleteBookmark(\'' + url + '\')" class="btn-red" href="#">delete</a> '
                                    '</h3>' +
                                    '</div>';
    }
}

// validator form
function validateForm(siteName, siteUrl) {
    // if input is not fill
    if (!siteName || !siteUrl) {
        alert('Please Fill Site Name And Site Url');
        return false;
    }
    let expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    let regex = new RegExp(expression);
    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL')
        return false;
    }
    return true;

}