var nullStore = {
    Id: '',
    Name: '',
    Address: ''
};

function StoreViewModel(data) {
    self = this;
    self.Id = data.Id;
    self.Name = ko.observable(data.Name).extend({
        required: {
            params: true,
            message: "Please input store's name!"
        }
    });

    self.Address = ko.observable(data.Address).extend({
        required: {
            params: true,
            message: "Please input store's address!"
        }
    });

    self.ModelErrors = ko.validation.group(self);
    self.IsValid = ko.computed(function () {
        self.ModelErrors.showAllMessages();
        return self.ModelErrors().length == 0;
    });

};
function StoresViewModel() {

    var self = this;

    self.Store = ko.observable();
    self.Stores = ko.observableArray();

    // Initialize the view-model
    $.ajax({
        url: 'Stores/GetAllStores',
        cache: false,
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        data: {},
        success: function (data) {
            self.Stores(data);
        }
    });

    self.showAddUI = function () {
        self.Store(new StoreViewModel(nullStore));
    }

    self.showEditUI = function (store) {
        self.Store(new StoreViewModel(store));
    };

    self.showDeleteUI = function (store) {
        self.Store(store);
    };

    //Add New Item
    self.create = function () {
        if (self.Store().Name() != "" &&
            self.Store().Address() != "") {
            $.ajax({
                url: 'Stores/AddStore',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(self.Store),
                success: function (data) {
                    self.Stores.push(data);
                    self.Store(new StoreViewModel(nullStore));
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

    // Update product details
    self.update = function () {
        if (self.Store().Name() != "" &&
            self.Store().Address() != "") {
            $.ajax({
                url: 'Stores/EditStore',
                cache: false,
                type: 'POST',
                contentType: 'application/json; charset=utf-8',
                data: ko.toJSON(self.Store),
                success: function (data) {
                    self.Stores.removeAll();
                    self.Stores(data); 
                    self.Store(new StoreViewModel(nullStore));
                    alert("Record Updated Successfully");
                    $('#myEditModal').modal('hide');
                }
            }).fail(
                function (xhr, textStatus, err) {
                    alert(err);
                });
        }
        else {
            // alert('Please Enter All the Values !!');
        }
    }

    // Delete Store details
    self.delete = function (store) {
        var id = store.Id;
        $.ajax({
            url: 'Stores/DeleteStore/' + id,
            cache: false,
            type: 'POST',
            contentType: 'application/json; charset=utf-8',
            data: id,
            success: function (data) {
                self.Stores.remove(store);
            }
        }).fail(
            function (xhr, textStatus, err) {
                self.status(err);
            });
    }


}
ko.applyBindings(new StoresViewModel());