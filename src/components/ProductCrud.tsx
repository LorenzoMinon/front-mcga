// src/components/ProductCrud.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IProduct } from './ProductTypes'; // Importa la interfaz IProduct

const ProductCrud: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [newProduct, setNewProduct] = useState<IProduct>({
    _id: '',
    name: '',
    description: '',
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<IProduct[]>('http://localhost:3000/api/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    try {
      const response = await axios.post<IProduct>('http://localhost:3000/api/product', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({
        _id: '',
        name: '',
        description: '',
        price: 0,
        stock: 0,
      });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h1>CRUD de Productos</h1>

      <div>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={newProduct.name}
          onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Descripción"
          value={newProduct.description}
          onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Precio"
          value={newProduct.price}
          onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Stock"
          value={newProduct.stock}
          onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value, 10) })}
        />
        <button onClick={handleAddProduct}>Agregar Producto</button>
      </div>

      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCrud;
