function CustomerViewModel() {

    //Make the self as 'this' reference
    var self = this;
    //Declare observable which will be bind with UI
    self.Id = ko.observable("");
    self.Name = ko.observable("");
    self.Address = ko.observable("");

    var Customer = {
        Id: self.Id,
        Name: self.Name,
        Address: self.Address
    };

    self.Customer = ko.observable();
    self.Customers = ko.observableArray(); // Contains the list of customers

    // Initialize the view-model
    $.ajax({
        url: 'Customers/GetAllCustomers',
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (data) {
            self.Customers(data); //Put the response in ObservableArray
        }
    });

    self.edit = function (Customer) {
        self.Customer(Customer);
    };

    self.delete = function (Customer) {
        self.Customer(Customer);
    };

    //Add New Item
    self.create = function () {
        if (Customer.Name() != "" &&
            Customer.Address() != "") {
            $.ajax({
                url: 'Customers/AddCustomer',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(Customer),
                success: function (data) {
                    self.Customers.push(data);
                    self.Name("");
                    self.Address("");
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

    // Delete Customer details
    self.deleteConfirm = function (Customer) {

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
        self.Name("");
        self.Address("");
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