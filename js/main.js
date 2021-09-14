


// //===========================AJAX=========================

// var http = new XMLHttpRequest();
// var data=[]; //array of data

// http.open("GET","https://forkify-api.herokuapp.com/api/search?q=pizza")
// http.send();

// http.addEventListener("readystatechange",function(){
//     if(http.readyState==4 && http.status==200)
//     data  = JSON.parse(http.response);
//     data  =data.recipes;
//     display()

//     links.forEach(item => {
//         item.addEventListener('click',epoint => {
//                 http.open("GET",`https://forkify-api.herokuapp.com/api/search?q=${epoint.target.innerText}`)
//         http.send();
    
//         http.addEventListener("readystatechange",function(){
//             if(http.readyState==4 && http.status==200)
//             data  = JSON.parse(http.response);
//             data  =data.recipes;
//             display()
//         })
//                // console.log(epoint.target.innerText);
//             })
//       });
    
// })

// console.log(data)

// //===================end of AJAX=============================



//===================================================================
//===================================================================
//===================================================================
//===================================================================
//===================================================================



//===========================AJAX=========================

var links=document.querySelectorAll(".nav-link");
var curerntLoc;


links.forEach(item => {
            item.addEventListener('click',epoint => {
                   var currentMeal=epoint.target.innerText;
                   getRecipes(currentMeal)
                })
          });

var data=[]; //array of data


getRecipes('pizza');

function getRecipes(meal){
    var http = new XMLHttpRequest();
    http.open("GET",`https://forkify-api.herokuapp.com/api/search?q=${meal}`)
    http.send();

    http.addEventListener("readystatechange",function(){
        if(http.readyState==4 && http.status==200)
        data  = JSON.parse(http.response).recipes;
     
    display()
    })

}




//===================end of AJAX=============================


function display(){
    var cols=``;
    for(var i=0; i<data.length ;i++){
        curerntLoc=i;
        cols += `
        <div class="col-md-3 mb-2 ">     
            <div class"">
                <img class="w-100" src='${data[i].image_url}' alt="">
                <h5>${data[i].title}</h5>
                <a class="btn btn-warning" target="_blank" href="${data[i].source_url}">Source</a>
                <a class="btn btn-primary detail" style="cursor:pointer"  onclick="getDetails(${data[i].recipe_id})"data-bs-toggle="modal" data-bs-target="#exampleModal">Details</a>
                
                </div>  

            </div>
        `;
    }

    document.getElementById("newRow").innerHTML=cols;
}

//============================================================

 async function getDetails(recId){

    var recDetails= await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recId}`);

    var response = await recDetails.json();

    var x=response.recipe.ingredients;
    x=x.toString().replaceAll(",","\n");
    //x=x.replaceAll(",", "\n");

    document.querySelector(".modal-body").innerHTML=`
         <img class="single-recipe w-100" src="${response.recipe.image_url}" alt="">
         <pre>${x}</pre>
            `;

    //console.log(x)
}



