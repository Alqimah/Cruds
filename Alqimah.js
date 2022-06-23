let stars = document.getElementById('stars');
let moon = document.getElementById('moon');
let mountains3 = document.getElementById('mountains3');
let mountains4 = document.getElementById('mountains4');
let river = document.getElementById('river');
let boat = document.getElementById('boat');
let Alqimah = document.querySelector('.Alqimah');

// this function when scrollY to move the photos
window.onscroll = function(){
    // variable value = scrollY 
    let value = scrollY;
    stars.style.left = value + 'px';
    // to make the moon move quicker value * 3
    moon.style.top = value * 4 + 'px';
    mountains3.style.top = value * 1.5 + 'px';
    mountains4.style.top = value * 1.2 + 'px';
    river.style.top = value + 'px';
    boat.style.top = value + 'px';
    boat.style.left = value * 3 + 'px';
    Alqimah.style.fontSize = value + 'px';
    if(scrollY >= 60){
        Alqimah.style.fontSize = 60 + 'px';
        Alqimah.style.position = 'fixed';
        if(scrollY >= 429){
            Alqimah.style.display = 'none';
        }
        else{
            Alqimah.style.display = 'block';
        }
        if(scrollY >= 90){
            document.querySelector('.main').style.background ='linear-gradient(#30a8f8,#10001f)'
        }else{
            document.querySelector('.main').style.background ='linear-gradient(#200020,#10001f)'

        }
    }

}

// cruds code 

let title = document.getElementById('title');
let price = document.getElementById('price');
let taxs = document.getElementById('taxs');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
//متغير للتعديل او للإنشاء 
let mood = 'create';
//متغير وهمي عشان يكون مرئي للكل
let tmp;
//get total
// we create function then to put it in the html inputs 
//to convert value from string to number we put before code +

function getTotal() {
if(price.value != ''){
    let result = (+price.value + +taxs.value + +ads.value) 
    - +discount.value;
    total.innerHTML = result;
    total.style.background = '#040';
    
    }else{
        total.innerHTML = '' ;
        total.style.background = '#f10';
}
}



//creat product
//we creat array to gather all data inside it  then creat object ,
// then put the object inside array
//we have to use if to keep all old data in localStorage when reload page
// 
let dataPro;
if(localStorage.product != null){
    dataPro = JSON.parse(localStorage.product)
    }
    else{
        dataPro = [];
    }


//creat function from the button "creat" which we made variable name submit

    submit.onclick  = function(){
    //create object inside the function ,then we create variables names 
    //then put all the variables inside with value "data"
    let newPro = {
    title:title.value.toLowerCase(),
    price:price.value,
    taxs:taxs.value,
    ads:ads.value,
    discount:discount.value,
    total:total.innerHTML,
    count:count.value,
    category:category.value.toLowerCase(),

            } //for the object


    //we make sure if there is number in the count which will 
    //creat items asper written number inside it , 
    // then we make a loop to create it
    //count
    // this first if to create clear data , mean to not create empty values
    if(title.value != ''
    && price.value != '' 
    && category.value != ''
    && newPro.count < 100){
        if(mood === 'create'){
        if(newPro.count > 1)
        {
        for(let i=0; i < newPro.count; i++)
            {
            //we put the array which gather all data inside object 
            dataPro.push(newPro);
            }
        }
        else{
            dataPro.push(newPro);
        }

        }
        // this else for update information and show it in the page
        else{
            dataPro[tmp] = newPro;
            //then we will back the mood to create after the update
            mood = 'create';
            //to rename the button to create
            submit.innerHTML = 'Create';
            //to show  again the count input
            count.style.display = 'block';
        }
        // this function to clear data from inputs just after create item
        //but if not create for any trouble , to keep data in inputs 
        //to be easy for the customer to edit , but not write again 
        clearData()
    }


        
    // we creat item inside localStorage then creat name for it ,
    // then we have to convert the value to string by 
    //JSON.stringify( here we put the array name )
    //save to local storage
    localStorage.setItem('product', JSON.stringify(dataPro))

    //this function we create down to clear all data or inputs
    // when we click on submit or create so we have to call it here to work
    

    // this function to show data also we created it down in the read data
    showData()
                                } // for the function



    //clear date "inputs" creat function then we remove all inputs
    function clearData() {
    title.value = '';
    price.value = '';
    taxs.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';

    }

//read data
function showData() {
    getTotal()
let table = '';
for (let i = 0; i < dataPro.length; i++) {
    // i+1 in the td to show ID from 1 , not 0
    table += `
    <tr>   
        <td>${i+1}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].taxs}</td>
        <td>${dataPro[i].discount}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick ="updateData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
    </tr>
    `;
}

document.getElementById('tbody').innerHTML = table;

// we created div in html then we create a variable name here 

let btnDelete = document.getElementById('deleteAll');
// to show button deleteAll if there is any data in the array "dataPro"
//if no data so the button will be hidden
if(dataPro.length > 0){
    btnDelete.innerHTML = `
    <button onclick ="deleteAll()" >Delete All(${dataPro.length})</button>
    `
                    }
else{
    btnDelete.innerHTML ='';
    }
                    }
showData()

//delete data
function deleteData(i) {
    //to delete one item on one click on delete
    //so we bring data from the array 
dataPro.splice(i,1);
localStorage.product = JSON.stringify(dataPro);
//then we have to show new data after delete by calling function showData()
showData()
}

function deleteAll(){
    //to delete all from localStorage
    localStorage.clear()
    //to delete all data from the array 
    dataPro.splice(0)
    showData()

}

//count we made it in a loop in the submit or create function



//update 
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxs.value = dataPro[i].tax;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    //getTotal() is a function that we created once so we can call it here 
    getTotal()
    //we dont need the count input so we should hide it by this code
    count.style.display = 'none';
    category.value = dataPro[i].category;
    //to rename the button to update
    submit.innerHTML = 'Update'
    //to use the update mood which we crated it at the beginning
    mood = 'update';
    tmp = i;
    // to scroll up smoothly when click on update
    scroll({
        top:605.8181762695312,
        behavior: 'smooth'
            })
        }

//search

// we created this variable name to switch the mood onclick the button
//if search by title or category
let searchMood = 'title';
//this function to get the id of the button title and category onclick 
// so we call it in the html (button code)
function getSearchMood(id) {
    let search = document.getElementById('search')
if (id == 'searchTitle'){
searchMood = 'title';
search.placeholder = 'Search By Title'
}
else{
    searchMood = 'category';
}
search.placeholder = 'Search By '+searchMood;
//this to focus on the search input when click on the button
search.focus()
//this to clear the search input when click on the button
search.value = '';
//then call show data function 
showData()
}
//we create this function then call it in Html input code
function searchData(value){
    let table = '';
    for(let i = 0; i< dataPro.length; i++){
    if(searchMood == 'title'){
            if(dataPro[i].title.includes(value.toLowerCase())){
                // this table to show target data asper search
                table += `
                <tr>   
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].taxs}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick ="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
    }
    else{
            if(dataPro[i].category.includes(value.toLowerCase())){
                // this table to show target data asper search
                table += `
                <tr>   
                    <td>${i+1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].taxs}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick ="updateData(${i})" id="update">update</button></td>
                    <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
                `;
            }
    }
        }
    // to show data after search on the table
    document.getElementById('tbody').innerHTML = table;
}






//clean data