package ar.edu.unq.modelo

import com.fasterxml.jackson.databind.util.ArrayBuilders.addToList
import java.util.ArrayList

class Expo(
        var companyId: Int = 0,
        var productId: Int = 0,
        var bannerId: Int = 0,
        val companies: MutableList<Proveedor> = mutableListOf(),
        var banners: MutableList<Banner> = mutableListOf()
) {
    fun setCompanyId() = ++companyId
    fun setProductId() = ++productId
    fun setBannerId() = ++bannerId
    fun addCompany(company: Proveedor) = addToList(companies, company)
    fun addBanner(banner: Banner) = addToList(banners, banner)
    fun removeBanner(id: String) = banners.removeIf { it.id.toString() == id }
    fun removeSupplier(id: String) = companies.removeIf { it.id.toString() == id }
    fun updateCompanyWithId(id: String, company: Proveedor) {
        companies.removeIf { it.id.toString() == id }
        companies.add(company)
    }

    fun updateProductWithId(id: String, newProduct: Producto) {
/*        var products: List<Product> = this.makeListFromListofList(companies.map { it.productos })!!
        var productsFiltrados: MutableList<Product> = products.filterNot { it.id.toString() == id }!!.toMutableList()
        productsFiltrados.add(newProduct)*/
        var company = companies.find { it.id.toString() == newProduct.idProveedor.toString() }
        company!!.productos.filterNot { it.id.toString() == id }
        company.productos.add(newProduct)
        this.updateCompanyWithId(company.id.toString(), company)
    }

    fun removeProduct(id: String) {
        var products: List<Producto> = this.makeListFromListofList(companies.map { it.productos })!!
        var product: Producto = products.find { it.id.toString() == id }!!
        var idProveedor = product.idProveedor
        var company = companies.find { it.id.toString() == idProveedor.toString() }
        this.updateCompanyWithId(
            product.idProveedor.toString(),
            Proveedor(
                idProveedor,
                company!!.companyName,
                company!!.companyImage,
                company!!.facebook,
                company!!.instagram,
                company!!.web,
                company!!.productos.filterNot { it.id.toString() == id }.toMutableList()
            )
        )
    }

    fun addProduct(product: Producto) {
        var company = companies.find { it.id.toString() == product.idProveedor.toString() }
        company!!.productos.add(product)
        //this.updateCompanyWithId(product.idProveedor.toString(), Company(product.idProveedor, company!!.nombreDeEmpresa, company!!.imagenDeLaEmpresa, company!!.facebook, company!!.instagram, company!!.web, company!!.productos.filterNot { it.id.toString() == id }.toMutableList()) )
    }

    fun getProduct(id: String): Producto {
        var products: List<Producto> = this.makeListFromListofList(companies.map { it.productos })!!
        var product: Producto= products.find { it.id.toString() == id }!!
        return product
    }

    fun <E> makeListFromListofList(iter: List<List<E>>): List<E>? {
        val list: MutableList<E> = ArrayList()
        for (item in iter) {
            item.forEach { list.add(it) }
        }
        return list
    }
}