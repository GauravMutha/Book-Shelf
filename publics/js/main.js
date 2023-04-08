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
        console.log(bookID,ticked)
        xhr.send(`bookID=${encodeURIComponent(bookID)}&ticked=${ticked}`);
    })
})