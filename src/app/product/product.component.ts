import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit{


  //private http:HttpClient;
  //injection des dependences
//  constructor(http:HttpClient) {
 //   this.http=http;
//  }
  //Autre simple method d injection de dependence
  constructor(private productService:ProductService,private router:Router,public appState:AppStateService) {
  }
  ngOnInit(){
   this.searchProducts();
  }

  searchProducts() {
    /*
this.appState.setProductState(
  {
    status:"LOADING"
  }
);*/
    //on envoie une requette http de type get
    this.productService.searchProducts(this.appState.productState.keyword,this.appState.productState.currentPage,this.appState.productState.pageSize)
      .subscribe({
        //moi j attend comme resultat un tableu de type any
        next:(resp)=>{
          let products=resp.body as Product[];
          let totalProducts:number=parseInt(resp.headers.get("x-total-count")!);
          //this.appState.productState.totalProducts=totalProducts
          let totalPages= Math.floor(totalProducts/this.appState.productState.pageSize);
          //si la division genere un reste on doit ajouter une page
          if(totalProducts%this.appState.productState.pageSize!=0){
            ++totalPages;
          }
          this.appState.setProductState({
          products:products,
            totalProducts:totalProducts,
            totalPages:totalPages,
            status:"LOADED"
          })
        },
        error:err=>{
          this.appState.setProductState({
            status:"ERROR",
            errorMessage:err
          })
        }
      })

    //this.products=this.productService.getProducts();
  }

  handleCheckProduct(product: Product) {
    this.productService.checkProduct(product).subscribe({
      next:updatedProduct=>{
             product.checked=!product.checked;
      }
    })
  }

  handleDelete(product: Product) {
    if (confirm("Are you sure to delete this product?"))
    this.productService.deleteProduct(product).subscribe({
      next:value => {
        //this.getProducts();//mettre a jour le front-end une fois supprimer un prodcut
      //this.appState.productState.products=this.appState.productState.products.filter((p:any)=>p.id!==product.id);
        this.searchProducts();
      }
    })
  }


  handleGotoPage(page: number) {
    this.appState.productState.currentPage=page;
    this.searchProducts();
  }

  handleEdit(product: Product) {
   this.router.navigateByUrl(`/editProduct/${product.id}`);
  }
}
