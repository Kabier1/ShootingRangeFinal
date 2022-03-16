class Gun {
    constructor(x, y, width, height) {
      const options = {
        isStatic: true
      };
  
      this.body = Matter.Bodies.rectangle(x, y, width, height, options);
      this.width = width;
      this.height = height;
      this.collapse = false;
      this.image = loadImage("./assets/Gun.png");
  
      World.add(world, this.body);
  
      Matter.Body.setAngle(this.body, 0);
    }
  
    display() {
      var pos = this.body.position;
      var angle = this.body.angle;
      console.log(angle)
  
      if (keyIsDown(RIGHT_ARROW) && angle < 50 ) {
        angle += 1;
        Matter.Body.setAngle(this.body, angle);
      }
  
      if (keyIsDown(LEFT_ARROW) && angle > -50) {
        angle -=1;
        Matter.Body.setAngle(this.body, angle);
      }
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.image, 0, 0, this.width, this.height);
      pop();
    }
  }
  