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

    self.DefaultProduct = ko.observable();
    self.DefaultCustomer = ko.observable();
    self.DefaultStore = ko.observable();

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
                console.log("self.ProductList=" + self.ProductList().length);
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

    self.edit = function (detail) {

        $.ajax({
            url: 'Products/GetAllProducts',
            cache: false,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: {},
            success: function (data) {
                self.ProductList(data); //Put the response in ObservableArray
                //self.SelectedProduct = ko.observable(ko.utils.arrayFirst(self.ProductList(), function (item) {
                //return item.Id == detail.Product.Id;
                //}));
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
                //self.SelectedCustomer = ko.observable(ko.utils.arrayFirst(self.CustomerList(), function (item) {
                //    return item.Id == detail.Customer.Id;
                //}));
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
                //self.SelectedStore = ko.observable(ko.utils.arrayFirst(self.StoreList(), function (item) {
                //    return item.Id == detail.Store.Id;
                //}));
            }
        });

        self.DateSold(detail.DateSold);    

        self.ProductSoldDetail(detail);
    };

    self.delete = function (detail) {
        self.ProductSoldDetail(detail);
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
    self.deleteConfirm = function () {
        var id = self.ProductSoldDetail().Id;
        $.ajax({
            url: 'ProductSolds/DeleteProductSold/' + id,
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: id,
            success: function (data) {               
                self.ProductSoldDetails.remove(self.ProductSoldDetail());
                console.log(self.ProductSoldDetail().Id);
            }
        }).fail(
            function (xhr, textStatus, err) {
                self.status(err);
            });
    }

    // Update product details
    self.update = function () {
        var id = self.ProductSoldDetail().Id;
        self.ProductSoldDetail({
            Id: id,
            ProductId: self.SelectedProduct().Id,
            CustomerId: self.SelectedCustomer().Id,
            StoreId: self.SelectedStore().Id,
            DateSold: self.DateSold(),
            Product: self.SelectedProduct(),
            Customer: self.SelectedCustomer(),
            Store: self.SelectedStore()
        });

        $.ajax({
            url: 'ProductSolds/EditProductSold',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(self.ProductSoldDetail),
            success: function (data) {
                self.ProductSoldDetails.removeAll();
                self.ProductSoldDetails(data); //Put the response in ObservableArray
                self.ProductSoldDetail(null);
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
        self.SelectedProduct(null);
        self.SelectedCustomer(null);
        self.SelectedStore(null);
        self.DateSold(null);
        self.ProductSoldDetail(null);
    }
    self.cancel = function () {
        self.SelectedProduct(null);
        self.SelectedCustomer(null);
        self.SelectedStore(null);
        self.DateSold(null);
        self.ProductSoldDetail(null);
    }

    $("#myCreateModal").on("hide", function () {

        self.ProductSoldDetail(new ProductSoldViewModel());
    });

    $("#myEditModal").on("hide", function () {
        self.ProductSoldDetail(new ProductSoldViewModel());
    });

    $("#myDeleteModal").on("hide", function () {
        self.ProductSoldDetail(new ProductSoldViewModel());
    });
}
ko.applyBindings(new ProductSoldViewModel());