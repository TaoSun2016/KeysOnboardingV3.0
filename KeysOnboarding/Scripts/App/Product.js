ko.extenders.required = function (target, overrideMessage) {
    //add some sub-observables to our observable
    target.hasError = ko.observable();
    target.validationMessage = ko.observable();

    //define a function to do validation
    function validate(newValue) {
        target.hasError(newValue ? false : true);
        target.validationMessage(newValue ? "" : overrideMessage || "This field is required");
    }

    //initial validation
    validate(target());

    //validate whenever the value changes
    target.subscribe(validate);

    //return the original observable
    return target;
};


function ProductViewModel() {

    //Make the self as 'this' reference
    var self = this;
    //Declare observable which will be bind with UI
    self.Id = ko.observable("");
    self.Name = ko.observable("").extend({  required: ""});
    self.Price = ko.observable("").extend({ required: "" });

    self.OperationTitle = ko.observable("");


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

    self.edit = function (item) {
        self.Product(item);
    };

    self.delete = function (Product) {
        self.Product(Product);
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