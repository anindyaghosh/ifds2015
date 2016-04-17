// Shopping Cart functions

var shoppingCart = {};
shoppingCart.cart = [];
shoppingCart.Item = function(name, price, count) {
	this.name=name
	this.price=price
	this.count=count
};

shoppingCart.addItemToCart = function(name, price, count) {
	for (var i in this.cart) {
		if (this.cart[i].name === name) {
			this.cart[i].count += count;
			this.saveCart();
			return;
		}
	}
	var item = new this.Item(name, price, count);
	this.cart.push(item);
	this.saveCart();
};

shoppingCart.setCountForItem = function(name, count) {
	for (var i in this.cart) {
		if (this.cart[i].name === name) {
			this.cart[i].count = count;
			break;
		}
	}
	this.saveCart();
};

shoppingCart.removeItemFromCart = function(name) {
	for (var i in this.cart) {
		if (this.cart[i].name === name) {
			this.cart[i].count --;
			if (this.cart[i].count === 0) {
				this.cart.splice(i, 1);
			}
			break;
		
		}
	}
	this.saveCart();
}
			
shoppingCart.removeItemFromCartAll = function(name) {
	for (var i in this.cart) {
		if (this.cart[i].name === name) {
			this.cart.splice(i, 1);
			break;
		}
	}
	this.saveCart();
}

shoppingCart.clearCart = function() {
	this.cart = [];
	this.saveCart();
}
	shoppingCart.countCart = function() { // return total count
	var totalCount=0
	for (var i in this.cart) {
		totalCount += this.cart[i].count;
	}
	
	return totalCount;
}

shoppingCart.totalCart = function() { // return total cost
	var totalCostinitial=0;
	var totalCostencorr=0;
	var totalCostotherdev=0;
	for (var i in this.cart) {
		/*if (this.cart[i].name == "D91") {
			totalCostd91 = this.cart[i].price;
		}*/
		if(this.cart[i].name === "Full EnCorr Pack" || "EnCorr Reporting") {
			totalCostotherdev = this.cart[i].price;
		}/*
		if(this.cart[i].name === "Suspending Funds" || "Unsuspending Funds") {
			totalCost = Math.ceil(this.cart[i].count/10) * 37.75;
		}*/
		if(this.cart[i].name === "One whole sentence change" || "One word within a sentence" || "Header/Footer amendments to Enclosures" || "Adding Enclosures" || "Removing Enclosures" || "LetterType level configuration changes i.e. set letter to deferred printing" || "Adding existing signature to a single template" || "Add a copy letter" || "Deleting lettertypes" || "New/Amendments to Paragraph in existing correspondence" || "New/Amendments to letter variables (prompts both user and automatic)" || "Creation of a single new signature" || "New Letter" || "New Variable" || "New Enclosures" || "New Template" !== ("Full EnCorr Pack" || "EnCorr Reporting")) {
			var totalCostencorrinitial=0
			totalCostencorr += this.cart[i].price * this.cart[i].count;
		}/*
		if(this.cart[i].name === "One whole sentence change" || "One word within a sentence" || "Header/Footer amendments to Enclosures" || "Adding Enclosures" || "Removing Enclosures" || "LetterType level configuration changes i.e. set letter to deferred printing" || "Adding existing signature to a single template" || "Add a copy letter" || "Deleting lettertypes" || "New/Amendments to Paragraph in existing correspondence" || "New/Amendments to letter variables (prompts both user and automatic)" || "Creation of a single new signature" || "New Letter" || "New Variable" || "New Enclosures" || "New Template" || "Full EnCorr Pack" || "EnCorr Reporting") {
			totalCost += this.cart[i].price * this.cart[i].count;
		}*/
		totalCost = totalCostinitial + totalCostotherdev + totalCostencorr
	}
	return totalCost.toFixed(2);
}

shoppingCart.listCart = function() { // array of items
	var cartCopy = [];
	for (var i in this.cart) {
		var item = this.cart[i];
		var itemCopy = {};
		for (var p in item) {
			itemCopy[p] = item[p];
		}
		itemCopy.total = (item.price * item.count).toFixed(2);
		cartCopy.push(itemCopy);
	}
	return cartCopy;
}

shoppingCart.saveCart = function() {
	localStorage.setItem("shoppingCart", JSON.stringify(this.cart));
}

shoppingCart.loadCart = function() {
	this.cart = JSON.parse(localStorage.getItem("shoppingCart"));
}

shoppingCart.loadCart();