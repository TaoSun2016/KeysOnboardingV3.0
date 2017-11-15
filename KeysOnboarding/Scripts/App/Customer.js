var nullCustomer = {
    Id: '',
    Name: '',
    Address: ''
};

function CustomerViewModel(data) {
    self = this;
    self.Id = data.Id;
    self.Name = ko.observable(data.Name).extend({
        required: {
            params: true,
            message: "Please input customer's name!"
        }
    });

    self.Address = ko.observable(data.Address).extend({
        required: {
            params: true,
            message: "Please input customer's address!"
        }
    });

    self.ModelErrors = ko.validation.group(self);
    self.IsValid = ko.computed(function () {
        self.ModelErrors.showAllMessages();
        return self.ModelErrors().length == 0;
    });

};

function CustomersViewModel() {

    var self = this;

    self.Customer = ko.observable();
    self.Customers = ko.observableArray();


    $.ajax({
        url: 'Customers/GetAllCustomers',
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (data) {
            self.Customers(data);
        }
    });

    self.showAddUI = function () {
        self.Customer(new CustomerViewModel(nullCustomer));
    }

    self.showEditUI = function (customer) {
        self.Customer(new CustomerViewModel(customer));
    };

    self.showDeleteUI = function (customer) {
        self.Customer(customer);
    };

    //Add new customer
    self.create = function () {
        if (self.Customer().Name() != "" &&
            self.Customer().Address() != "") {
            $.ajax({
                url: 'Customers/AddCustomer',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(self.Customer),
                success: function (data) {
                    self.Customers.push(data);
                    self.Customer(new CustomerViewModel(nullCustomer));
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

    //Update customer detail
    self.update = function () {
        if (self.Customer().Name() != "" &&
            self.Customer().Address() != "") {
            $.ajax({
                url: 'Customers/EditCustomer',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(self.Customer),
                success: function (data) {
                    self.Customers.removeAll();
                    self.Customers(data);
                    self.Customer(new CustomerViewModel(nullCustomer));
                    $('#myEditModal').modal('hide');
                }
            })
                .fail(
                function (xhr, textStatus, err) {
                    alert(err);
                });
        }
        else {
            
        }
    }

    //Delete customer
    self.delete = function (customer) {
        var id = customer.Id;
        $.ajax({
            url: 'Customers/DeleteCustomer/' + id,
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: id,
            success: function (data) {
                self.Customers.remove(customer);
            }
        }).fail(
            function (xhr, textStatus, err) {
                self.status(err);
            });
    }

}
ko.applyBindings(new CustomersViewModel());