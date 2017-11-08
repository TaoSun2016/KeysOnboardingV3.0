function StoreViewModel() {

    //Make the self as 'this' reference
    var self = this;
    //Declare observable which will be bind with UI
    self.Id = ko.observable("");
    self.Name = ko.observable("");
    self.Address = ko.observable("");

    var Store = {
        Id: self.Id,
        Name: self.Name,
        Address: self.Address
    };

    self.Store = ko.observable();
    self.Stores = ko.observableArray(); // Contains the list of customers

    // Initialize the view-model
    $.ajax({
        url: 'Stores/GetAllStores',
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (data) {
            self.Stores(data); //Put the response in ObservableArray
        }
    });

    self.edit = function (Store) {
        self.Store(Store);
    };

    self.delete = function (Store) {
        self.Store(Store);
    };

    //Add New Item
    self.create = function () {
        if (Store.Name() != "" &&
            Store.Address() != "") {
            $.ajax({
                url: 'Stores/AddStore',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(Store),
                success: function (data) {
                    self.Stores.push(data);
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

    // Delete Store details
    self.deleteConfirm = function (Store) {

        var id = Store.Id;

        $.ajax({
            url: 'Stores/DeleteStore/' + id,
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: id,
            success: function (data) {
                self.Stores.remove(Store);
            }
        }).fail(
            function (xhr, textStatus, err) {
                self.status(err);
            });
    }

    // Update product details
    self.update = function () {
        var Store = self.Store();
        $.ajax({
            url: 'Stores/EditStore',
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: ko.toJSON(Store),
            success: function (data) {
                self.Stores.removeAll();
                self.Stores(data); //Put the response in ObservableArray
                self.Store(null);
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
        self.Store(new StoreViewModel());
    });

    $("#myEditModal").on("hide", function () {
        self.Store(new StoreViewModel());
    });

    $("#myDeleteModal").on("hide", function () {
        self.Store(new StoreViewModel());
    });
}
ko.applyBindings(new StoreViewModel());