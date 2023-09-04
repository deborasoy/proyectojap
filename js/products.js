const prodContainer = document.getElementById("productContainer"); //Elemento div, que contendra los productos 
const categoryCatId = localStorage.getItem("catID"); //acceder al catID creado en categories.js y guardarlo en una variable

const URL = `https://japceibal.github.io/emercado-api/cats_products/${categoryCatId}.json` //categoryCatID va cambiando segun la interacion del usario, como esta indicado en el index.js, accede al catID que creamos segun la categoria de productos

const prodTitle = document.getElementById("prodTitle"); //h2 
const pageTitle = document.getElementById("pageTitle"); //title
//valor para los filtros
let minCount = 0; 
let maxCount = Infinity;
let productsDataGlobal = [] // Contendrá el array de productos disponible para usar globalmente en caso de que el fetch los traiga correctamente.


async function getProducts() {

    const response = await fetch(URL);
    if (!response.ok) throw new Error(`Code error:${response.status}`);
    const data = await response.json();
    const { products, catName } = data;
   // console.log(products);
    //console.log(data)
    //console.log(catName)


    showProducts(products);

     prodTitle.innerHTML = catName;
    pageTitle.innerHTML = `eMercado - ${catName}`;

    productsDataGlobal = products; //contenido array global
    
    
}

function showProducts(arrayProduct) {
    
       const filteredProducts = arrayProduct.filter(product => product.soldCount >= minCount && product.soldCount <= maxCount); // de utilidad para los filtros

    let template = ``;
    
    for (let product of filteredProducts) {
        template += 
            `
            <div onclick="setProdCatID(${product.id})"  class="col-12 col-md-4 col-xxl-3 d-flex mt-5">
                <div class="card" >
                    <img class="card-img-top" src="${product.image}" alt="Card image cap">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p>${product.currency} ${product.cost}</p>
                        <p class="card-text">Detalles del producto:<br>${product.description}</p>
                        </div>
                        <ul class="list-group list-group-flush">
                        <li class="list-group-item">vendidos:${product.soldCount}</li>
                        </ul>
                    <div class="card-footer">
                        <a href="#" class="btn btn-primary">Comprar ahora</a>
                    </div>
                </div>
            </div>
        `;
    }
    prodContainer.innerHTML = template; 
  

}
 //el usuario selecciona un producto, su identificador se guarde en el almacenamiento local y se redirije a product-info.html. setProdCatID(value) da funcionalidad al evento onclick en el div de las tarjetas (card) por cada producto. Creado en el template de showProducts()
 function setProdCatID(value){
        localStorage.setItem("prodCatID", value);
        window.location = "product-info.html"
     }


document.addEventListener("DOMContentLoaded", getProducts());
//${product.description},  onmouseover="showDescription()" poder mostar solo si el usuario lo desea al posicionarse sobre, el texto en la etiqueta p "Detalles del producto"

/*Aplicar filtros a partir de rango de precio definido.
Agregar las funcionalidades de orden ascendente y descendente en función del precio y descendente en función de la relevancia (tomaremos para ello la cantidad de artículos vendidos)*/

/*incorpora un campo de texto buscador <input type="search">, que filtre en tiempo real (el evento input te será de ayuda) según el texto que se ingresa en dicho campo.
Incluye en la búsqueda el texto en el título y en la descripción de los artículos.*/


