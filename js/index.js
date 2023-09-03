
/* Code by Hany Ragab
h.ragab611@gmail.com */

//Preparing home page
$(document).ready(() => {
    closeSidbar()
    searchName('')
})
window.onload=function(){
    $(".splash-screen").fadeOut(500)
}


// Sliding Side menu bar
$(".slide-button").on('click', function(){
    console.log('Click')
    if ($(".side-container").css("left") == "0px") {
       // Close Side Bar
       closeSidbar()

    } else {
      // Open Side Bar
      openSidbar()
    }
});

function openSidbar(){
    console.log('open')
    $(".side-container").animate({
        left: 0
    }, 500)
    $(".slide-button").removeClass("fa-align-justify");
    $(".slide-button").addClass("fa-x");
   
    for (let i = 0; i < 5; i++) {
        $("li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }

}
function closeSidbar(){
    console.log('close')
    $(".side-container").animate({
        left: -$(".side-menu").outerWidth()
    }, 500)
    $(".slide-button").addClass("fa-align-justify");
    $(".slide-button").removeClass("fa-x");
   
    $("li").animate({
        top: 300
    }, 500)
}
//---------------------------------------------------------------------------


//Search for meals by name
async function searchName(name) {
    console.log('name '+ name);
    closeSidbar()
    $(".splash-screen").fadeIn(200)


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response = await response.json()
    console.log('respnse',response.meals)
    response.meals ? displayItems(response.meals) : displayItems([])
   
    $(".splash-screen").fadeOut(500)

}

//Search for meals by first letter
async function searchFletter(fletter) {
    console.log('fletter '+ fletter);

    closeSidbar()
    $(".splash-screen").fadeIn(200)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${fletter}`)
    response = await response.json()
    console.log('respnse',response.meals)
    if( response.meals.length>0){
        displayItems(response.meals)
    }else{
        alert("No Data been fetched")
    }
    
    $(".splash-screen").fadeOut(500)

}

//Loading meals categories
async function getMealsCategories() {
    console.log('Get categories');
    closeSidbar()
    $(".splash-screen").fadeIn(200)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await response.json()
    console.log('respnse',response.categories)
    if( response.categories.length>0){
        displayMealsCategories(response.categories)
    }else{
        alert("No Data been fetched")
    }
    
    $(".splash-screen").fadeOut(500)

}

//Fetching meals Areas
async function getMealsAreas() {
    console.log('Get categories');
    closeSidbar()
    $(".splash-screen").fadeIn(200)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await response.json()
    console.log('respnse',response.meals)
    if( response.meals.length>0){
        displayMealsAreas(response.meals)
    }else{
        alert("No Data been fetched")
    }
    
    $(".splash-screen").fadeOut(500)

}

//Display meals Areas on html
function displayMealsAreas(areaArr){
    console.log('displaying Areas')
    
document.getElementById('items-container').innerHTML=``

    if(areaArr.length>0){

        for(i=0;i<areaArr.length;i++){
            
            document.getElementById('items-container').innerHTML+=`
            <div class="col-md-3">
            <div onclick="getAreaMeals('${areaArr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${areaArr[i].strArea}</h3>
            </div>
         </div>
            `
        }
    }
  
}

//Fetching meals Ingredients
async function getMealsIngredients() {
    console.log('Get Ingredients');
    closeSidbar()
    $(".splash-screen").fadeIn(200)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await response.json()
    console.log('respnse',response.meals)
    if( response.meals.length>0){
        displayIngr(response.meals.slice(0, 25))
    }else{
        alert("No Data been fetched")
    }
    
    $(".splash-screen").fadeOut(500)

}
//Display meals Ingredients on html
function displayIngr(ingArr){
    console.log('displaying Ingredients')
    
document.getElementById('items-container').innerHTML=``

    if(ingArr.length>0){

        for(i=0;i<ingArr.length;i++){
            
            document.getElementById('items-container').innerHTML+=`
            <div class="col-md-3">
                <div onclick="getIngredientsMeals('${ingArr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${ingArr[i].strIngredient}</h3>
                        <p>${ingArr[i].strDescription.slice(0,120)}</p>
                </div>
        </div>
            `
        }
    }
  
}

//Display meals items on html
function displayItems(itemsArr){
    console.log('displaying items')
    
document.getElementById('items-container').innerHTML=``

    if(itemsArr.length>0){

        for(i=0;i<itemsArr.length;i++){
            
            document.getElementById('items-container').innerHTML+=`
            <div class="item-box col-md-3">
            <div class="image position-relative rounded-2 overflow-hidden cursor-pointer">
                <img class="w-100 " src="${itemsArr[i].strMealThumb}" alt="" srcset="">
                <div class="over-lay d-flex align-items-center  h-100 w-100 start-0 top-100  position-absolute ">
                <h3 class="text-black ">${itemsArr[i].strMeal}</h3>
                </div>
            </div>
         </div>
            `
        }
    }
  
}


//Display meals Categories on html
function displayMealsCategories(catsArr){
    console.log('displaying items')
document.getElementById('items-container').innerHTML=``

    if(catsArr.length>0){

        for(i=0;i<catsArr.length;i++){
            
            document.getElementById('items-container').innerHTML+=`
            <div class="item-box col-md-3">
            <div class="image position-relative rounded-2 overflow-hidden cursor-pointer">
                <img class="w-100 " src="${catsArr[i].strCategoryThumb}" alt="" srcset="">
                <div class="over-lay d-flex flex-column align-items-center justify-content-center h-100 w-100 start-0 top-100  position-absolute ">
                <h3 class="text-black ">${catsArr[i].strCategory}</h3>
                <p class="text-black ps-3 ">${catsArr[i].strCategoryDescription.slice(0,100)} </p>
                </div>
            </div>
         </div>
            `
        }
    }
    

}


function searchForm(){
    closeSidbar()
    console.log('searchform')
    document.getElementById('search-form').innerHTML=`
    
        <input onkeyup="searchName(this.value)" id='searchbyname' class="col-md-5 bg-transparent rounded-2 border-white p-2 text-white" type="text" placeholder="Search By Name">
        <input onkeyup="searchFletter(this.value)" maxlength="1" id='searchbyletter' class="col-md-5 bg-transparent rounded-2 border-white p-2 text-white" type="text" placeholder="Search By First Letter">
        
       `
}

function contactForm(){
    closeSidbar()
    console.log('Contacts')
    document.getElementById('items-container').innerHTML=`
    <div class="form-container text-center">
    <div class="d-flex justify-content-center align-self-center gap-4 flex-wrap ">
    <div class="forminput col-md-5 " id="namediv"><input onkeyup="validateName(this.value)"     id='name' class="w-100 rounded-2  p-2 text-bg-light" type="text" placeholder="Ente Your Name"></div>
    <div class="forminput col-md-5 " id="maildiv"><input onkeyup="validateEmail(this.value)"  id='email' class="w-100  rounded-2  p-2 text-bg-light" type="text" placeholder="Enter your email"></div>
    <div class="forminput col-md-5 " id="phonediv"><input onkeyup="validatePhone(this.value)"     id='phone' class="w-100 rounded-2  p-2 text-bg-light" type="text" placeholder="Enter your phone"></div>
    <div class="forminput col-md-5 " id="agediv"><input onkeyup="validateAge(this.value)"  id='age' class="w-100 rounded-2  p-2 text-bg-light" type="text" placeholder="Enter your age"></div>
    <div class="forminput col-md-5 " id="passdiv"><input onkeyup="validatePassword(this.value)"     id='password' class="w-100 rounded-2  p-2 text-bg-light" type="text" placeholder="Enter password"></div>
    <div class="forminput col-md-5 " id="cpassdiv"><input onkeyup="validateConfirmPassword(this.value)"  id='repassword' class="w-100 rounded-2  p-2 text-bg-light" type="text" placeholder="Confirm your password"></div>
            
        </div>
        <button id="submitBtn" disabled="" class="btn btn-outline-danger px-2 mt-3 w-auto mt-4">Submit</button>
            
</div>
       `
}

let nameValid=false
let mailValid=false
let phoneValid=false
let ageValid=false
let passValid=false
let cPassValid=false
//&&ageValid&&passValid&&cPassValid
function formValidation(){
    if(nameValid&&mailValid&&phoneValid&&ageValid&&passValid&&cPassValid){
        console.log('form valid')
        document.querySelector('#submitBtn').disabled = false;
        console.log('form valid')
    }else{
        document.querySelector('#submitBtn').disabled = true;
        console.log('form  not valid')
    }
}

function validateName(strName){
    var regex = /^[a-zA-Z ]{4,30}$/;
    let result = regex.test(strName);
    if(result){
        console.log('name valid')
        nameValid=true
        $('#namediv').removeClass('namediv');
        formValidation()
    }else{
        $('#namediv').addClass('namediv');
        nameValid=false
    }
}
//^([a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?)$
function validateEmail(strEmail){
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
    let result = regex.test(strEmail);
    if(result){
        console.log('mail valid')
        mailValid=true
        $('#maildiv').removeClass('maildiv');
        formValidation()
    }else{
        $('#maildiv').addClass('maildiv');
        mailValid=false
    }
}

function validatePhone(strPhone){

    var regex = /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let result = regex.test(strPhone);
    if(result){
        console.log('phonevalid')
        phoneValid=true
        $('#phonediv').removeClass('phonediv');
        formValidation()
    }else{
        $('#phonediv').addClass('phonediv');
        phoneValid=false
    }
}
function validateAge(strAge){
    if(strAge>=18 && strAge <100){
        console.log('age valid')
        ageValid=true
        $('#agediv').removeClass('agediv');
        formValidation()
    }else{
        $('#agediv').addClass('agediv');
        ageValid=false
    }
}
function validatePassword(strPass){
    if(strPass.length>=5){
        console.log('password valid')
        passValid=true
        $('#passdiv').removeClass('passdiv');
        formValidation()
    }else{
        $('#passdiv').removeClass('passdiv');
        passValid=false
    }
}
function validateConfirmPassword(strCPass){

    if(strCPass==document.getElementById('password').value){
        console.log('confirm password valid')
        cPassValid=true
        $('#cpassdiv').removeClass('cpassdiv');
        formValidation()
    }else{
        $('#cpassdiv').addClass('cpassdiv');
        cPassValid=false
    }
}