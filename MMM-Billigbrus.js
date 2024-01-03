Module.register("MMM-Billigbrus", {
    // Default module config.
    defaults: {
        updateInterval: 1, // default update interval in hours
        ean: "5000112637380", // default EAN number for Coca-Cola
    },

    // Define required styles.
    getStyles: function () {
        return ["MMM-Billigbrus.css"]; // add any CSS file required for styling
    },

    start: function () {
        var self = this;
        // Start the data retrieval process
        this.getData();
        // Schedule the data retrieval process to run at the defined update interval
        setInterval(function () {
            self.getData();
        }, this.config.updateInterval*3600000);
    },

    // Fetch data from the Kassal.app API
    getData: function () {
        var self = this;
        var url = `https://kassal.app/api/v1/products/ean/${this.config.ean}?size=100`;
        var headers = {
            Authorization: `Bearer ${this.config.apiKey}`,
        };

        var products = {
            1969: 1,
            191870: 15,
            191943: 10,
            191965: 1,
          };

        // Fetch data from the API
        fetch(url, { headers })
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                // Process the retrieved data
                if (data && data.data && data.data.products) {
                    var cheapest = data.data.products[0];

                    // Find the product with the lowest price using forEach
                    data.data.products.forEach(function (current) {

                        if(current.current_price){
                            current.current_pricepr = current.current_price.price / (products[1969] ? products[1969] : 1)
                            
                            if(current.current_pricepr < cheapest.current_pricepr){
                                cheapest = current;
                            } 
                        }
                    });

                    // Update the module with the lowest priced product details
                    self.lowestPriceProduct = cheapest;
                    self.updateDom();
                }
            })
            .catch(function (error) {
                console.error("Error fetching data:", error);
            });
    },

    // Override dom generator
    getDom: function () {
        var wrapper = document.createElement("div");
        if (this.lowestPriceProduct) {
            // Create elements to display the lowest priced product details
            var productName = document.createElement("div");
            productName.innerHTML = this.lowestPriceProduct.store.name;

            var productPrice = document.createElement("div");
            productPrice.innerHTML =
                "Price: " + this.lowestPriceProduct.current_price.price + " NOK";

            // Append elements to the wrapper
            wrapper.appendChild(productName);
            wrapper.appendChild(productPrice);
        } else {
            // Display a message when no data is available
            wrapper.innerHTML = "No data available";
        }
        return wrapper;
    },
});
