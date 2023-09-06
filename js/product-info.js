
//Prueba:
const prodCatId = localStorage.getItem("prodCatID");
const URLinfo = `https://japceibal.github.io/emercado-api/products/${prodCatId}.json `
const URLcomment = `https://japceibal.github.io/emercado-api/products_comments/${prodCatId}.json`
let infoProduct = []; // array con data global
let comments // array global
const container = document.getElementById("cont");

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

   
}
//solicitud para obtener la lista de comentarios
async function getCommentsProd() {
    const response = await fetch(URLcomment);
    if (!response.ok) throw new Error(`Code error:${response.status}`);
    const data = await response.json();
    //console.log(data);
    

}
// presentarla en product-info.html
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
            <div class="card" >
            <p>Imagenes Ilustrativas</p>
            <img style="width:250px" src="${objet.images[0]}" alt="Card image cap">
            <img style="width:250px"  src="${objet.images[1]}" alt="Card image cap">
            <img style="width:250px" src="${objet.images[2]}" alt="Card image cap">
            <img style="width:250px"  src="${objet.images[3]}" alt="Card image cap">
            </div>
        `;
    container.innerHTML = template;
}



document.addEventListener("DOMContentLoaded", getInfoProduct());
getCommentsProd(); 