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

const tab2=document.getElementById('RL-tab');

tab2.addEventListener('click',function(event){
    const xhr=new XMLHttpRequest();
    xhr.open('GET','/user/books/rl-books',true);
    xhr.setRequestHeader('Accept','application/JSON');
    xhr.onreadystatechange=function(){
        if(xhr.readyState==4){
            if(xhr.status==200){
                const books=JSON.parse(xhr.responseText)
                const ul=document.createElement('ul');
                books.forEach(function({bookFile,name}){
                    const li=document.createElement('li');
                    const a=document.createElement('a');
                    a.href='/user/pdf/'+bookFile;
                    a.textContent=name;
                    a.target='_blank'
                    li.appendChild(a);
                    ul.appendChild(li);
                })
                const tab2Div=document.getElementById('RL-tab-pane');
                tab2Div.innerHTML = '';
                tab2Div.appendChild(ul)
            }
            else {
                console.log(xhr.statusText)
            }
        }
    }
    xhr.send();
})