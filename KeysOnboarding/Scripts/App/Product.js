

function ProductViewModel() {

    //Make the self as 'this' reference
    var self = this;
    //Declare observable which will be bind with UI
    self.Id = ko.observable("");
    self.Name = ko.observable("");
    self.Price = ko.observable("");

    self.OperationTitle = ko.observable("");

    var Product = {
        Id: self.Id,
        Name: self.Name,
        Price: self.Price,
    };

    self.Product = ko.observable();
    self.Products = ko.observableArray(); // Contains the list of products

    // Initialize the view-model
    $.ajax({
        url: 'Products/GetAllProducts',
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (data) {
            self.Products(data); //Put the response in ObservableArray
        }
    });

    $("#btnCreate").click(function (event) {
        //self.OperationTitle("Create New Prodcut");
        //$("#modal-content").empty();
        //$("#modal-content").append($(".createUI").show());
    });

    self.edit = function (Product) {

        self.Product(Product);
        //self.OperationTitle("Edit Product");
        //$("#modal-content").empty();
        //$("#modal-content").append($(".editUI").show());
    };

    self.delete = function (Product) {
        //self.OperationTitle("Delete Prodcut");
        //$("#modal-content").empty();
        //$("#modal-content").append($(".deleteUI").show());
        self.Product(Product);
        alert(self.Product().Id);
        alert(self.Product().Name);
        alert(self.Product().Price);
    };

    //Add New Item
    self.create = function () {
        if (Product.Name() != "" &&
            Product.Price() != "") {
            $.ajax({
                url: 'Products/AddProduct',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(Product),
                success: function (data) {
                    self.Products.push(data);
                    self.Name("");
                    self.Price("");
                }
            }).fail(
                function (xhr, textStatus, err) {
                    alert(err);
                });
        }
        else {
            alert('Please Enter All the Values !!');
        }
    }

    // Delete product details
    self.deleteConfirm = function (Product) {

        var id = Product.Id;

        $.ajax({
            url: 'Products/DeleteProduct/' + id,
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: id,
            success: function (data) {
                self.Products.remove(Product);
            }
        }).fail(
            function (xhr, textStatus, err) {
                self.status(err);
            });
    }

    // Update product details
    self.update = function () {
        var Product = self.Product();
        console.log("[" + ko.toJSON(Product)+"]");
        $.ajax({
            url: 'Products/EditProduct',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(Product),
            success: function (data) {
                self.Products.removeAll();
                self.Products(data); //Put the response in ObservableArray
                self.Product(null);
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
        self.Name("");
        self.Price("");
    }

    // Cancel product details
    self.cancel = function () {
        //self.Product(new ProductViewModel());
    }

    $("#myCreateModal").on("hide", function () {
        self.Product(new ProductViewModel());
    });

    $("#myEditModal").on("hide", function () {
        self.Product(new ProductViewModel());
    });

    $("#myDeleteModal").on("hide", function () {
        self.Product(new ProductViewModel());
    });
}
ko.applyBindings(new ProductViewModel());