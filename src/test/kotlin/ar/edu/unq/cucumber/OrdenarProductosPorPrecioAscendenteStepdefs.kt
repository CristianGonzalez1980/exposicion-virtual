package ar.edu.unq.cucumber

import ar.edu.unq.dao.mongodb.MongoProductoDAOImpl
import ar.edu.unq.dao.mongodb.MongoProveedorDAOImpl
import ar.edu.unq.modelo.Producto
import ar.edu.unq.modelo.Proveedor
import ar.edu.unq.services.ProductoService
import ar.edu.unq.services.ProveedorService
import ar.edu.unq.services.impl.ProductoServiceImpl
import ar.edu.unq.services.impl.ProveedorServiceImpl
import ar.edu.unq.services.runner.DataBaseType
import cucumber.api.java.en.Given
import cucumber.api.java.en.Then
import cucumber.api.java.en.When
import org.junit.Assert

class OrdenarProductosPorPrecioAscendenteStepdefs {

    private val productoService: ProductoService = ProductoServiceImpl(MongoProveedorDAOImpl(), MongoProductoDAOImpl(), DataBaseType.TEST)
    private val proveedorService: ProveedorService = ProveedorServiceImpl(MongoProveedorDAOImpl(), DataBaseType.TEST)
    private lateinit var productosOrdenados: MutableList<Producto>

    val proveedorA = Proveedor("AA", "data:image/jpeg;base64,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", "https://www.facebook.com/GibsonES/", "https://www.instagram.com/gibsonguitar/?hl=es-la", "https://www.gibson.com/")

    @Given("^una base de datos con seis productos cuyos precios son: (\\d+), (\\d+), (\\d+), (\\d+), (\\d+), (\\d+)$")
    fun unaBaseDeDatosConSeisProductosCuyosPreciosSon(precioA: Int, precioB: Int, precioC: Int, precioD: Int, precioE: Int, precioF: Int) {
        val productoA = Producto(proveedorA.id, "prod1", "A electric guitar", 7, precioA, 800000)
        val productoB = Producto(proveedorA.id, "prod2", "A electric guitar", 7, precioB, 800000)
        val productoC = Producto(proveedorA.id, "prod3", "A electric guitar", 7, precioC, 800000)
        val productoD = Producto(proveedorA.id, "prod4", "A electric guitar", 7, precioD, 800000)
        val productoE = Producto(proveedorA.id, "prod5", "A electric guitar", 7, precioE, 800000)
        val productoF = Producto(proveedorA.id, "prod6", "A electric guitar", 7, precioF, 800000)
        proveedorA.addProduct(productoA)
        proveedorA.addProduct(productoB)
        proveedorA.addProduct(productoC)
        proveedorA.addProduct(productoD)
        proveedorA.addProduct(productoE)
        proveedorA.addProduct(productoF)
        proveedorService.crearProveedor(proveedorA)
    }

    @When("^ordeno los productos por precios en ascendentemente$")
    fun ordenoLosProductosPorPreciosEnAscendentemente() {
        this.productosOrdenados = productoService.recuperarATodosLosProductos().sortedBy { it.itemPrice }.toMutableList()
    }

    @Then("^obtengo los productos ordenados por precio$")
    fun obtengoLosProductosOrdenadosPorPrecio() {
        val productoRecuperados = proveedorService.recuperarProveedor(proveedorA.id.toString()).productos.sortedBy { it.itemPrice }
        Assert.assertEquals(productoRecuperados, this.productosOrdenados)
    }

    @cucumber.api.java.After
    fun clear() {
        productoService.deleteAll()
        proveedorService.deleteAll()
    }
}