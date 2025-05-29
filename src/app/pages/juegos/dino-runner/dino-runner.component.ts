import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-dino-runner',
  imports: [CommonModule],
  templateUrl: './dino-runner.component.html',
  styleUrl: './dino-runner.component.css'
})


export class DinoRunnerComponent implements OnInit {
  isJumping = false;
  dinoBottom = 0;
  obstacleLeft = 500;
  gameOver = false;
  score = 0;
  interval: any;

  constructor (private cdr: ChangeDetectorRef){

  }


  ngOnInit() {
    this.startGame();
  }

  startGame() {
    this.interval = setInterval(() => {
      this.obstacleLeft -= 1;
      if (this.obstacleLeft < -20) {
        this.obstacleLeft = 500;
        this.score++;
      }

      // colisión simple
      if (this.obstacleLeft < 60 && this.obstacleLeft > 20 && this.dinoBottom < 40) {
        this.gameOver = true;
        clearInterval(this.interval);
      }
      this.cdr.detectChanges();
    }, 3);
  }

  @HostListener('document:keydown.a')
  jump() {
    if (this.isJumping || this.gameOver) return;

    this.isJumping = true;
    let jumpHeight = 0;
    const jumpUp = setInterval(() => {
      if (jumpHeight >= 100) {
        clearInterval(jumpUp);
        const fallDown = setInterval(() => {
          if (jumpHeight <= 0) {
            clearInterval(fallDown);
            this.isJumping = false;
          } else {
            jumpHeight -= 0.75;
            this.dinoBottom = jumpHeight;
          }
        }, 3);
      } else {
        jumpHeight += 1;
        this.dinoBottom = jumpHeight;
      }
    }, 3);
  }

  restart() {
    this.dinoBottom = 0;
    this.obstacleLeft = 500;
    this.score = 0;
    this.gameOver = false;
    this.startGame();
  }
}