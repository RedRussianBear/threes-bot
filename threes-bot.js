threes = {}

threes.dirs = {"LEFT" : 0, "RIGHT" : 1, "UP" : 2, "DOWN" : 3};

threes.block = function(grid, val, x, y) {
	this.grid = grid.grid;
	this.val = val;
	this.x = x;
	this.y = y;
	
	this.left = function() {
		
		if(this.x == 0) return false; 
		
		if(this.grid[this.x - 1][this.y] != null) {
			if(this.val == 1 || this.val == 2) {
				if(this.val == 1 && this.grid[this.x - 1][this.y].val != 2) return false;
				if(this.val == 2 && this.grid[this.x - 1][this.y].val != 1) return false;
			}
			else if(this.val != this.grid[this.x - 1][this.y].val) return false;
		}
		
		this.x--;
		return true;
	}
	
	this.right = function() {
		if(this.x == 3) return false;
		
		if(this.grid[this.x + 1][this.y] != null) {

			if(this.val == 1 || this.val == 2) {
				if(this.val == 1 && this.grid[this.x + 1][this.y].val != 2) return false;
				if(this.val == 2 && this.grid[this.x + 1][this.y].val != 1) return false;
			}
			else if(this.val != this.grid[this.x + 1][this.y].val) return false;
		}
		
		this.x++;
		return true;
	}
	
	this.up = function() {
		if(this.y == 0) return false;

		if(this.grid[this.x][this.y - 1] != null) {

			if(this.val == 1 || this.val == 2) {
				if(this.val == 1 && this.grid[this.x][this.y - 1].val != 2) return false;
				if(this.val == 2 && this.grid[this.x][this.y - 1].val != 1) return false;
			}
			else if(this.val != this.grid[this.x][this.y - 1].val) return false;
		}
		
		this.y--;
		return true;
	}
	
	this.down = function() {
		if(this.y == 3) return false; 
		
		if(this.grid[this.x][this.y + 1] != null) {

			if(this.val == 1 || this.val == 2) {
				if(this.val == 1 && this.grid[this.x][this.y + 1].val != 2) return false;
				if(this.val == 2 && this.grid[this.x][this.y + 1].val != 1) return false;
			}
			else if(this.val != this.grid[this.x][this.y + 1].val) return false;
		}
		
		this.y++;
		return true;
	}
	
}

threes.grid = function() {
	this.grid = [[null,null,null,null],[null,null,null,null],[null,null,null,null],[null,null,null,null]];
	this.next = 0;
	
	this.blockmove = function(direction, x, y) {
		if(this.grid[x][y] == null) return;
		switch(direction) {
			case 0:
				if(this.grid[x][y].left()) {
					if(this.grid[x - 1][y] == null)
						this.grid[x - 1][y] = this.grid[x][y];
					else this.grid[x - 1][y] = new threes.block(this, this.grid[x][y].val + this.grid[x - 1][y].val, x - 1, y);
					
					this.grid[x][y] = null;
					return true;
				}
				break;
			case 1:
				if(this.grid[x][y].right()) {
					if(this.grid[x + 1][y] == null)
						this.grid[x + 1][y] = this.grid[x][y];
					else this.grid[x + 1][y] = new threes.block(this, this.grid[x][y].val + this.grid[x + 1][y].val, x + 1, y);
					
					this.grid[x][y] = null;
					return true;
				}
				break;
			case 2:
				if(this.grid[x][y].up()) {
					if(this.grid[x][y - 1] == null)
						this.grid[x][y - 1] = this.grid[x][y];
					else this.grid[x][y - 1] = new threes.block(this, this.grid[x][y].val + this.grid[x][y - 1].val, x, y - 1);
					
					this.grid[x][y] = null;
					return true;
				}
				break;
			case 3:
				if(this.grid[x][y].down()) {
					if(this.grid[x][y + 1] == null)
						this.grid[x][y + 1] = this.grid[x][y];
					else this.grid[x][y + 1] = new threes.block(this, this.grid[x][y].val + this.grid[x][y + 1].val, x, y + 1);
					
					this.grid[x][y] = null;
					return true;
				}
				break;
		}
	}
	
	this.gridmove = function(direction) {
		var success = false;
		
		switch(direction) {
			case 0:
				for(var x = 1; x < 4; x++) 
					for(var y = 0; y < 4; y++) 
						success |= this.blockmove(direction, x, y);
				
				var s = [];
				for(var c = 0; c < 4; c++) 
					if(this.grid[3][c] == null) s.push(c);
				var r = Math.random()*s.length | 0;
				
				if(success) this.grid[3][s[r]] = new threes.block(this, this.next, 3, s[r]);
				
				break;
			case 1:
				for(var x = 2; x >= 0; x--) 
					for(var y = 0; y < 4; y++) 
						success |= this.blockmove(direction, x, y);
					
				var s = [];
				for(var c = 0; c < 4; c++) 
					if(this.grid[0][c] == null) s.push(c);
				var r = Math.random()*s.length | 0;
				
				if(success) this.grid[0][s[r]] = new threes.block(this, this.next, 0, s[r]);
				
				break;
			case 2:
				for(var y = 1; y < 4; y++) 
					for(var x = 0; x < 4; x++) 
						success |= this.blockmove(direction, x, y);
					
				var s = [];
				for(var c = 0; c < 4; c++) 
					if(this.grid[c][3] == null) s.push(c);
				var r = Math.random()*s.length | 0;
				
				if(success) this.grid[s[r]][3] = new threes.block(this, this.next, s[r], 3);
				
				break;
			case 3:
				for(var y = 2; y >= 0; y--) 
					for(var x = 0; x < 4; x++) 
						success |= this.blockmove(direction, x, y);
					
				var s = [];
				for(var c = 0; c < 4; c++) 
					if(this.grid[c][0] == null) s.push(c);
				var r = Math.random()*s.length | 0;
				
				if(success) this.grid[s[r]][0] = new threes.block(this, this.next, s[r], 0);
				
				break;
		}
			
		this.next = (Math.random() * 3 + 1) | 0;
	}
	
	this.start = function() {
		var c = 0;
		while(c < 3) {
			var x = Math.random()*4 | 0;
			var y = Math.random()*4 | 0;
			var val = (Math.random()*3 + 1) | 0;
			
			if(this.grid[x][y] == null){
				this.grid[x][y] = new threes.block(this, val, x, y);
				c++;
			}			
		}
		this.next = (Math.random() * 3 + 1) | 0;
	}
	
	this.print = function() {
		var str = "+------------+\n";
		for(var y = 0; y < 4; y++) {
			str += "|";
			for(var x = 0; x < 4; x++)
				str += " " + (this.grid[x][y] != null ? this.grid[x][y].val : "_") + " ";
			str += "|\n";
		}
		str += "+------------+";
		
		console.log(str);
	}
	
}

threes.game = function() {
	this.start = function() {
		var game = this;
		
		this.grid = new threes.grid();
		this.grid.start();
		document.onkeydown = function(e) { game.handle(e) };
		
		this.grid.print();
	}
	
	this.handle = function(e) {
		var code = e.keyCode;
		
		switch(code) {
			case 87:
				this.grid.gridmove(threes.dirs.UP);
				break;
			case 65:
				this.grid.gridmove(threes.dirs.LEFT);
				break;
			case 83:
				this.grid.gridmove(threes.dirs.DOWN);
				break;
			case 68:
				this.grid.gridmove(threes.dirs.RIGHT);
				break;
		}
		
		this.grid.print();
	}
	
}