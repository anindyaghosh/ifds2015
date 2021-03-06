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
	var totalCoststart=0;
	for (var i in this.cart) {
		totalCoststart += this.cart[i].price * this.cart[i].count;
		totalCostfinal = totalCoststart + 76
	}
	return totalCostfinal.toFixed(2);
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