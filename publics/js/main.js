//makes the put ajax request when checkboxes against books are seleted for marking them to include in read list
const checkBoxes=document.querySelectorAll('input[type="checkbox"][name="readList"]');
checkBoxes.forEach(function(checkBox){
    checkBox.addEventListener('change',function(event){
        const bookID=event.target.dataset.bookId;
        const ticked=event.target.checked;
        const xhr=new XMLHttpRequest();
        xhr.open('PUT','/user/books/update-read-list',true);
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=UTF-8');
        xhr.onreadystatechange=function(){
            if(xhr.readystate === 4){
                if(xhr.status===200){
                    console.log(xhr.responseText);
                }
                else{
                    console.log(xhr.statusText);
                }
            }
        }
        xhr.send(`bookID=${encodeURIComponent(bookID)}&ticked=${ticked}`);
    })
})

//It renders the read list and fill the dive container of read list tab with the books
const tab2=document.getElementById('RL-tab');

tab2.addEventListener('click',function(event){
    const xhr=new XMLHttpRequest();
    xhr.open('GET','/user/books/rl-books',true);
    xhr.setRequestHeader('Accept','application/JSON');
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                const books=JSON.parse(xhr.responseText)
                const table=document.createElement('table');
                const headerHTMLString="<tr><th>Title</th><th>Author</th><th>Genre</th></tr>"
                table.innerHTML+=headerHTMLString
                table.classList.add('searchResultTable')
                books.forEach(function({bookFile,name,author,genre}){
                    const tr=document.createElement('tr');
                    tr.innerHTML=`<td><a href="/user/pdf/${bookFile}" target="_blank">${name}</a></td><td><p>${author}</p></td><td><p>${genre}</p></td>`
                    tr.classList.add('rowData')
                    table.append(tr);
                })
                const tab2Div=document.getElementById('RL-tab-pane');
                tab2Div.innerHTML = '';
                tab2Div.appendChild(table)
            }
            else {
                console.log(xhr.statusText)
            }
        }
    }
    xhr.send();
})


//It handles the searching feature



var selectedTag='name';
const tags=document.querySelectorAll('input[type="radio"][name="tags"]');
const  searchBox=document.querySelector('input[type="search"][name="search-box"]');
var allBooks=JSON.parse((document.querySelector('input[type="hidden"][name="userInfo"]')).dataset.userinfo);
const rowDataElements = document.querySelectorAll(".rowDataAllBooks");
const genreDropdown=document.querySelector('select[name="genre-select"]')

tags.forEach(function(tag){
    tag.addEventListener('click',function(e){
        selectedTag=e.target.value
        searchBox.value=""; 
        rowDataElements.forEach(function(row){
            row.classList.remove('hide');
        });
    })
})

searchBox.addEventListener('input',(e)=>{
    const inputValue = e.target.value.toLowerCase();
    for(let i=0 ;i<allBooks.length;i++){
        const serverData=allBooks[i][selectedTag].toLowerCase()
        const isVisible=inputValue=='' || serverData.includes(inputValue);
        rowDataElements[i].classList.toggle('hide',!isVisible)
    }
})

