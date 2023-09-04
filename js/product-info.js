
//Prueba:
const prodCatId = localStorage.getItem("prodCatID");
const URLinfo = `https://japceibal.github.io/emercado-api/products/${prodCatId}.json `
const URLcomment = `https://japceibal.github.io/emercado-api/products_comments/${prodCatId}.json`
let infoProduct // array con data global
let comments // array global
const container = document.getElementById("cont");

//solicitud para obtener la informacion de dicho producto(segun su catId) 
async function getInfoProduct() {
    const response = await fetch(URLinfo);
    if (!response.ok) throw new Error(`Code error:${response.status}`)
    const data = await response.json();
    console.log(data);
    //mejorar este detalle: obtener solamente el valor de la promesa con los datos que voy a utilizar en la funcion 

    const {name, currency,cost, description, category, soldCount,images} = data;
    
    showInfoProduct(name, currency,cost, description,category, soldCount,images)//que la funcion tenga un array u objeto de parametro

   
}
//solicitud para obtener la lista de comentarios
async function getCommentsProd() {
    const response = await fetch(URLcomment);
    if (!response.ok) throw new Error(`Code error:${response.status}`);
    const data = await response.json();
    console.log(data);
    

}
// presentarla en product-info.html
//mejorar codigo
function showInfoProduct(nam, curr, cost, description, cat, soldCount, imgs) {
    
     let template = 
            `
            <div>
              <h2 style="text-align:center" >${nam}</h2>
            </div>
            <div class="card-body">
             <p>Precio: <br> ${curr} ${cost}</p>
             <p>Descripcion <br>${description}</p>
             <p>Categoria <br>${cat}<p>
             <p>vendidos:${soldCount}<p>
            </div>
            <div class="card" >
            <p>Imagenes Ilustrativas</p>
            <img style="width:250px" src="${imgs[0]}" alt="Card image cap">
            <img style="width:250px"  src="${imgs[1]}" alt="Card image cap">
            <img style="width:250px" src="${imgs[2]}" alt="Card image cap">
            <img style="width:250px"  src="${imgs[3]}" alt="Card image cap">
            </div>
        `;
    container.innerHTML = template;
}



document.addEventListener("DOMContentLoaded", getInfoProduct());
getCommentsProd(); 