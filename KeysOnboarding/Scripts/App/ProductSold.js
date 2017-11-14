$(function () {
    $("#datepicker1").datepicker();
    $("#datepicker2").datepicker();
});

var nullProductSold = {
    //Id: '',
    //ProductId: '',
    //CustomerId: '',
    //StoreId: '',
    //Product: '',
    //Customer: '',
    //Store: '',
    //DataSold: ''
};
function ProductSoldViewModel(data) {
    var self = this;

        self.Id = data.Id ;
        self.ProductId = ko.observable(data.ProductId) ;
        self.CustomerId = ko.observable(data.CustomerId);
        self.StoreId = ko.observable(data.StoreId);
        self.Product = ko.observable(data.Product);
        self.Customer = ko.observable(data.Customer);
        self.Store = ko.observable(data.Store);
        self.DateSold = ko.observable(data.DateSold);
    
};


function ProductSoldsViewModel() {

    //Make the self as 'this' reference
    var self = this;


    self.ProductSold = ko.observable();
    self.ProductSolds = ko.observableArray();

    self.ProductList = ko.observableArray();
    self.CustomerList = ko.observableArray();
    self.StoreList = ko.observableArray();

    self.SelectedProduct = ko.observable();
    self.SelectedCustomer = ko.observable();
    self.SelectedStore = ko.observable();

    init();


    self.showAddUI = function () {
        self.ProductSold(new ProductSoldViewModel(nullProductSold));
    }

    self.showEditUI = function (detail) {

        self.ProductSold(detail);

        var product = ko.utils.arrayFirst(self.ProductList(), function (item) {
            return item.Id == detail.ProductId;
        });
        self.SelectedProduct(product);

        var customer = ko.utils.arrayFirst(self.CustomerList(), function (item) {
            return item.Id == detail.CustomerId;
        });
        self.SelectedCustomer(customer);

        var store = ko.utils.arrayFirst(self.StoreList(), function (item) {
            return item.Id == detail.StoreId;
        });
        self.SelectedStore(store);
    };

    self.showDeleteUI = function (detail) {
        self.ProductSold(detail);
    };

    //Add New Item
    self.create = function () {

        self.ProductSold().ProductId = self.SelectedProduct().Id;
        self.ProductSold().Product = self.SelectedProduct();
        self.ProductSold().CustomerId = self.SelectedCustomer().Id;
        self.ProductSold().Customer = self.SelectedCustomer();
        self.ProductSold().StoreId = self.SelectedStore().Id;
        self.ProductSold().Store = self.SelectedStore();

        $.ajax({
            url: 'ProductSolds/AddProductSold',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(self.ProductSold),
            success: function (data) {
                self.ProductSolds.push(data);
                self.SelectedProduct(null);
                self.SelectedCustomer(null);
                self.SelectedStore(null);
                self.ProductSold(new ProductSoldViewModel(nullProductSold));
            }
        }).fail(
            function (xhr, textStatus, err) {
                alert(err);
            });

    }

    // Update product details
    self.update = function () {

        self.ProductSold().ProductId=self.SelectedProduct().Id;
        self.ProductSold().Product=self.SelectedProduct();
        self.ProductSold().CustomerId=self.SelectedCustomer().Id;
        self.ProductSold().Customer=self.SelectedCustomer();
        self.ProductSold().StoreId=self.SelectedStore().Id;
        self.ProductSold().Store=self.SelectedStore();

        $.ajax({
            url: 'ProductSolds/EditProductSold',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(self.ProductSold),
            success: function (data) {
                self.ProductSolds.removeAll();
                self.ProductSolds(data); 
                self.ProductSold(new ProductSoldViewModel(nullProductSold));
                alert("Record Updated Successfully");
            }
        })
            .fail(
            function (xhr, textStatus, err) {
                alert(err);
            });
    }

    // Delete Customer details
    self.delete = function () {
        var id = self.ProductSold().Id;
        $.ajax({
            url: 'ProductSolds/DeleteProductSold/' + id,
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: id,
            success: function (data) {
                self.ProductSolds.remove(self.ProductSold());
            }
        }).fail(
            function (xhr, textStatus, err) {
                self.status(err);
            });
    }



    function init() {
        $.ajax({
            url: 'ProductSolds/GetAllProductSolds',
            cache: false,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: {},
            success: function (data) {
                self.ProductSolds(data);
            }
        });


        $.ajax({
            url: 'Products/GetAllProducts',
            cache: false,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: {},
            success: function (data) {
                self.ProductList(data);
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

        $.ajax({
            url: 'Customers/GetAllCustomers',
            cache: false,
            type: 'GET',
            contentType: 'application/json; charset=utf-8',
            data: {},
            success: function (data) {
                self.CustomerList(data);
            }
        });

    }
}
ko.applyBindings(new ProductSoldsViewModel());
