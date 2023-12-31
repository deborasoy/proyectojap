
//Prueba:
const prodCatId = localStorage.getItem("prodCatID");

const URLinfo = `https://japceibal.github.io/emercado-api/products/${prodCatId}.json `

const URLcomment = `https://japceibal.github.io/emercado-api/products_comments/${prodCatId}.json`

let infoProduct = []; // array con data global
let comments = []; // array global
const containerInfo = document.getElementById("cont");
 const containerComments = document.getElementById("contComments");

//solicitud para obtener la informacion de dicho producto(segun su catId) 
async function getInfoProduct() {
    const response = await fetch(URLinfo);
    if (!response.ok) throw new Error(`Code error:${response.status}`)
    const data = await response.json();
    //console.log(data)
    const { name, category, cost, currency, description, images } = data;
    infoProduct = data;
    console.log(infoProduct)
    showInfoProduct(infoProduct);
    showImg(infoProduct)

   
}
//solicitud para obtener la lista de comentarios
async function getCommentsProd() {
    const response = await fetch(URLcomment);
    if (!response.ok) throw new Error(`Code error:${response.status}`);
    const data = await response.json();
    //console.log(data[0].description);
    comments = data
    
    console.log(comments)
    console.log(comments[0])
    showComments(comments);
    

}
// presentarla en product-info.html
//Muestra informacion
function showInfoProduct(objet) {
    let template = 
            `
            <div>
              <h2 style="text-align:center" >${objet.name}</h2>
            </div>
            <div class="card-body">
             <p>Precio: <br> ${objet.currency} ${objet.cost}</p>
             <p>Descripcion <br>${objet.description}</p>
             <p>Categoria <br>${objet.category}<p>
             <p>vendidos:${objet.soldCount}<p>
            </div>
            
        `;
    containerInfo.innerHTML += template
  
}
//muestra las imagenes, dependiendo del largo del array o la cantidad de imagenes que contiene cuantas presenta
function showImg(objet) {
    let template = `<p>Imagenes Ilustrativas</p> `;
     const arrayImg = objet.images;

     for (let i= 0; i < arrayImg.length; i++) {
         const element = arrayImg[i];
           template+= 
            `
            <div class="card" >
            <img style="width:250px" src="${element}" alt="Card image cap">
            </div>
            `;
         }
    containerInfo.innerHTML += template
}
//muestra los comentarios 
function showComments(array) {

    let template = `<h2>Comentarios</h2>`;   
   for (let i= 0; i < array.length; i++) {
       const element = array[i];
       template += 
            `
             <div class="card-body">
             <p>${element.user} - ${element.dateTime} - ${element.score}</p>
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star"></span>
             <span class="fa fa-star"></span>
             <p>${element.description}</p>
            </div>
            `;
       }
    containerComments.innerHTML += template;
    
}
// cuando se simule el envío del comentario, intenta agregarlo cómo un comentario más de los mostrados referentes al producto.
const btn = document.getElementById("submit"); //boton submit
btn.addEventListener('click', (e) => {
    e.preventDefault();
    const comment = document.getElementById("opinion").value; //textarea
    const score = document.getElementById("puntuacion").value; //select
    let template = 'Comentario prueba' //aun no hice el login, por ello solo pongo los datos que puedo tomar, luego que lo haga llamo los datos del localstorage y puedo obtener el usuario que dio el comentario
    
   
     template = 
            `
             <div class="card-body">
             <p>Pepito- 5/03/2023- ${score}</p> //cambiar de string a number al mostrar en pantalla
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star checked"></span>
             <span class="fa fa-star"></span>
             <span class="fa fa-star"></span>
             <p>${comment}</p>
            </div>
            `;
    containerComments.innerHTML += template;





});


document.addEventListener("DOMContentLoaded", getInfoProduct());
getCommentsProd(); 