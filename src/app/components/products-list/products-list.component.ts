import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { ProductCardComponent } from "../product-card/product-card.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CommonModule,HttpClientModule, ProductCardComponent, FormsModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  providers: [ProductsService]
})
export class ProductsListComponent {
  products: any[] = [];

  constructor(private productsService: ProductsService) {
    this.productsService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  searchText: string = '';

  get searchProducts() {
    return this.products.filter(product =>
      (product.title && product.title.toLowerCase().includes(this.searchText.toLowerCase())) ||
      (product.shortDescription && product.shortDescription.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }

}
