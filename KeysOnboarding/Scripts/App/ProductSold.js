$(function () {
    $("#datepicker").datepicker();
});
function ProductSoldViewModel() {

    //Make the self as 'this' reference
    var self = this;
    self.DateSold = ko.observable("");

    self.ProductSoldDetail = ko.observable();
    self.ProductSoldDetails = ko.observableArray();

    self.ProductList = ko.observableArray();
    self.CustomerList = ko.observableArray();
    self.StoreList = ko.observableArray();

    self.SelectedProduct = ko.observable();
    self.SelectedCustomer = ko.observable();
    self.SelectedStore = ko.observable();

    // Initialize the view-model
    $.ajax({
        url: 'ProductSolds/GetAllProductSolds',
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (data) {
            self.ProductSoldDetails(data); //Put the response in ObservableArray
        }
    });

    self.dropdownList = function () {
        $.ajax({
            url: 'Products/GetAllProducts',
            cache: false,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: {},
            success: function (data) {
                self.ProductList(data); //Put the response in ObservableArray
            }
        });

        $.ajax({
            url: 'Customers/GetAllCustomers',
            cache: false,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: {},
            success: function (data) {
                self.CustomerList(data); //Put the response in ObservableArray
            }
        });

        $.ajax({
            url: 'Stores/GetAllStores',
            cache: false,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: {},
            success: function (data) {
                self.StoreList(data); //Put the response in ObservableArray
            }
        });
    }

    self.edit = function (ProductSoldDetail) {
        self.dropdownList();
    };

    self.delete = function (ProductSoldDetail) {
        //self.Customer(Customer);
    };

    //Add New Item
    self.create = function () {
        self.ProductSoldDetail({
            ProductId: self.SelectedProduct().Id,
            CustomerId: self.SelectedCustomer().Id,
            StoreId: self.SelectedStore().Id,
            DateSold: self.DateSold,
            Product: self.SelectedProduct(),
            Customer: self.SelectedCustomer(),
            Store: self.SelectedStore()
        });

        $.ajax({
            url: 'ProductSolds/AddProductSold',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(self.ProductSoldDetail),
            success: function (data) {
                self.ProductSoldDetails.push(data);
                self.SelectedProduct(null);
                self.SelectedCustomer(null);
                self.SelectedStore(null);
                self.DateSold('');
            }
        }).fail(
            function (xhr, textStatus, err) {
                alert(err);
            });

    }

 
    // Delete Customer details
    self.deleteConfirm = function (ProductSoldDetail) {

        var id = Customer.Id;

        $.ajax({
            url: 'Customers/DeleteCustomer/' + id,
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: id,
            success: function (data) {
                self.Customers.remove(Customer);
            }
        }).fail(
            function (xhr, textStatus, err) {
                self.status(err);
            });
    }

    // Update product details
    self.update = function () {
        var Customer = self.Customer();
        $.ajax({
            url: 'Customers/EditCustomer',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(Customer),
            success: function (data) {
                self.Customers.removeAll();
                self.Customers(data); //Put the response in ObservableArray
                self.Customer(null);
                alert("Record Updated Successfully");
            }
        })
            .fail(
            function (xhr, textStatus, err) {
                alert(err);
            });
    }

    // Reset product details
    self.reset = function () {
    }

    $("#myCreateModal").on("hide", function () {


        self.SelectedProduct = null;
        self.SelectedCustomer = null;
        self.SelectedStore = null;
        self.DateSold = null;
    });

    $("#myEditModal").on("hide", function () {
        self.Customer(new ProductSoldViewModel());
    });

    $("#myDeleteModal").on("hide", function () {
        self.Customer(new ProductSoldViewModel());
    });
}
ko.applyBindings(new ProductSoldViewModel());